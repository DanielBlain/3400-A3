import React from 'react'

const Display = ({memoryState, operatingState, storedOperator, displayState}) => {
    return (
        <div className='DanCalc-display'>
            <div className='DanCalc-display-status'>
                <p className={memoryState === '0' ? 'memoryEmpty' : 'memoryFull'}>M</p>
                <p>{operatingState} {storedOperator}</p>
            </div>
            <p>{displayState}</p>
        </div>
    )
}

export default Display