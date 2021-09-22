import React, { useEffect } from "react";
import { Sprite } from '../Sprite/Sprite';
import { useDispatch, useSelector } from 'react-redux'
import { changeAttack, changeHp, deleteEntity, endTurn } from "../../redux/actions/action";
import { currentTurnSelector, characterIdsSelector, playerSelector, tilesSelector, currentPhaseSelector, turnSelector, onKillSelector } from "../../redux/selectors";
import { onKill } from "../../redux/actions/conditionalActions";
import { chooseMove } from "../../redux/actions/action";





const tileStyle = (color, damage) => {


  let background

  switch (damage) {
    case 0:
      background = '#e8f5e9';
      break;
    case 1:
      background = '#c8e6c9'
      break;
    case 2:
      background = '#a5d6a7'
      break;
    case 3:
      background = '#81c784'
      break;
    case 4:
      background = '#66bb6a'
      break;
    case 5:
      background = '#4caf50'
      break;
    case 6:
      background = '#43a047'
      break;
    case 7:
      background = '#388e3c'
      break;
    case 8:
      background = '#2e7d32'
      break;
    case 9:
      background = '#1b5e20'
      break;
    default:
      background = 'black'
  }
  return {
    border: '1px solid black',
    width: '48px',
    height: '48px',
    backgroundColor: background,
  }
}



export const Tile = ({ id, color, character, building, damage }) => {


  const dispatch = useDispatch()
  const turn = useSelector(turnSelector)
  const currentTurn = useSelector(currentTurnSelector)
  const characterIds = useSelector(characterIdsSelector)
  const player = useSelector(playerSelector)
  const tiles = useSelector(tilesSelector)
  const currentPhase = useSelector(currentPhaseSelector)
  const killAction = useSelector(onKillSelector)

  useEffect(() => {
    
    if (!character) {
      return
    
    } else if (character.hp <= 0 && character.id === 'player') {
      console.log('Game OVERERER')
    }else if (character.hp <= 0) {
      console.log('Im MELLLLLLLLTTTTTTTTTTINGGGGGGGG')
      dispatch(onKill(character, id, killAction))
    }else if (currentPhase !== 'movement' || currentTurn !== character.id) {
    } else if (character.moves <= 0) {
      console.log('Turn Ending')
      dispatch(endTurn(characterIds, turn))

    } else if (character.id === 'player') {
      return
    } else {
      dispatch(chooseMove(tiles, character, player))
    }
  }

  )

  let sprite = (character, building) => {

    if (character) {
      return <Sprite entity={character.sprite} />
    } else if (building) {
      return <Sprite entity={building.sprite} />
    }
  }

  return (
    <div className="component-tile" style={tileStyle(color, damage)}>
      {sprite(character, building)}
    </div>
  );

}