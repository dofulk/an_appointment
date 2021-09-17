import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { moveChild, changeMoves, endTurn } from '../../redux/actions/action'
import { moveUp } from '../../lib/movement'
import { currentTurnSelector, entitiesSelector } from '../../redux/selectors/index'





export const Sprite = ({ entity }) => {


  return (
    <div className="component-Player">
      <h2>{entity}</h2>
    </div>
  );
}

