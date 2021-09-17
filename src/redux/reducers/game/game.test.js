import gameReducer, {initialState} from "./game"


describe('Game reducer', () => {
    it('should handle CHANGE_GOLD', () => {
        expect(
            gameReducer(undefined, {
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