import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { GameMap } from "../GameMap/GameMap";
import { Hand } from "../Hand/Hand";
import { Exit } from "../ModalViews/Exit/Exit";
import { useDispatch, useSelector } from 'react-redux';
import { changeMoves, changeHp, endTurn, draw, moveEntity, attackTarget } from '../../redux/actions/action';
import { choosePlayerTarget } from '../../lib/movement';
import { } from 'react-redux'
import * as PF from "pathfinding"

import { entitiesByIdSelector, currentTurnSelector, entitiesIdSelector, playerSelector, tilesSelector, playerMovesSelector, goldSelector, currentPhaseSelector, floorTurnSelector, singleEntitySelector, entitiesArraySelector, entityByIdSelector, gameSelector } from '../../redux/selectors/index';

import "./Main.css";
import { CardPicker } from "../CardPicker/CardPicker";





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
  const floorTurn = useSelector(floorTurnSelector)


  const currentEntity = entitiesById[currentTurn]

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<div></div>);



  const dispatch = useDispatch()

  const chooseMove = () => {

    let currentRowNumber = 0
    let currentRow = []
    let tileMap = []
    let tileList = tiles.byId

    Object.keys(tileList).forEach((i) => {
      if (currentRowNumber == tileList[i].row) {
        currentRow.push(tileList[i].isAValidMove ? 0 : 1)
      } else {
        tileMap.push(currentRow)

        currentRow = []
        currentRow.push(tileList[i].isAValidMove ? 0 : 1)
        currentRowNumber += 1

      }
    })
    tileMap.push(currentRow)
    let start = currentEntity.position.split(',')
    let end = player.position.split(',')

    let startX = parseInt(start[0])
    let startY = parseInt(start[1])

    tileMap[startX][startY]= 0

    let endX = parseInt(end[0])
    let endY = parseInt(end[1])

    tileMap[endX][endY] = 0

    let finder = new PF.AStarFinder()
    let grid = new PF.Grid(tileMap);



    let path = finder.findPath(startX, startY, endX, endY, grid)


    let targetArray = path[1]
    let target = targetArray.join(',')
    let targetTile = tiles.byId[target]
    if (targetTile.wall) {
      dispatch(changeMoves(currentTurn, -1))
    } else if (targetTile.isAValidMove) {
      dispatch(moveEntity(targetTile, currentEntity))
      dispatch(changeMoves(currentTurn, -1))
    } else if (targetTile.character) {
      dispatch(changeMoves(currentTurn, -1))
      dispatch(changeHp(targetTile.character, -currentEntity.attack))
    }
    else {
      //throw an error at some point
      console.log('oops')
    }
  }

  const chooseModalContent = (building) => {
    if (building.buildingType === 'Chest') {
      setModalContent(<CardPicker
        setModalIsOpen={setModalIsOpen}
        listOfCards={building.content} />)
    }
    if (building.buildingType === 'Exit') {
      setModalContent(<Exit
        setModalIsOpen={setModalIsOpen}
        player={player}
        level={game.level}
      ></Exit>)
    }
  }

  const moveAtCharacter = (target, character, player) => {
    if (character.type === 'character') {

    } else if (character.type === 'building') {

    }
  }






  useEffect(() => {

    if (player.hp <= 0) {
      console.log('GAME OVER')
      return
    }

    if (moves <= 0 && currentTurn === 'player' && !modalIsOpen) {
      console.log(entityIds)
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

        } else if (targetTile.character.length) {
          dispatch(attackTarget(target, entitiesById[targetTile.character], player))
        } else if (targetTile.building.length) {
          setModalIsOpen(true)
          chooseModalContent(entitiesById[targetTile.building])
          dispatch(moveEntity(targetTile, player))
        } else if (targetTile.isAValidMove) {
          dispatch(moveEntity(targetTile, player))
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
      <Modal isOpen={modalIsOpen}
        ariaHideApp={false}>
        {modalContent}

      </Modal>
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

