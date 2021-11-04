import React, { useEffect, useState } from "react";

import { GameMap } from "../GameMap/GameMap";
import { Hand } from "../Hand/Hand";
import { useDispatch, useSelector } from 'react-redux';
import { endTurn, moveOrAttack, chooseMove } from '../../redux/actions/action';
import { choosePlayerTarget } from '../../lib/movement';


import { currentTurnSelector, entitiesIdSelector, playerSelector, tilesSelector, playerMovesSelector, goldSelector, currentPhaseSelector, entityByIdSelector, gameSelector, currentEntitySelector, turnSelector, onMoveSelector, onAttackSelector, onKillSelector } from '../../redux/selectors/index';

import "./Main.css";
import { ModalView } from "../ModalViews/ModalView";
import entities from "../../redux/reducers/entities/entities";
import { GameInfo } from "../GameInfo/GameInfo";





export function Main() {

  const player = useSelector(playerSelector)
  const tiles = useSelector(tilesSelector)
  const moves = useSelector(playerMovesSelector)
  const gold = useSelector(goldSelector)
  const entityIds = useSelector(entitiesIdSelector)
  const entitiesById = useSelector(entityByIdSelector)
  const game = useSelector(gameSelector)
  const currentTurn = useSelector(currentTurnSelector)
  const currentPhase = useSelector(currentPhaseSelector)
  const turn = useSelector(turnSelector)

  const currentEntity = useSelector(currentEntitySelector)
  const moveEffects = useSelector(onMoveSelector)
  const attackEffects = useSelector(onAttackSelector)
  const killEffects = useSelector(onKillSelector)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState()
  const [playerPositionX, setPlayerPositionX] = useState()
  const [playerPositionY, setPlayerPositionY] = useState()


  const dispatch = useDispatch()



  const gameMapStyle = {
    flex: 4,
    position: 'relative',
    left: '50%',
    top: '45%',
   
    transform: `translate(${-playerPositionX}px, ${-playerPositionY}px)`,
  }






  useEffect(() => {

    if (!currentTurn) {

      endTurn(entityIds, turn)
    }

    if (currentTurn === 'player' && moves <= 0 && !modalIsOpen) {
      setTimeout(() => {
        dispatch(endTurn(entityIds, turn))
      }, 150);
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }

  });


  const handleKeydown = (e) => {
    console.log(playerPositionX)

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft':


        let target = choosePlayerTarget(player.position, e.key)
        let targetTile = tiles.byId[target]

        if (currentPhase !== 'movement' || modalIsOpen) {
          return
        } else if (!target) {
          return
        } else if (moves <= 0 && currentTurn === 'player') {

        } else if (currentTurn !== 'player') {

        } else if (targetTile.building.length && !targetTile.character.length) {
          setModalIsOpen(true)
          setModalContent(targetTile.building)
          dispatch(moveOrAttack(targetTile, player, entitiesById, moveEffects, attackEffects, killEffects))
        } else if (targetTile) {
          dispatch(moveOrAttack(targetTile, player, entitiesById, moveEffects, attackEffects, killEffects))
        }
        break;
      default:
        break;

    };
  }


  return (
    <div className="component-main" onKeyDown={handleKeydown} >

      <div className='game-info'>
        <GameInfo player={player} moves={moves} gold={gold} />
      </div>
      {modalIsOpen ?
        <ModalView className="modal" building={entitiesById[modalContent]} setModalIsOpen={setModalIsOpen} /> :
        <div className="gamemap" style={gameMapStyle}>

          <GameMap className="gamemap_map" setPlayerPositionX={setPlayerPositionX}  setPlayerPositionY={setPlayerPositionY} />

        </div>
      }
      <div className="hand">
        <Hand />
      </div>
    </div>
  );
}

