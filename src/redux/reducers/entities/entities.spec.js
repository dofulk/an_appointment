
import entities, { initialState } from './entities'


describe('entities reducer', () => {
    it('should return the initial state', () => {
        expect(entities(undefined, {})).toEqual(
            initialState
        )
    })

    it('should handle MOVE_ENTITY', () => {
        expect(
            entities(undefined, {
                type: 'MOVE_ENTITY',
                payload: {
                    targetDamage: 0,
                    target: '1,2',
                    entity: initialState.byId.player
                }
            })
        ).toEqual({
            ...initialState,
            byId: {
                ...initialState.byId,
                'player': {
                    ...initialState.byId['player'],
                    position: '1,2',
                    moves: initialState.byId['player'].moves - 1
                }
            }
        }
        )
    })

    it('should handle MOVE_ENTITY with target Damage', () => {
        expect(
            entities(undefined, {
                type: 'MOVE_ENTITY',
                payload: {
                    targetDamage: 2,
                    target: '1,2',
                    entity: initialState.byId.player
                }
            })
        ).toEqual({
            ...initialState,
            byId: {
                ...initialState.byId,
                'player': {
                    ...initialState.byId['player'],
                    position: '1,2',
                    moves: initialState.byId['player'].moves - 1,
                    hp: initialState.byId['player'].hp - 2
                }
            }
        }
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




})