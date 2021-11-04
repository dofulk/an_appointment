import React, { useEffect, useState, useRef } from "react";
import { Sprite } from '../Sprite/Sprite';
import { useDispatch, useSelector } from 'react-redux'
import { changeAttack, changeHp, deleteEntity, endTurn } from "../../redux/actions/action";
import { currentTurnSelector, characterIdsSelector, playerSelector, tilesSelector, currentPhaseSelector, turnSelector, onKillSelector, entityByIdSelector, heightSelector, widthSelector } from "../../redux/selectors";
import { onKill } from "../../redux/actions/conditionalActions";
import { chooseMove } from "../../redux/actions/action";

import { motion } from 'framer-motion'



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
    width: (100 / 20) + '%',
    height: (100 / 7) + '%',
    backgroundColor: background,
    listStyleType: 'none',
    borderRadius: 3,
  }
}



export const Tile = ({ id, color, character, building, damage, setPlayerPositionX, setPlayerPositionY }) => {

  const inputRef = useRef();

  const dispatch = useDispatch()
  const turn = useSelector(turnSelector)
  const currentTurn = useSelector(currentTurnSelector)
  const characterIds = useSelector(characterIdsSelector)
  const player = useSelector(playerSelector)
  const tiles = useSelector(tilesSelector)
  const currentPhase = useSelector(currentPhaseSelector)
  const killAction = useSelector(onKillSelector)
  const entities = useSelector(entityByIdSelector)
  const height = useSelector(heightSelector)
  const width = useSelector(widthSelector)


  useEffect(() => {



    const timeout = setTimeout(() => {


      if (!character) {
        return

      } else if (character.hp <= 0 && character.id === 'player') {
        console.log('Game OVERERER')
      } else if (character.hp <= 0) {

      } else if (currentPhase !== 'movement' || currentTurn !== character.id) {
      } else if (character.moves <= 0 && character.id !== 'player') {
        dispatch(endTurn(characterIds, turn))


      } else if (character.id === 'player') {
        return
      } else {

        dispatch(chooseMove(tiles, character, player, entities, height, width))
      }
    }, 150)

    return () => clearInterval(timeout);

  }, [character, currentTurn, currentPhase])

  useEffect(() => {
    if (!character) {

    } else if (character.id === 'player') {

      setPlayerPositionX(inputRef.current.offsetLeft);
      setPlayerPositionY(inputRef.current.offsetTop);
    }
  }, [character])


  let sprite = (character, building, currentTurn) => {
    // if (character && (character.id === currentTurn)) {
    //   return (
    //     (character) &&
    //     < motion.div
    //       key={character}
    //       layoutId={currentTurn}
    //       variants={id}
    //       animate={{}
    //       }
    //       transition={spring}
    //     > <Sprite entity={character} />
    //     </motion.div >
    //   )
    // } else 
    if (character) {
      return <Sprite entity={character} />
    } else if (building) {
      return <Sprite entity={building} />
    }

  }

  return (
    <div className="component-tile" style={tileStyle(color, damage)} ref={inputRef}>

      {sprite(character, building, currentTurn)}
    </div>
  );

}

const spring = {
  type: "tween",
  duration: .15
}
