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

    function performCalculation() {
        switch (storedOperator) {
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
        if (storedOperator !== '') {
            performCalculation();
        }
        setStoredOperator(operatorAsString);
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
        <article className='DanCalc-panel'>
            <Display memoryState={memoryState} operatingState={operatingState} storedOperator={storedOperator} displayState={displayState} />
            {calculatorButtons.map(nextButton => (
                <DanCalcButton key={nextButton.value}
                    buttonClass={'DanCalc-' + nextButton.className + '-button'}
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
        </article>
    )
}

export default DanCalc