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

    it('should handle PLAY', () => {
        expect(
            cards(undefined, {
                type: 'PLAY',
                payload: {
                    id: '1'
                }
            })
        ).toEqual({
            ...initialState,
            hand: initialState.hand.filter(item => item.id !== '1'),
            played: [
                ...initialState.discard,
                ...initialState.hand.filter(item => item.id == '1')
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
            played: [],
            discard: [
                ...initialState.discard,
                ...initialState.hand,
                ...initialState.played
            ]
        })

    })


})