import entities, { initialState } from './entities'


describe('entities reducer', () => {
    it('should return the initial state', () => {
        expect(entities(undefined, {})).toEqual(
            initialState
        )
    })


    it('should handle CHANGE_MOVES', () => {
        expect(
            entities(undefined, {
                type: 'CHANGE_MOVES',
                payload: {
                    id: 'player',
                    moves: 1,
                }
            })
        ).toEqual({
            ...initialState,
            byId: {
                ...initialState.byId,
                'player': {
                    ...initialState.byId['player'],
                    moves: initialState.byId['player'].moves + 1
                }
            }
        }
        )
    })


    it('should handle CHANGE_HP', () => {
        expect(
            entities(undefined, {
                type: 'CHANGE_HP',
                payload: {
                    id: 'player',
                    hp: -1,
                }
            })
        ).toEqual({
            ...initialState,
            byId: {
                ...initialState.byId,
                'player': {
                    ...initialState.byId['player'],
                    hp: initialState.byId['player'].hp - 1
                }
            }
        }
        )
    })

    it('should handle END_TURN', () => {
        expect(
            entities(undefined, {
                type: 'END_TURN',
                payload: 'MyTurn!'

            })
        ).toEqual({
            ...initialState,
            currentTurn: 'MyTurn!'
        })
    })



})