const initialState = {
    moveUp: {main: 'ArrowUp', alt: 'w'},
    moveRight: {main: 'ArrowRight', alt: 'd'},
    moveDown: {main: 'ArrowDown', alt: 's'},
    moveLeft: {main: 'ArrowLeft', alt: 'a'},
    endTurn: {main: ' ', alt: "/"},
    exitBuilding: {main: 'Enter', alt: 'q'}


};


const controls = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_CONTROL':
            return {
                ...state,
                [action.payload.control]: {
                    ...state[action.payload.control],
                    [action.payload.slot]: action.payload.key
                }

            }

        default:
            return state;
    }

}

export default controls