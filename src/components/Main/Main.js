import React, { useEffect, useState } from "react";

import { GameMap } from "../GameMap/GameMap";
import { Hand } from "../Hand/Hand";
import { useDispatch, useSelector } from 'react-redux';
import { changeMoves,  endTurn, moveOrAttack } from '../../redux/actions/action';
import { choosePlayerTarget } from '../../lib/movement';
import * as PF from "pathfinding"

import { currentTurnSelector, entitiesIdSelector, playerSelector, tilesSelector, playerMovesSelector, goldSelector, currentPhaseSelector,  entityByIdSelector, gameSelector } from '../../redux/selectors/index';

import "./Main.css";
import { ModalView } from "../ModalViews/ModalView";





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


  const currentEntity = entitiesById[currentTurn]

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState()



  const dispatch = useDispatch()

  const chooseMove = () => {

    let grid = new PF.Grid(15, 15);

    let tileList = tiles.byId

    Object.keys(tileList).forEach((i) => {
      grid.setWalkableAt(tileList[i].row, tileList[i].column, (tileList[i].isAValidMove ? true : false))
    })
    let start = currentEntity.position.split(',')
    let end = player.position.split(',')

    let startX = parseInt(start[0])
    let startY = parseInt(start[1])

    grid.setWalkableAt(startX, startY, true)

    let endX = parseInt(end[0])
    let endY = parseInt(end[1])

    grid.setWalkableAt(endX, endY, true)

    let finder = new PF.AStarFinder()


    let path = finder.findPath(startX, startY, endX, endY, grid)
    console.log(grid, path)
    if (path.length) {
      console.log(grid)
      let target = path[1].join(',')
      let targetTile = tiles.byId[target]

      dispatch(moveOrAttack(targetTile, currentEntity))
    } else {
      changeMoves(currentEntity.id, -1)
    }

  }








  useEffect(() => {

    if (player.hp <= 0) {
      console.log('GAME OVER')
      return
    }

    if (moves <= 0 && currentTurn === 'player' && !modalIsOpen) {
      dispatch(endTurn(entityIds, currentTurn))

    } else if (currentTurn === 'player') {

    } else if (currentEntity.moves <= 0 || currentEntity.hp <= 0) {
      dispatch(endTurn(entityIds, currentTurn))
    } else {
      chooseMove()
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

        } else if (moves <= 0) {

        } else if (targetTile.building.length && !targetTile.character.length) {
          setModalIsOpen(true)
          setModalContent(entitiesById[targetTile.building])
          dispatch(moveOrAttack(targetTile, player))
        } else if (targetTile) {
          dispatch(moveOrAttack(targetTile, player))
        } else {
          console.log(targetTile)
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

