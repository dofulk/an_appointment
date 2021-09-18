
export const initialState = {
    draw: [

    ],
    hand: [

    ],
    played: [

    ],
    discard: [
        { id: '1', cardTitle: 'Attack', },
        { id: '2', cardTitle: 'Attack', },
        { id: '3', cardTitle: 'Attack', },
        { id: '4', cardTitle: 'Attack', },
        { id: '5', cardTitle: 'Attack', },
        { id: '6', cardTitle: 'Move', },
        { id: '7', cardTitle: 'Move', },
        { id: '8', cardTitle: 'Move', },
        { id: '9', cardTitle: 'Move', },
        { id: '10', cardTitle: 'Move', },


    ]


}

const cards = (state = initialState, action) => {
    switch (action.type) {
        case 'DRAW_CARDS':
        case 'DRAW':
            let newHand = state.hand
            let drawPile = state.draw
            let i = action.payload.numberOfCards
            let newDiscard = state.discard


            //fisher yates shuffle
            let shuffle = (array) => {
                let m = array.length, t, i;

                while (m) {

                    i = Math.floor(Math.random() * m--);

                    t = array[m];
                    array[m] = array[i];
                    array[i] = t;
                }

                return array;
            }

            while (i > 0)
                if (Array.isArray(drawPile) && drawPile.length) {
                    newHand = [
                        ...newHand,
                        drawPile[0]
                    ]
                    drawPile = drawPile.slice(1);
                    i--;
                } else if (Array.isArray(newDiscard) && newDiscard.length) {
                    drawPile = shuffle(state.discard)
                    newDiscard = []
                } else {
                    i--
                }
            return {
                ...state,
                draw: drawPile,
                hand: newHand,
                discard: newDiscard
            }


        //Filter gets called twice here should probably fix that
        // but it really shouldn't matter cause the arrays should be max 20 or something. Should probably just use for each
        case 'PLAY_CARD':
            return {
                ...state,
                hand: state.hand.filter(item => item.id !== action.payload.id),
                played: [
                    ...state.played,
                    ...state.hand.filter(item => item.id === action.payload.id)
                ]
            }
        //discards cards in hand  
        case 'NEW_MAP':
        case 'END_CYCLE':
        case 'DISCARD':
            return {
                ...state,
                hand: [],
                played: [],
                discard: [
                    ...state.discard,
                    ...state.hand,
                    ...state.played
                ]
            }
        case 'ADD_CARD_TO_DISCARD':
            console.log(action.payload.card)
            return {
                ...state,
                discard: [
                    ...state.discard,
                    action.payload.card
                ]
            }

        default:
            return state;
    }

}
export default cards