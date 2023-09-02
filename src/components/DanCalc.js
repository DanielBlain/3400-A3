import React from 'react';
import {useState} from 'react';
import Display from './Display';
import DanCalcButton from './DanCalcButton';

const DanCalc = ({calculatorButtons}) => {
    const [memoryState, setMemoryState] = useState('0');
    const [operatingState, setOperatingState] = useState('');
    const [storedOperator, setStoredOperator] = useState('');
    const [displayState, setDisplayState] = useState('0');
    const [isResultShown, setIsResultShown] = useState(false);

    function Clear(isAllClear=false) {
        setDisplayState('0');
        setIsResultShown(false);
        if (isAllClear) {
            setMemoryState('0');
            setOperatingState('');
            setStoredOperator('');
        }
    }

    function operateMemory(opType) {
        console.log(opType);
        switch (opType) {
            case 'Memory Save':
                setMemoryState(displayState);
                setDisplayState('0');
                setIsResultShown(false);
                break;
            case 'Memory Clear':
                setMemoryState('0');
                break;
            case 'Memory Recall':
                setDisplayState(memoryState);
                setMemoryState('0');
                setIsResultShown(true);
                break;
            case 'Memory Addition':
                setMemoryState('' + (Number(memoryState) + Number(displayState)));
                setDisplayState('0');
                setIsResultShown(false);
                break;
            case 'Memory Subtract':
                setMemoryState('' + (Number(memoryState) - Number(displayState)));
                setDisplayState('0');
                setIsResultShown(false);
                break;
            default:
                console.log("DanCalc - Unexpected memory state");
                break;
        }
    }

    function inputNumber(numberAsString) {
        if (isResultShown && storedOperator!=='') {
            setOperatingState(displayState);
        }
        setDisplayState(
            ((displayState === '0' || isResultShown)? '':displayState)
            + numberAsString
        )
        setIsResultShown(false);
    }

    function performCalculation(operation = storedOperator) {
        switch (operation) {
            case 'Add':
                setDisplayState('' + (Number(operatingState) + Number(displayState)));
                break;
            case 'Subtract':
                setDisplayState('' + (Number(operatingState) - Number(displayState)));
                break;
            case 'Multiply':
                setDisplayState('' + (Number(operatingState) * Number(displayState)));
                break;
            case 'Divide':
                setDisplayState('' + (Number(operatingState) / Number(displayState)));
                break;
            case 'Percent':
                setDisplayState('' + (Number(displayState) / 100));
                break;
            case 'Square Root':
                setDisplayState('' + (Math.sqrt(Number(displayState))));
                break;
            default:
                console.log("DanCalc - Unexpected operator");
                break;
        }
    }

    function applyEnter() {
        performCalculation();
        setOperatingState('');
        setStoredOperator('');
        setIsResultShown(true);
    }

    function applyOperator(operatorAsString) {
        switch (operatorAsString) {
            case 'Percent':
                performCalculation('Percent');
                break;
            case 'Square Root':
                performCalculation('Square Root');
                break;
            default:
                if (storedOperator !== '') {
                    performCalculation();
                }
                setStoredOperator(operatorAsString);
                break;
        }
        setOperatingState('');
        setIsResultShown(true);
    }

    function applySign() {
        setDisplayState('' + Number(displayState * -1));
        setIsResultShown(false);
    }

    function applyDecimal() {
        setDisplayState(''  + Number(displayState) + '.');
        setIsResultShown(false);
    }

    return (
        <article className='DanCalc-component'>
            <h2>
                DanCalc v1.0
            </h2>
            <div className='DanCalc-panel'>
                <Display
                    memoryState={memoryState}
                    operatingState={operatingState}
                    storedOperator={
                        // "storedOperator" is the value field in the calculator-buttons array. Find instead its button text
                        (calculatorButtons.find(item => item.value === storedOperator) || {}).text
                    }
                    displayState={displayState} />
                {calculatorButtons.map(nextButton => (
                    <DanCalcButton key={nextButton.value}
                        buttonClass={'DanCalc-button DanCalc-' + nextButton.className + '-button'}
                        buttonValue={nextButton.value}
                        buttonText={nextButton.text}
                        clickFunc={
                            // Is it All Clear or Clear?
                            (nextButton.type === 'clear')
                            // If so, apply the operation
                            ? () => {Clear(nextButton.text === 'AC')}
                            // Else: is it a memory operation?
                            : (nextButton.type === 'memory')
                                // If so, perform the memory operation
                                ? () => {operateMemory(nextButton.value)}
                                // Else: is it a number?
                                : (nextButton.type === 'number')
                                    // If so, input the number
                                    ? () => {inputNumber(nextButton.value)}
                                    // Else: is it an operator?
                                    : (nextButton.type === 'operator')
                                        // If so, input the operator
                                        ? () => {applyOperator(nextButton.value)}
                                        // Else either the sign key, decimal key, or enter key was pressed; check for each
                                        : (nextButton.type === 'sign')
                                        ? () => {applySign()}
                                        : (nextButton.type === 'decimal')
                                        ? () => {applyDecimal()}
                                        : () => {applyEnter()}
                        }
                    />
                ))}
            </div>
        </article>
    )
}

export default DanCalc