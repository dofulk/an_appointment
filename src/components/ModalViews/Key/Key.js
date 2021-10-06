import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unlockDoor } from "../../../redux/actions/action";





export const Key = ({ setModalIsOpen }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(unlockDoor())
    })
    return (
        <div className="component-Player">
            <h1>Door Unlocked</h1>
            <button onClick={() => setModalIsOpen(false)}>EXIT</button>
        </div>
    );
}
