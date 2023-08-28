import React from 'react'

const Display = ({operatingState, storedOperator, displayState}) => {
    return (
        <div className='DanCalc-display'>
            <p>{operatingState} {storedOperator}</p>
            <p>{displayState}</p>
        </div>
    )
}

export default Display