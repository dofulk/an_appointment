import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeGold, changeHp } from "../../../redux/actions/action";
import { playerSelector, goldSelector } from "../../../redux/selectors";





export const Medic = ({ setModalIsOpen }) => {

    const player = useSelector(playerSelector)
    const gold = useSelector(goldSelector)
    const dispatch = useDispatch()
    const onClick = () => {

        if (gold >= 7) {
            batch(() => {
                dispatch(changeGold(-7))
                dispatch(changeHp(player, 1))
            })
        } else return
     

    }
    return (
        <div className="component-Player">
            <button onClick={onClick}>GIVE GOLD GAIN HEALTH</button>
            <button onClick={() => setModalIsOpen(false)}>EXIT</button>
        </div>
    );
}