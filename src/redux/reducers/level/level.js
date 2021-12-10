
const initialState = {
    width: 0,
    height: 0,
    floorTurn: 0
};


const level = (state = initialState, action) => {
    switch (action.type) {

        case 'NEW_CYCLE':
            return {
                ...state,
                floorTurn: state.floorTurn + 1
            }

        case 'NEW_MAP':
            return {
                ...state,
                width: action.payload.map.width,
                height: action.payload.map.height
            }
        default:
            return state;

        case 'NEW_GAME':
            return initialState

    }

}

export default level