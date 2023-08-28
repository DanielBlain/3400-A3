import React from 'react';
import {useState} from 'react';
import Display from './Display';
import DanCalcButton from './DanCalcButton';

const DanCalc = ({calculatorButtons}) => {
    const DISPLAY_WIDTH = 8;
    const [operatingState, setOperatingState] = useState('');
    const [storedOperator, setStoredOperator] = useState('');
    const [displayState, setDisplayState] = useState('0');

    function Clear(isAllClear=false) {
        setDisplayState('0');
        if (isAllClear) {
            // Clear memory, if applicable
            setOperatingState('');
            setStoredOperator('');
        }
    }

    function inputNumber(numberAsString) {
        if (displayState.length < DISPLAY_WIDTH) {
            setDisplayState(
                ((displayState !== '0')? displayState:'')
                + numberAsString
            );
        }
    }

    function applyOperator(operatorAsString) {
        switch (storedOperator) {
            case '+':
                setOperatingState('' + (Number(operatingState) + Number(displayState)));
                setDisplayState('0');
                break;
            case '-':
                setOperatingState('' + (Number(operatingState) - Number(displayState)));
                setDisplayState('0');
                break;
            case '*':
                setOperatingState('' + (Number(operatingState) * Number(displayState)));
                setDisplayState('0');
                break;
            case '/':
                setOperatingState('' + (Number(operatingState) / Number(displayState)));
                setDisplayState('0');
                break;
            default:
                setOperatingState('' + (Number(displayState)));
                break;
        }
        setStoredOperator(operatorAsString);
    }

    function applyEnter() {
        applyOperator('');
    }
    
// clear, number, operator, enter
    return (
        <article className='DanCalc-panel'>
            <Display operatingState={operatingState} storedOperator={storedOperator} displayState={displayState} />
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
                        // Else: is it a number?
                        : (nextButton.type === 'number')
                            // If so, input the number
                            ? () => {inputNumber(nextButton.value)}
                            // Else: is it an operator?
                            : (nextButton.type === 'operator')
                                // If so, input the operator
                                ? () => {applyOperator(nextButton.value)}
                                // Else the only possibility is the Enter key
                                : () => {applyEnter()}
                    }
                />
            ))}
        </article>
    )
}

export default DanCalc