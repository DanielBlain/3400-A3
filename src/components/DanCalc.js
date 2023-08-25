import DanCalcButton from './DanCalcButton';

const DanCalc = ({calculatorButtons}) => {
    return (
    <article className='DanCalc-panel'>
        <div className='DanCalc-display'>
            Display
        </div>
        {calculatorButtons.map(nextButton => (
            <DanCalcButton key={nextButton.value}
                buttonClass={"DanCalc-" + nextButton.className + "-button"}
                buttonValue={nextButton.value}
                buttonText={nextButton.text}
            />
        ))}
    </article>
  )
}

export default DanCalc