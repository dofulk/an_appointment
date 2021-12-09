import React, { useEffect, useState } from "react";

import { GameMap } from "../GameMap/GameMap";
import { Hand } from "../Hand/Hand";
import { useDispatch, useSelector } from 'react-redux';
import { moveOrAttack, chooseMove, newPhase, endCycle, changeMoves } from '../../redux/actions/action';
import { choosePlayerTarget } from '../../lib/movement';


import { playerSelector, tilesSelector, playerMovesSelector, goldSelector, currentPhaseSelector, entityByIdSelector, onMoveSelector, onAttackSelector, onKillSelector, heightSelector, widthSelector, enemyIdsSelector, removeAmountSelector } from '../../redux/selectors/index';

import "./Main.css";
import { ModalView } from "../ModalViews/ModalView";
import { GameInfo } from "../GameInfo/GameInfo";
import { Button } from "../Button/Button";





export function Main({ menuOpen }) {

  const player = useSelector(playerSelector)
  const tiles = useSelector(tilesSelector)
  const moves = useSelector(playerMovesSelector)
  const gold = useSelector(goldSelector)
  const enemyIds = useSelector(enemyIdsSelector)
  const entitiesById = useSelector(entityByIdSelector)
  const currentPhase = useSelector(currentPhaseSelector)

  const height = useSelector(heightSelector)
  const width = useSelector(widthSelector)

  const moveEffects = useSelector(onMoveSelector)
  const attackEffects = useSelector(onAttackSelector)
  const killEffects = useSelector(onKillSelector)
  const removeAmount = useSelector(removeAmountSelector)
  const [modalContent, setModalContent] = useState()
  const [enemyTurnOrder, setEnemyTurnOrder] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    if (removeAmount) {
      console.log('remove!')
    }
  }, [removeAmount])

  const chooseEnemyTurns = () => {
    if (!Array.isArray(enemyTurnOrder)) {
      setEnemyTurnOrder(enemyIds)
    } else if (!enemyTurnOrder.length) {
      setEnemyTurnOrder()
      dispatch(endCycle())
    } else if (entitiesById[enemyTurnOrder[0]].moves <= 0) {
      setEnemyTurnOrder(enemyTurnOrder.slice(1))
    } else {
      dispatch(chooseMove(tiles, entitiesById[enemyTurnOrder[0]], player, entitiesById, height, width))
    }
  }


  useEffect(() => {
    if (currentPhase === 'player' && moves <= 0 && tiles.byId[player.position] && !tiles.byId[player.position].building.length) {
      dispatch(newPhase('enemies'))
    }


  }, [currentPhase, dispatch, modalContent, moves, player.position, tiles])


  useEffect(() => {


    if (currentPhase === 'enemies') {
      chooseEnemyTurns()
    }

    if (!menuOpen) {
      window.addEventListener("keydown", handleKeydown);
      return () => {
        window.removeEventListener("keydown", handleKeydown);
      }
    }

  });


  const handleKeydown = (e) => {

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'w':
      case 'a':
      case 's':
      case 'd':


        let target = choosePlayerTarget(player.position, e.key)
        let targetTile = tiles.byId[target]

        if (currentPhase !== 'player') {
          return
        } else if (!target) {
          return
        } else if (moves <= 0) {
        } else if (!targetTile) {
          dispatch(changeMoves('player', -1))
        } else if (targetTile) {
          dispatch(moveOrAttack(targetTile, player, entitiesById, moveEffects, attackEffects, killEffects))
        }
        break;

      case 'Enter':
        setModalContent()
        break;
      case ' ':
        if (currentPhase === 'player') {
          dispatch(newPhase('enemies'))
        }
        break;
      default:
        break;

    };
  }


  return (
    <div className="component-main" onKeyDown={handleKeydown} >


      <div className='game_info'>
        <GameInfo player={player} moves={moves} gold={gold} />
        {(currentPhase === 'player' && moves <= 0 && tiles.byId[player.position] && tiles.byId[player.position].building.length) ? <Button onClick={() => dispatch(newPhase('enemies'))} text="END TURN"></Button> : <div />}
      </div>
      <div className="game_modal">
        <GameMap className="gamemap_map" setModalContent={setModalContent} modalContent={modalContent} />
        {modalContent ?
          <ModalView className="game_modal" setModalContent={setModalContent} building={entitiesById[modalContent]} isOpen={1} /> :
          <ModalView className="game_modal" isOpen={0} setModalContent={setModalContent} />
        }

      </div>

      <div className="game_hand">
        <Hand />
      </div>
    </div>
  );
}

