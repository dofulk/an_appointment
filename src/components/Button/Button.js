import React from "react";
import './Button.css'



export const Button = ({ text, onClick }) => {

    return (
        <div className="button" onClick={onClick}>
            {text}
        </div>
    );
}
