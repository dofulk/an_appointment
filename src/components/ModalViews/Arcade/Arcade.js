import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { changeGold, changeHP} from "../../../redux/actions/action";
import { playerSelector} from "../../../redux/selectors";
import { Button } from "../../Button/Button";





export const Arcade = ({ setModalIsOpen }) => {

    const player = useSelector(playerSelector)

    const dispatch = useDispatch()
    const onClick = () => {

        batch(() => {
            dispatch(changeGold(5))
            dispatch(changeHP(player, -1))
        })

    }
    return (
        <div className="component-Player">
            <Button onClick={onClick} text="GIVE BLOOD GAIN GOLD"></Button>
        </div>
    );
}
