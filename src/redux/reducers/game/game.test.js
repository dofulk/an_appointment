import game, {initialState} from "./game"


describe('Game reducer', () => {
    it('should return the initial state', () => {
        expect(game(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle CHANGE_GOLD', () => {
        expect(
            game(undefined, {
                type: 'CHANGE_GOLD',
                payload: {
                    gold: -1
                }
            })
        ).toEqual({
            ...initialState,
            gold: initialState.gold - 1
        }
        )
    })
})