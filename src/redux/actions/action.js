import { batch } from "react-redux"


export const addCharacter = (tile, character) => ({
    type: 'ADD_CHARACTER',
    payload: {
        tile: tile,
        character: character
    }
})

export const removeCharacter = (tile, character) => ({
    type: 'REMOVE_CHARACTER',
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

export const deleteEntity = (id, tile) => ({
    type: 'DELETE_ENTITY',
    payload: {
        entityId: id,
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

export const endTurn = (entities, currentTurn) => {
    let currentNumber = entities.indexOf(currentTurn)
    if (currentNumber === (entities.length - 1)) {
        return {
            type: 'END_CYCLE',
            payload: {
                phase: 'player',
                currentTurn: entities[0],
                brokenTiles: 4,
            }
        }

    }
    else {
        return {
            type: 'END_TURN',
            payload: {
                currentTurn: entities[currentNumber + 1]
            }
        }
    }
}

export const attackTarget = (target, character, player) => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeMoves('player', -1))
            dispatch(changeHp(character.id, -player.attack))
        })
    }
}

export const addCardFromPicker = (building, card) => {
    return dispatch => {
        batch(() => {
            dispatch(deleteEntity(building))
            dispatch(addCardToDiscard(card))
        })

    }
}
