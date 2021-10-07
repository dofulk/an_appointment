import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeGold, changeHp, deleteEntity, unlockDoor } from "../../../redux/actions/action";





export const GoldPile = ({ setModalIsOpen, building }) => {
    const dispatch = useDispatch()
    const onClick = () => {
        setModalIsOpen(false)
        batch(() => {
            dispatch(changeGold(building.gold))
            dispatch(deleteEntity(building, building.position))
        })
        
    }
    return (
        <div className="component-Player">
            <h1>Gain {building.gold} Gold</h1>
            <button onClick={onClick}>EXIT</button>
        </div>
    );
}
