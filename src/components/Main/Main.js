import React, { useEffect, useState } from "react";

import { GameMap } from "../GameMap/GameMap";
import { Hand } from "../Hand/Hand";
import { useDispatch, useSelector } from 'react-redux';
import {  endTurn, moveOrAttack, chooseMove } from '../../redux/actions/action';
import { choosePlayerTarget } from '../../lib/movement';


import { currentTurnSelector, entitiesIdSelector, playerSelector, tilesSelector, playerMovesSelector, goldSelector, currentPhaseSelector, entityByIdSelector, gameSelector, currentEntitySelector, turnSelector, onMoveSelector, onAttackSelector } from '../../redux/selectors/index';

import "./Main.css";
import { ModalView } from "../ModalViews/ModalView";
import entities from "../../redux/reducers/entities/entities";





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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState()



  const dispatch = useDispatch()









  useEffect(() => {

    if (!currentTurn) {
      
      endTurn(entitiesById, turn)
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

        if (currentPhase !== 'movement' || modalIsOpen) {
          return
        } else if (!target) {
          return
        } else if (moves <= 0 && currentTurn === 'player') {

        } else if (currentTurn !== 'player') {

        } else if (targetTile.building.length && !targetTile.character.length) {
          setModalIsOpen(true)
          setModalContent(entitiesById[targetTile.building])
          dispatch(moveOrAttack(targetTile, player, moveEffects, attackEffects))
        } else if (targetTile) {
          dispatch(moveOrAttack(targetTile, player, moveEffects, attackEffects))
        }
        break;
      default:
        break;

    };
  }


  return (
    <div className="component-main" onKeyDown={handleKeydown}>
      <ModalView building={modalContent} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <GameMap />
      <div flex="horizontal" style={{ flex: 1 }}>
        <h1>Moves: {moves}/{player.baseMoves}</h1>

        <h1>HP: {player.hp}/{player.maxHP}</h1>
        <h1>Attack: {player.attack}/{player.baseAttack}</h1>
        <h1>Coin: {gold}</h1>
        <h1>Level: {game.level}</h1>
        <Hand />

      </div>
    </div>
  );
}

