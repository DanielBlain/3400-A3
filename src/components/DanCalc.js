import React from 'react';
import {useState} from 'react';
import Display from './Display';
import DanCalcButton from './DanCalcButton';

const DanCalc = ({calculatorButtons}) => {
    const [memoryState, setMemoryState] = useState('0');        // The "long term" memory, controlled by the Memory buttons
    const [operatingState, setOperatingState] = useState('');   // The "working" memory, shown above the main display
    const [storedOperator, setStoredOperator] = useState('');   // The mathematical operator, shown in the working memory
    const [displayState, setDisplayState] = useState('0');      // The main display, shows the currently input number or result
    const [isDecimal, setIsDecimal] = useState(false);          // Whether the main display contains a decimal. If true, no 2nd decimal can be appended

    function Clear(isAllClear=false) {
        if (displayState === '0') {
            isAllClear = true;
        }
        setDisplayState('0');
        setIsDecimal(false);
        if (isAllClear) {
            setMemoryState('0');
            setOperatingState('0');
            setStoredOperator('');
        }
    }

    function updateIsDecimal() {
        setIsDecimal(displayState.includes('.'));
    }

    function operateMemory(opType) {
        console.log(opType);
        switch (opType) {
            case 'Memory Save':
                if (operatingState !== '' && displayState === '0') {
                    setMemoryState(operatingState);
                    setOperatingState('0');
                    setStoredOperator('');
                }
                else {
                    setMemoryState(displayState);
                    setDisplayState('0');
                    setIsDecimal(false);
                }
                break;
            case 'Memory Clear':
                setMemoryState('0');
                break;
            case 'Memory Recall':
                setDisplayState(memoryState);
                updateIsDecimal();
                break;
            case 'Memory Addition':
                if (operatingState !== '' && displayState === '0') {
                    setMemoryState('' + (Number(memoryState) + Number(operatingState)));
                    setOperatingState('0');
                    setStoredOperator('');
                }
                else {
                    setMemoryState('' + (Number(memoryState) + Number(displayState)));
                    setDisplayState('0');
                    setIsDecimal(false);
                }
                break;
            case 'Memory Subtract':
                if (operatingState !== '' && displayState === '0') {
                    setMemoryState('' + (Number(memoryState) - Number(operatingState)));
                    setOperatingState('0');
                    setStoredOperator('');    
                }
                else {
                    setMemoryState('' + (Number(memoryState) - Number(displayState)));
                    setDisplayState('0');
                    setIsDecimal(false);    
                }
                break;
            default:
                console.log("DanCalc - Unexpected memory state");
                break;
        }
    }

    function inputNumber(numberAsString) {
        setDisplayState(
            ((displayState === '0') ? '' : displayState)
            + numberAsString
        )
    }

    function performCalculation(operation = storedOperator) {
        let opSuccess = true;
        switch (operation) {
            case 'Add':
                setOperatingState('' + (Number(operatingState) + Number(displayState)));
                break;
            case 'Subtract':
                setOperatingState('' + (Number(operatingState) - Number(displayState)));
                break;
            case 'Multiply':
                setOperatingState('' + (Number(operatingState) * Number(displayState)));
                break;
            case 'Divide':
                setOperatingState('' + (Number(operatingState) / Number(displayState)));
                break;
            case 'Percent':
                setOperatingState('' + (Number(operatingState) / 100));
                break;
            case 'Square Root':
                setOperatingState('' + (Math.sqrt(Number(operatingState))));
                break;
            default:
                opSuccess = false;
                console.log("DanCalc - Unexpected operator");
                break;
        }
        if (opSuccess) {
            setDisplayState('0');
            setStoredOperator('');
            setIsDecimal(false);
        }
    }

    function applyEnter() {
        if (operatingState !== '') {
            performCalculation();
        }
        else {
            setOperatingState(displayState);
        }
        setDisplayState('0');
        setIsDecimal(false);
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
                else if (displayState !== '0') {
                    setOperatingState(displayState);
                    setDisplayState('0');
                    setIsDecimal(false);
                }
                setStoredOperator(operatorAsString);
                break;
        }
    }

    function applySign() {
        setDisplayState('' + Number(displayState * -1));
    }

    function applyDecimal() {
        if (!isDecimal) {
            setDisplayState(''  + Number(displayState) + '.');
            setIsDecimal(true);
        }
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