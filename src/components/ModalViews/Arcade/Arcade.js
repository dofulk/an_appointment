import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeGold, changeHp, newMap } from "../../../redux/actions/action";
import { playerSelector, levelSelector, goldSelector } from "../../../redux/selectors";





export const Arcade = ({ setModalIsOpen }) => {

    const player = useSelector(playerSelector)

    const dispatch = useDispatch()
    const onClick = () => {

        batch(() => {
            dispatch(changeGold(5))
            dispatch(changeHp(player, -1))
        })

    }
    return (
        <div className="component-Player">
            <button onClick={onClick}>GIVE BLOOD GAIN GOLD</button>
            <button onClick={() => setModalIsOpen(false)}>EXIT</button>
        </div>
    );
}
