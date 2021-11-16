import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unlockDoor } from "../../../redux/actions/action";





export const Key = ({ setModalIsOpen, building }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        return() => {
            setModalIsOpen(false)
            dispatch(unlockDoor(building))
        }
       
    }, [])

    return (
        <div className="component-Player">
            <h1>Door Unlocked</h1>
        </div>
    );
}
