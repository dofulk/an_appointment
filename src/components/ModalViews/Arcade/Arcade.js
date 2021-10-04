import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeGold, changeHp, newMap } from "../../../redux/actions/action";
import { createLevel } from "../../../lib/level";
import { playerSelector, levelSelector, goldSelector } from "../../../redux/selectors";





export const Arcade = ({ setModalIsOpen }) => {

    const player = useSelector(playerSelector)

    const dispatch = useDispatch()
    const onClick = () => {


        dispatch(changeGold(5))
    }
    return (
        <div className="component-Player">
            <button onClick={onClick}>NEXT FLOOR</button>
            <button onClick={() => setModalIsOpen(false)}>EXIT</button>
        </div>
    );
}
