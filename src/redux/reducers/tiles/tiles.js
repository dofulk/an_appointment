import { breakTiles } from "../../../lib/breakTiles"
import { attackTarget } from "../../actions/action"

export const initialState = {
    byId: {
    },
    allIds: [],
    validMoves: [],
}






const tiles = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ENTITY":
        case "ADD_CHARACTER":

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.tile]: {
                        ...state.byId[action.payload.tile],
                        character: action.payload.character,
                        isAValidMove: false
                    }
                }
            }
        case "DELETE_ENTITY":
        case "UNLOCK_DOOR":
            if (action.payload.entityType === 'character') {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.tile]: {
                            ...state.byId[action.payload.tile],
                            character: [],
                            isAValidMove: true
                        }

                    }
                }
            } else if (action.payload.entityType === 'building') {

                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.tile]: {
                            ...state.byId[action.payload.tile],
                            building: [],
                        }
                    }
                }
            } else {
                return state
            }


        case 'NEW_MAP':
            return {
                ...state,
                byId: action.payload.map.byId,
                allIds: action.payload.map.allIds,
                validMoves: action.payload.map.validMoves
            }

        case 'MOVE_ENTITY':
            if (action.payload.entity.id === state.byId[action.payload.entity.position].character) {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.entity.position]: {
                            ...state.byId[action.payload.entity.position],
                            character: [],
                            isAValidMove: true

                        },
                        [action.payload.target]: {
                            ...state.byId[action.payload.target],
                            character: action.payload.entity.id,
                            isAValidMove: false
                        }

                    }
                }
            } else {
                return state
            }



        case 'END_CYCLE':
            let newTiles = breakTiles(state.validMoves, action.payload.brokenTiles, state.byId)



            return {
                ...state,
                byId: newTiles
            }

        default:
            return state;
    }

}




export default tiles

