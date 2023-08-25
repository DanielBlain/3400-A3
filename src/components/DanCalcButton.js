import React from 'react'

const DanCalcButton = (button) => {
  return (
    <button className={"DanCalc-" + button.className + "-button"}>
        {button.text}
    </button>
  )
}

export default DanCalcButton