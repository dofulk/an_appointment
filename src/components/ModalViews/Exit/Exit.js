import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newMap } from "../../../redux/actions/action";
import { createLevel } from "../../../lib/level";
import { playerSelector, levelSelector, numberOfCyclesSelector } from "../../../redux/selectors";
import { Button } from "../../Button/Button";





export const Exit = ({ setModalContent, building }) => {
  const player = useSelector(playerSelector)
  const level = useSelector(levelSelector)
  const numberOfCycles = useSelector(numberOfCyclesSelector)
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(newMap(createLevel(player, level, numberOfCycles)))
    setModalContent()
  }
  return (
    <div className="component-Player">
     <Button onClick={onClick} text="NEXT FLOOR"></Button>
    </div>
  );
}
