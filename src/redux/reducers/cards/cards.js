import { getCardEffect } from '../../actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const shuffle = (array) => {
    let m = array.length, t, i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

export const initialState = {
    draw: shuffle([
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " to attack" }, onAdd: undefined, params: { attack: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " to attack" }, onAdd: undefined, params: { attack: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " to attack" }, onAdd: undefined, params: { attack: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " to attack" }, onAdd: undefined, params: { attack: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " to attack" }, onAdd: undefined, params: { attack: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "Gain " + this.params.moves + " moves" }, onAdd: undefined, params: { moves: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "Gain " + this.params.moves + " moves" }, onAdd: undefined, params: { moves: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "Gain " + this.params.moves + " moves" }, onAdd: undefined, params: { moves: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "Gain " + this.params.moves + " moves" }, onAdd: undefined, params: { moves: 1 }, tier: 0 },
        { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "Gain " + this.params.moves + " moves" }, onAdd: undefined, params: { moves: 1 }, tier: 0 },
    ]),
    hand: [

    ],
    discard: [

    ],
    shuffles: 0

}


const cards = (state = initialState, action) => {
    switch (action.type) {
        case 'DRAW_ONE':
        case 'DRAW':
            let newHand = state.hand
            let drawPile = state.draw
            let i = action.payload.numberOfCards
            let newDiscard = state.discard
            let newShuffles = state.shuffles


            //fisher yates shuffle


            while (i > 0)
                if (Array.isArray(drawPile) && drawPile.length) {
                    newHand = [
                        ...newHand,
                        drawPile[0]
                    ]
                    drawPile = drawPile.slice(1);
                    i--;
                } else if (Array.isArray(newDiscard) && newDiscard.length) {
                    newShuffles += 1
                    drawPile = shuffle(
                        [
                            ...state.discard,
                            { id: uuidv4(), title: 'Time Scar', get effect() { return getCardEffect('Heal', { hp: this.params.hp }) }, get description() { return this.params.hp + " HP. Will Remove self on discard" }, onAdd: undefined, params: { hp: -state.shuffles }, tier: 1 },

                        ]
                    )
                    newDiscard = []
                } else {
                    i--
                }
            return {
                ...state,
                draw: drawPile,
                hand: newHand,
                discard: newDiscard,
                shuffles: newShuffles,
            }



        case 'NEW_MAP':
            return {
                ...state,
                draw: [
                    ...state.draw,
                ],
                hand: [],
                discard: [
                    ...state.discard,
                    ...state.hand.filter(card => card.title !== 'Time Scar'),
                ],

            }
            case 'END_CYCLE':
        case 'DISCARD':
            return {
                ...state,
                hand: [],
                discard: [
                    ...state.discard,
                    ...state.hand.filter(card => card.title !== 'Time Scar'),
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

        case 'REMOVE_CARD': {
            return {
                ...state,
                draw: [...state.draw.filter(card => card.id !== action.payload.id)],
                hand: [...state.hand.filter(card => card.id !== action.payload.id)],
                discard: [...state.discard.filter(card => card.id !== action.payload.id)]
            }
        }
        case 'UPGRADE_CARD':


            return {
                ...state,
                hand: [
                    ...state.hand.map((card) => {
                        if (card.id === action.payload.id) {
                            let newCard = card
                            newCard.params[action.payload.upgrade.type] = card.params[action.payload.upgrade.type] + action.payload.upgrade.amount
                            return newCard
                        } else {
                            return card
                        }

                    })

                ]

            }
        case 'NEW_GAME':
            return initialState

        default:
            return state;
    }

}
export default cards