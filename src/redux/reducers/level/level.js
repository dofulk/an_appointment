
const initialState = {
    width: 15,
    height: 15,
    floorTurn: 0
};


const level = (state = initialState, action) => {
    switch (action.type) {

        case 'NEW_CYCLE':
            return {
                ...state,
                floorTurn: state.floorTurn + 1
            }
        default:
            return state;
    }

}

export default level