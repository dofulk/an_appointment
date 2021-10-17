import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newMap } from "../../../redux/actions/action";
import { createLevel } from "../../../lib/level";
import { playerSelector, levelSelector, numberOfCyclesSelector } from "../../../redux/selectors";





export const Exit = ({ setModalIsOpen, building }) => {
  const player = useSelector(playerSelector)
  const level = useSelector(levelSelector)
  const numberOfCycles = useSelector(numberOfCyclesSelector)
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(newMap(createLevel(player, level, numberOfCycles)))
    setModalIsOpen(false)
  }
  return (
    <div className="component-Player">
      {building.isLocked
        ? <h1>Door Locked! Find the Key</h1>
        : <button onClick={onClick}>NEXT FLOOR</button>}
      <button onClick={() => setModalIsOpen(false)}>EXIT</button>
    </div>
  );
}
