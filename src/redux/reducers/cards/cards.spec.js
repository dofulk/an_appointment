import cards, { initialState } from './cards'


describe('cards reducer', () => {
    it('should return the initial state', () => {
        expect(cards(undefined, {})).toEqual(
            initialState
        )
    })


    it('should handle DRAW', () => {
        expect(
            cards(undefined, {
                type: 'DRAW',
                payload: 1
            })
        ).toEqual({
            ...initialState,
            draw: [
                ...initialState.draw.slice(1),
            ],
            hand: [
                ...initialState.hand,
                ...initialState.draw.slice(0, 1)
            ]
        })
    })

    it('should handle DRAW with multiple cards', () => {
        expect(
            cards(undefined, {
                type: 'DRAW',
                payload: 3
            })
        ).toEqual({
            ...initialState,
            draw: [
                ...initialState.draw.slice(3),
            ],
            hand: [
                ...initialState.hand,
                ...initialState.draw.slice(0, 3)
            ]
        })
    })


    it('should handle DISCARD', () => {
        expect(
            cards(undefined, {
                type: 'DISCARD'

            })
        ).toEqual({
            ...initialState,
            hand: [],
            discard: [
                ...initialState.discard,
                ...initialState.hand,
            ]
        })

    })

    it('should ADD_CARD_TO_DISCARD', () => {
        expect(
            cards(undefined, {
                type: 'ADD_CARD_TO_DISCARD',
                payload: {
                    card: { id: 'sampleID', cardTitle: 'Move', description: "Gain 2 moves"},
                }

            })
        ).toEqual({
            ...initialState,
            discard: [
                ...initialState.discard,
                { id: 'sampleID', cardTitle: 'Move', description: "Gain 2 moves"},

            ]
        })

    })


})