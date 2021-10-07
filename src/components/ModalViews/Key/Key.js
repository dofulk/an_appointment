import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeGold, changeHp, unlockDoor } from "../../../redux/actions/action";





export const Key = ({ setModalIsOpen, building }) => {
    const dispatch = useDispatch()
    const onClick = () => {
        setModalIsOpen(false)
        dispatch(unlockDoor(building))
    }
    return (
        <div className="component-Player">
            <h1>Door Unlocked</h1>
            <button onClick={onClick}>EXIT</button>
        </div>
    );
}
