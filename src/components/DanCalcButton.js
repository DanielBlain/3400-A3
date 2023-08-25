import React from 'react'

const DanCalcButton = ({buttonClass, buttonValue, buttonText}) => {
  return (
    <button className={buttonClass} value={buttonValue}>
        {buttonText}
    </button>
  )
}

export default DanCalcButton