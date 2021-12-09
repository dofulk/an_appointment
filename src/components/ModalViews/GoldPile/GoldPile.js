import React, { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { changeGold, deleteEntity } from "../../../redux/actions/action";





export const GoldPile = ({ setModalIsOpen, building }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(building)
        return () => {
            console.log(building)
            batch(() => {
                dispatch(changeGold(building.gold))
                dispatch(deleteEntity(building, building.position))
            })
        }

    }, [building, dispatch, setModalIsOpen])
    return (
        <div className="component-Player">
            <h1>Gain {building.gold} Gold</h1>
        </div>
    );
}
