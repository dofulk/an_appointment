import React, { useEffect, useState } from "react";

import { GameMap } from "../GameMap/GameMap";
import { Hand } from "../Hand/Hand";
import { useDispatch, useSelector } from 'react-redux';
import { endTurn, moveOrAttack, chooseMove, newPhase, newCycle, endCycle } from '../../redux/actions/action';
import { choosePlayerTarget } from '../../lib/movement';


import { currentTurnSelector, characterIdsSelector, playerSelector, tilesSelector, playerMovesSelector, goldSelector, currentPhaseSelector, entityByIdSelector, gameSelector, currentEntitySelector, turnSelector, onMoveSelector, onAttackSelector, onKillSelector, heightSelector, widthSelector, enemyIdsSelector, removeAmountSelector } from '../../redux/selectors/index';

import "./Main.css";
import { ModalView } from "../ModalViews/ModalView";
import entities from "../../redux/reducers/entities/entities";
import { GameInfo } from "../GameInfo/GameInfo";





export function Main() {

  const player = useSelector(playerSelector)
  const tiles = useSelector(tilesSelector)
  const moves = useSelector(playerMovesSelector)
  const gold = useSelector(goldSelector)
  const characterIds = useSelector(characterIdsSelector)
  const enemyIds = useSelector(enemyIdsSelector)
  const entitiesById = useSelector(entityByIdSelector)
  const game = useSelector(gameSelector)
  const currentTurn = useSelector(currentTurnSelector)
  const currentPhase = useSelector(currentPhaseSelector)
  const turn = useSelector(turnSelector)

  const height = useSelector(heightSelector)
  const width = useSelector(widthSelector)
  const currentEntity = useSelector(currentEntitySelector)
  const moveEffects = useSelector(onMoveSelector)
  const attackEffects = useSelector(onAttackSelector)
  const killEffects = useSelector(onKillSelector)
  const removeAmount = useSelector(removeAmountSelector)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState()
  const [playerPositionX, setPlayerPositionX] = useState()
  const [playerPositionY, setPlayerPositionY] = useState()
  const [enemyTurnOrder, setEnemyTurnOrder] = useState()

  const dispatch = useDispatch()



  const gameMapStyle = {
    flex: 4,
    position: 'relative',
    left: '50%',
    top: '45%',

    transform: `translate(${-playerPositionX}px, ${-playerPositionY}px)`,
  }

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
      console.log(enemyTurnOrder.slice(1))
      setEnemyTurnOrder(enemyTurnOrder.slice(1))
    } else {
      dispatch(chooseMove(tiles, entitiesById[enemyTurnOrder[0]], player, entitiesById, height, width))
    }
  }



  useEffect(() => {

    if (currentPhase === 'player' && moves <= 0 && !modalIsOpen) {
      dispatch(newPhase('enemies'))

    }

    if (currentPhase === 'enemies') {
      chooseEnemyTurns()
    }


    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }

  });


  const handleKeydown = (e) => {

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft':


        let target = choosePlayerTarget(player.position, e.key)
        let targetTile = tiles.byId[target]

        if (currentPhase !== 'player' || modalIsOpen) {
          return
        } else if (!target) {
          return
        } else if (moves <= 0) {

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
      <div className="gamemap" style={gameMapStyle}>

        <GameMap className="gamemap_map" setPlayerPositionX={setPlayerPositionX} setPlayerPositionY={setPlayerPositionY} />

      </div>
      <div className='game_info'>
        <GameInfo player={player} moves={moves} gold={gold} />
      </div>
      <div className="game_modal" style={{ backgroundColor: modalIsOpen ? 'darkgrey' : '' }}>
        {modalIsOpen ?
          <ModalView className="game_modal" building={entitiesById[modalContent]} setModalIsOpen={setModalIsOpen} isOpen={1} /> :
          <ModalView className="game_modal" setModalIsOpen={setModalIsOpen} isOpen={0} />
        }
      </div>

      <div className="game_hand">
        <Hand />
      </div>
    </div>
  );
}

