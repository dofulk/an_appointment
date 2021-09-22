import { batch } from "react-redux"
import * as PF from "pathfinding"
import { onAttack, onMove } from "./conditionalActions"


export const addCharacter = (tile, character) => ({
    type: 'ADD_CHARACTER',
    payload: {
        tile: tile,
        character: character
    }
})





export const changeMoves = (id, moves) => ({
    type: 'CHANGE_MOVES',
    payload: {
        id: id,
        moves: moves
    }
})


export const changeHp = (id, hp) => ({
    type: 'CHANGE_HP',
    payload: {
        id: id,
        hp: hp
    }
})

export const changeAttack = (id, attack) => ({
    type: 'CHANGE_ATTACK',
    payload: {
        id: id,
        attack: attack
    }
})


export const draw = (number) => ({

    type: 'DRAW',
    payload: {
        numberOfCards: number
    }
})

export const newPhase = (phase) => ({
    type: 'NEW_PHASE',
    payload: {
        phase: phase
    }
})

export const discard = () => ({
    type: 'DISCARD'
})
export const newCycle = () => ({
    type: 'NEW_CYCLE',
    payload: {
        phase: 'movement'
    }

})

export const newMap = (level) => ({
    type: 'NEW_MAP',
    payload: {
        map: level.map,
        entities: level.entities,
    }
})


export const changeDrawAmount = (amount) => ({
    type: 'CHANGE_DRAW_AMOUNT',
    payload: {
        amount: amount
    }
})

export const playCard = (id) => ({
    type: 'PLAY_CARD',
    payload: {
        id: id
    }
})

export const deleteEntity = (entity, tile) => ({
    type: 'DELETE_ENTITY',
    payload: {
        entityType: entity.type,
        entityId: entity.id,
        tile: tile
    }
})

export const addEntity = (entity, character, tile) => ({
    type: 'ADD_ENTITY',
    payload: {
        newEntity: entity,
        character: character,
        tile: tile
    }
})

export const changeGold = (gold) => ({
    type: 'CHANGE_GOLD',
    payload: {
        gold: gold
    }
})

export const addCardToDiscard = (card) => ({
    type: 'ADD_CARD_TO_DISCARD',
    payload: {
        card: card
    }
})


export const moveEntity = (target, entity) => ({
    type: 'MOVE_ENTITY',
    payload: {
        target: target.id,
        entity: entity,
        targetDamage: target.damage
    }
})

export const drawCards = (numberOfCards) => ({

    type: 'DRAW_CARDS',
    payload: {
        numberOfCards: numberOfCards,
        phase: 'hand'

        //  dispatch(draw(numberOfCards)),
        // dispatch(newPhase('hand')),

    }
})

export const endTurn = (entities, turn) => {
    console.log(entities, turn)
    if (turn >= (entities.length - 1)) {
        console.log('NEWCYCLE')
        return {
            type: 'END_CYCLE',
            payload: {
                brokenTiles: 4,
            }
        }

    }
    else {
        return {
            type: 'END_TURN',
        }
    }
}

export const addOnKill = (effect) => {
    return {
        type: 'ADD_ON_KILL',
        payload: {
            onKill: effect
        }
    }
}

export const addOnMove = (effect) => {
    return {
        type: 'ADD_ON_MOVE',
        payload: {
            onMove: effect
        }
    }
}

export const addOnAttack = (effect) => {
    return {
        type: 'ADD_ON_ATTACK',
        payload: {
            onAttack: effect
        }
    }
}

export const attackTarget = (characterId, entity) => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeMoves(entity.id, -1))
            dispatch(changeHp(characterId, -entity.attack))
        })
    }
}

export const addCardFromPicker = (building, card) => {
    return dispatch => {
        batch(() => {
            dispatch(deleteEntity(building, building.position))
            dispatch(addCardToDiscard(card))
        })

    }
}



export const moveOrAttack = (targetTile, entity, moveEffects, attackEffects) => {
    if (targetTile.wall) {
       return changeMoves(entity.id, -1)
    } else if (targetTile.isAValidMove) {
        return onMove(targetTile, entity, moveEffects)


    } else if (targetTile.character) {
        return onAttack(targetTile.character, entity, attackEffects)
    }
    else {
        //throw an error at some point
        console.log('oops')
    }
}

export const chooseMove = (tiles, currentEntity, player) => {

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
    if (path.length > 1) {
      let target = path[1].join(',')
      let targetTile = tiles.byId[target]

      return moveOrAttack(targetTile, currentEntity)
    } else {
      return changeMoves(currentEntity.id, -1)
    }

  }
