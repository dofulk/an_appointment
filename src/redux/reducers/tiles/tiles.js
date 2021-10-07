import { attackTarget } from "../../actions/action"

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
            let shuffle = (a) => {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            }
            let randomTiles = shuffle(state.validMoves)
            let chosenTiles =randomTiles.slice(0, action.payload.brokenTiles)
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

