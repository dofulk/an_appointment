import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeGold, changeHp } from "../../../redux/actions/action";
import { playerSelector, goldSelector } from "../../../redux/selectors";
import { Button } from "../../Button/Button";





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
            <Button onClick={onClick} text="GIVE GOLD GAIN HEALTH"></Button>
        </div>
    );
}