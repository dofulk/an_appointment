import { batch } from "react-redux"
import * as PF from "pathfinding"
import { onAttack, onKill, onMove } from "./conditionalActions"
import { chooseRandomTarget } from "../../lib/movement"

export const newGame = () => ({
    type: 'NEW_GAME'
})

export const changeControl = (control, slot, key) => ({

        type: 'CHANGE_CONTROL',
        payload: {
            control: control,
            slot: slot,
            key: key,
        }
    })

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


export const changeHp = (entity, hp, killEffects) => {
    if (entity.id !== 'player' && entity.hp + hp <= 0) {
        return onKill(entity, entity.position, killEffects)
    } else {
        return {
            type: 'CHANGE_HP',
            payload: {
                id: entity.id,
                hp: hp
            }
        }
    }

}

export const changeAttack = (id, attack) => ({
    type: 'CHANGE_ATTACK',
    payload: {
        id: id,
        attack: attack
    }
})

export const changeBaseAttack = (id, attack) => ({
    type: 'CHANGE_BASE_ATTACK',
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

export const changeDrawAmount = (amount) => ({
    type: 'CHANGE_DRAW_AMOUNT',
    payload: {
        amount: amount
    }
})

export const drawOne = () => ({
    type: 'DRAW_ONE',
    payload: {
        amount: -1,
        numberOfCards: 1
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

export const newMap = (level, onNewMap) => ({
    type: 'NEW_MAP',
    payload: {
        map: level.map,
        entities: level.entities,
        level: level.level
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

export const addCardToDiscard = (card) => {
    if (card.onAdd) {
        return dispatch => {
            batch(() => {
                dispatch(card.onAdd)
                dispatch({
                    type: 'ADD_CARD_TO_DISCARD',
                    payload: {
                        card: card
                    }
                })
            })
        }
    } else {
        return {
            type: 'ADD_CARD_TO_DISCARD',
            payload: {
                card: card
            }
        }
    }
}

export const removeCard = (card) => ({
    type: 'REMOVE_CARD',
    payload: {
        id: card
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

    }
})

export const endCycle = () => {
    return {
        type: 'END_CYCLE',
        payload: {
            brokenTiles: 4,
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

export const addToUpgradeQueue = (upgrades) => {
    return {
        type: 'ADD_TO_UPGRADE_QUEUE',
        payload: {
            upgrades: upgrades
        }
    }
}


export const upgradeCard = (id, upgrade) => {
    return {
        type: 'UPGRADE_CARD',
        payload: {
            id: id,
            upgrade: upgrade
        }
    }

}



export const unlockDoor = (building) => {
    return {
        type: 'UNLOCK_DOOR',
        payload: {
            entityType: building.type,
            entityId: building.id,
            tile: building.position
        }
    }
}


export const attackTarget = (target, attacker, killEffects) => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeMoves(attacker.id, -attacker.moves))
            dispatch(changeHp(target, -attacker.attack, killEffects))
            dispatch({
                type: 'ON_ATTACK',
                payload: {
                    attacker: attacker.id
                }
            })
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

export const buyCard = (building, item, hand) => {
    return dispatch => {
        batch(() => {
            dispatch(addCardToDiscard(item.content, hand))
            dispatch(
                {
                    type: 'BUY_CARD',
                    payload: {
                        card: item.content,
                        gold: -item.price,
                        shop: building
                    }
                })
        })

    }
}

export const upgradeAttack = (id, attack) => {
    return {
        type: 'UPGRADE_ATTACK',
        payload: {
            attack: attack,
            id: id
        }

    }
}



export const moveOrAttack = (targetTile, entity, entities, moveEffects, attackEffects, killEffects) => {
    if (targetTile.wall) {

        return changeMoves(entity.id, -1)
    } else if (targetTile.isAValidMove) {
        return onMove(targetTile, entity, moveEffects)


    } else if (targetTile.character) {
        return onAttack(entities[targetTile.character], entity, attackEffects, killEffects)
    }
    else {
        //throw an error at some point
        console.log('oops')
    }
}


export const moveOnly = (targetTile, entity, entities, moveEffects, attackEffects, killEffects) => {
    if (!targetTile || targetTile.wall) {
        return changeMoves(entity.id, -1)
    } else if (targetTile.isAValidMove) {
        return onMove(targetTile, entity, moveEffects)


    } else if (targetTile.character) {
        return changeMoves(entity.id, -1)
    }
    else {
        //throw an error at some point
        console.log('oops')
    }
}

export const chooseMove = (tiles, currentEntity, player, entities, height, width) => {
    let start = currentEntity.position.split(',')
    let end = player.position.split(',')

    let startX = parseInt(start[0])
    let startY = parseInt(start[1])

    let endX = parseInt(end[0])
    let endY = parseInt(end[1])

    if (Math.abs(startX - endX) + Math.abs(startY - endY) > 7) {


        return moveOnly(tiles.byId[chooseRandomTarget(currentEntity.position)], currentEntity, entities)
    }

    let grid = new PF.Grid(width, height);

    let tileList = tiles.byId

    Object.keys(tileList).forEach((i) => {
        grid.setWalkableAt(tileList[i].column, tileList[i].row, (tileList[i].isAValidMove ? true : false))
    })






    grid.setWalkableAt(startX, startY, true)



    grid.setWalkableAt(endX, endY, true)

    let finder = new PF.AStarFinder()


    let path = finder.findPath(startX, startY, endX, endY, grid)
    if (path.length > 1) {
        let target = path[1].join(',')
        let targetTile = tiles.byId[target]

        return moveOrAttack(targetTile, currentEntity, entities)
    } else {
        return changeMoves(currentEntity.id, -1)
    }

}
