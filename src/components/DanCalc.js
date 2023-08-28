import React from 'react';
import {useState} from 'react';
import Display from './Display';
import DanCalcButton from './DanCalcButton';

const DanCalc = ({calculatorButtons}) => {
    const DISPLAY_WIDTH = 8;
    const [operatingState, setOperatingState] = useState('dddd');
    const [displayState, setDisplayState] = useState('0');

    function Clear(isAllClear=false) {
        setDisplayState('0');
        if (isAllClear) {
            // Clear memory, if applicable
            setOperatingState('');
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
// clear, number, operator, enter
    return (
        <article className='DanCalc-panel'>
            <Display operatingState={operatingState} displayState={displayState} />
            {calculatorButtons.map(nextButton => (
                <DanCalcButton key={nextButton.value}
                    buttonClass={'DanCalc-' + nextButton.className + '-button'}
                    buttonValue={nextButton.value}
                    buttonText={nextButton.text}
                    clickFunc={
                        (nextButton.type === 'clear')
                        ? () => {Clear(nextButton.text === 'AC')}
                        : () => {inputNumber(nextButton.value)}
                    }
                />
            ))}
        </article>
    )
}

export default DanCalc