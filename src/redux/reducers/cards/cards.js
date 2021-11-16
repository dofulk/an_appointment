import { getCardEffect } from '../../actions/cardActions'
import { v4 as uuidv4 } from 'uuid'
export const initialState = {
    draw: [

    ],
    hand: [

    ],
    discard: [
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.attack }) }, get description() { return "Add " + this.attack + " to attack" }, onAdd: undefined, attack: 3, moves: undefined, gold: undefined },
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.attack }) }, get description() { return "Add " + this.attack + " to attack" }, onAdd: undefined, attack: 3, moves: undefined, gold: undefined },
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.attack }) }, get description() { return "Add " + this.attack + " to attack" }, onAdd: undefined, attack: 3, moves: undefined, gold: undefined },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return "Gain " + this.moves + " moves" }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return "Gain " + this.moves + " moves" }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return "Gain " + this.moves + " moves" }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return "Gain " + this.moves + " moves" }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },

    ]

}

const cards = (state = initialState, action) => {
    switch (action.type) {
        case 'DRAW_ONE':
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



        case 'NEW_MAP':
        case 'END_CYCLE':
        case 'DISCARD':
            return {
                ...state,
                hand: [],
                discard: [
                    ...state.discard,
                    ...state.hand,
                ]
            }
        case 'ADD_CARD_TO_DISCARD':
            return {
                ...state,
                discard: [
                    ...state.discard,
                    action.payload.card
                ]
            }
        case 'UPGRADE_CARD':

            return {
                ...state,
                hand: [
                    ...state.hand.map((card) => {
                        if (card.id === action.payload.id) {
                            card[action.payload.upgrade.type] = card[action.payload.upgrade.type] + action.payload.upgrade.amount
                            console.log(card)
                            return card
                        } else {
                            return card
                        }

                    })

                ]

            }

        default:
            return state;
    }

}
export default cards