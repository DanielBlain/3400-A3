import React from 'react'

const Display = ({operatingState, displayState}) => {
    return (
        <div className='DanCalc-display'>
            <p>{operatingState}</p>
            <p>{displayState}</p>
        </div>
    )
}

export default Display