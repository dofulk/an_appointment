import { newMap } from "../../actions/action"

const initialState = {
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
        case "REMOVE_CHARACTER":
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
        }else {
            return state
        }

            

        case 'END_CYCLE':
            let chosenTiles = []
            chosenTiles = state.validMoves.sort(() => Math.random() - Math.random()).slice(0, action.payload.brokenTiles)
            let newTiles = {}
            chosenTiles.forEach(item => {
                newTiles[item] = {
                    ...state.byId[item],
                    damage: state.byId[item].damage + 1
                }
            })



            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...newTiles
                }
            }

        default:
            return state;
    }

}




export default tiles

