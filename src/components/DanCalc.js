import Display from './Display';
import DanCalcButton from './DanCalcButton';

const DanCalc = ({calculatorButtons}) => {
    return (
    <article className='DanCalc-panel'>
        <Display />
        <div className='DanCalc-keyboard'>
            {calculatorButtons.map(nextButton => (
                <DanCalcButton
                    buttonClass={"DanCalc-" + nextButton.className + "-button"}
                    buttonValue={nextButton.value}
                    buttonText={nextButton.text}
                />
            ))}
        </div>
    </article>
  )
}

export default DanCalc