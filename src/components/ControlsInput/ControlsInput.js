import React, { useEffect, useState } from 'react';


export const ControlsInput = ({ value, onKeyDown }) => {

    const [inputValue, setInputValue] = useState('')

    const getValue = (value) => {
        if (value === ' ') {
            setInputValue('Spacebar')
        } else {
            setInputValue(value)
        }
    }

    useEffect(() => {
        getValue(value)
    }, [setInputValue, value])



    return (
        <div>
            <input maxLength={1} onChange={() => console.log()} onKeyDown={(e) => onKeyDown(e)} type="text" value={inputValue} onFocus={() => setInputValue('')} onBlur={() => getValue(value)}></input>
        </div>
    )
}