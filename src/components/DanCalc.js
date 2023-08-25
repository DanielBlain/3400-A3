import Display from './Display';

const DanCalc = ({calculatorButtons}) => {
    return (
    <article className='DanCalc-panel'>
        <Display />
        <div className='DanCalc-keyboard'>
            {calculatorButtons.map(button => (
                <button className={"DanCalc-" + button.className + "-button"}>
                    {button.text}
                </button>
            ))}
        </div>
    </article>
  )
}

export default DanCalc