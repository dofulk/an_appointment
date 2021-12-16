export const initialState = {
    byId: {
        "player": { id: "player", position: "1,1", moves: 1, baseMoves: 1, hp: 10, maxHP: 10, attack: 1, baseAttack: 1, type: 'character', sprite: "🙂" },

    },
    characterIds: [],
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
            if (state.byId[action.payload.id].moves + action.payload.moves < 0) {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.id]: {
                            ...state.byId[action.payload.id],
                            moves: 0
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
                            moves: state.byId[action.payload.id].moves + action.payload.moves
                        }
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

        case 'CHANGE_MAX_HP':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        hp: state.byId[action.payload.id].hp + action.payload.maxHP,
                        maxHP: state.byId[action.payload.id].maxHP + action.payload.maxHP
                    }

                }
            }

        case 'CHANGE_ATTACK':
            if (state.byId[action.payload.id].attack + action.payload.attack < 0) {
                return {
                    byId: {
                        ...state.byId,
                        [action.payload.id]: {
                            ...state.byId[action.payload.id],
                            attack: 0
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
                            attack: state.byId[action.payload.id].attack + action.payload.attack
                        }

                    }
                }
            }

        case 'CHANGE_BASE_ATTACK':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        baseAttack: state.byId[action.payload.id].attack + action.payload.attack
                    }

                }
            }
        case 'END_CYCLE':
            let entities = {}
            for (let key in state.byId) {
                if (state.byId[key].type === 'character') {
                    entities[key] = {
                        ...state.byId[key],
                        moves: state.byId[key].baseMoves,
                        attack: state.byId[key].baseAttack
                    }
                } else {
                    entities[key] = state.byId[key]
                }

            }

            return {
                ...state,
                byId: entities,
            }

        case 'BUY_CARD':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.shop.id]: {
                        ...state.byId[action.payload.shop.id],
                        content: state.byId[action.payload.shop.id].content.filter(item => item.content.title !== action.payload.card.title)
                    }
                }
            }




        case 'DELETE_ENTITY':
            let key = action.payload.entityId
            let { [key]: value, ...newById } = state.byId

            if (action.payload.entityType === "character") {

                return {
                    ...state,
                    byId: newById,
                    characterIds: state.characterIds.filter(id => id !== action.payload.entityId)
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
        case 'UNLOCK_DOOR':
            let keyId = action.payload.entityId
            let { [keyId]: keyValue, ...byIdNoKey } = state.byId

            return {
                ...state,
                byId: {
                    ...byIdNoKey,

                    Exit: {
                        ...state.byId['Exit'],
                        isLocked: false

                    }
                }
            }
        case 'NEW_GAME':
            return initialState


        default:
            return state;
    }

}

export default entities

