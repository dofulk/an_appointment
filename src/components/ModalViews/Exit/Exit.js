import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newMap } from "../../../redux/actions/action";
import { createLevel } from "../../../lib/level";
import { playerSelector, levelSelector } from "../../../redux/selectors";





export const Exit = ({ setModalIsOpen }) => {
  const player = useSelector(playerSelector)
  const level = useSelector(levelSelector)
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(newMap(createLevel(player, level)))
    setModalIsOpen(false)
  }
  return (
    <div className="component-Player">
      <button onClick={onClick}>NEXT FLOOR</button>
      <button onClick={() => setModalIsOpen(false)}>EXIT</button>
    </div>
  );
}
