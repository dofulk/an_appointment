export const initialState = {
    byId: {
        "player": { id: "player", position: "1,1", moves: 5, baseMoves: 5, hp: 30, maxHP: 30, attack: 4, baseAttack: 4, type: 'character', sprite: "🙂" },

    },
    characterIds: ['player', 'enemy1'],
    currentTurn: 'player',
    playerTurnInitiated: false
};

const entities = (state = initialState, action) => {
    switch (action.type) {

        case 'NEW_MAP':
            return {
                ...state,
                byId: {
                    ...action.payload.entities.byId,
                    player: {
                        ...action.payload.entities.byId['player'],
                        moves: state.byId['player'].baseMoves,
                        attack: state.byId['player'].baseAttack
                    }
                },
                characterIds: action.payload.entities.characterIds,
                playerTurnInitiated: false,
                currentTurn: 'player',

            }
        //Changes the position value of entity

        case 'MOVE_ENTITY':
            if (action.payload.entity.position === state.byId[action.payload.entity.id].position) {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.entity.id]: {
                            ...state.byId[action.payload.entity.id],
                            position: action.payload.target,
                            moves: (state.byId[action.payload.entity.id].moves - 1),
                            hp: state.byId[action.payload.entity.id].hp - action.payload.targetDamage

                        }
                    }
                }
            } else {
                return state
            }


        // Adds a value to moves value of an entity
        case 'CHANGE_MOVES':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        moves: state.byId[action.payload.id].moves + action.payload.moves
                    }
                }
            }
        // Adds an value to the HP value of an entity
        case 'CHANGE_HP':
            if (state.byId[action.payload.id].hp + action.payload.hp > state.byId[action.payload.id].maxHP) {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.id]: {
                            ...state.byId[action.payload.id],
                            hp: state.byId[action.payload.id].maxHP
                        }

                    }
                }
            } else {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.id]: {
                            ...state.byId[action.payload.id],
                            hp: state.byId[action.payload.id].hp + action.payload.hp
                        }

                    }
                }
            }

        case 'CHANGE_ATTACK':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        attack: state.byId[action.payload.id].attack + action.payload.attack
                    }

                }
            }

        case 'END_TURN':
            return {
                ...state,
                currentTurn: action.payload.currentTurn
            }
        case 'END_CYCLE':
            let entities = {}
            for (let key in state.byId) {
                entities[key] = {
                    ...state.byId[key],
                    moves: state.byId[key].baseMoves,
                    attack: state.byId[key].baseAttack
                }

            }

            return {
                ...state,
                byId: entities,
                playerTurnInitiated: false,
                currentTurn: 'player'
            }


        case 'INITIATE_TURN':
            return {
                ...state,
                playerTurnInitiated: true
            }

        case 'DELETE_ENTITY':
            const key = action.payload.entityId
            const { [key]: value, ...newById } = state.byId
            if (newById.type === "character") {
                return {
                    ...state,
                    byId: newById,
                    characterIds: state.characterIds.filter(id => id === !action.payload.entityId)

                }
            } else {
                return {
                    ...state,
                    byId: newById,

                }
            }

        case 'ADD_ENTITY':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.character]: action.payload.newEntity
                },
                characterIds: [...state.characterIds, action.payload.character]

            }

        default:
            return state;
    }

}

export default entities

