import React from 'react'

const DanCalcButton = ({buttonClass, buttonValue, buttonText, clickFunc}) => {
    return (
        <button className={buttonClass} value={buttonValue} onClick={()=>{clickFunc(buttonValue)}}>
            {buttonText}
        </button>
    )
}

export default DanCalcButton