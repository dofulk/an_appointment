import tiles, {initialState} from "./tiles"


describe('Tiles reducer', () => {
    it('should return the initial state', () => {
        expect(tiles(undefined, {})).toEqual(
            initialState
        )
    })
})