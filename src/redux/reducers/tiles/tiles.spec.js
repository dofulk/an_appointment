import tiles, {initialState} from "./tiles"


describe('Tiles reducer', () => {
    it('should return the initial state', () => {
        expect(tiles(undefined, {})).toEqual(
            initialState
        )
    })
    // it('should handle CHANGE_GOLD', () => {
    //     expect(
    //         game(undefined, {
    //             type: 'CHANGE_GOLD',
    //             payload: {
    //                 gold: -1
    //             }
    //         })
    //     ).toEqual({
    //         ...initialState,
    //         gold: initialState.gold - 1
    //     }
    //     )
    // })
})