import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to add a child to a tile', () => {
    const tile = '0,0'
    const child = 'player'
    const expectedAction = {
      type: 'ADD_CHILD',
      payload: {
        tile: tile,
        child: child
      }
    }
    expect(actions.addChild(tile, child)).toEqual(expectedAction)
  })
  it('should create an action to remove a child from a tile', () => {
    const tile = '0,0'
    const child = 'player'
    const expectedAction = {
      type: 'REMOVE_CHILD',
      payload: {
        tile: tile,
        child: child
      }
    }
    expect(actions.removeChild(tile, child)).toEqual(expectedAction)
  })
  it('should create an action change position of an entity', () => {
    const target = '0,0'
    const id = 'player'
    const expectedAction = {
      type: 'MOVE_ENTITY',
      payload: {
        target: target,
        id: id
      }
    }
    expect(actions.moveEntity(target, id)).toEqual(expectedAction)
  })

  it('should create an action to change count of an entities moves', () => {
    const id = 'player'
    const moves = 1
    const expectedAction = {
      type: 'CHANGE_MOVES',
      payload: {
        id: id,
        moves: moves,
      }
    }
    expect(actions.changeMoves(id, moves)).toEqual(expectedAction)
  })

  it('should create an action to change count of an entities hp', () => {
    const id = 'player'
    const hp = 1
    const expectedAction = {
      type: 'CHANGE_HP',
      payload: {
        id: id,
        hp: hp,
      }
    }
    expect(actions.changeHp(id, hp)).toEqual(expectedAction)
  })

  it('should create an action to change the phase of the turn', () => {
    const phase = 'cards'
    const expectedAction = {
      type: 'NEW_PHASE',
      payload: 'cards'
    }
    expect(actions.newPhase(phase)).toEqual(expectedAction)
  })
})




describe('async actions', () => {


  it('creates three actions to move a child to a new tile', async () => {
    const target = '0,0'
    const child = { id: "player", type: "player", position: "2,1" }
    const expectedActions = [
      {
        type: 'MOVE_ENTITY',
        payload: {
          target: target,
          id: child.id
        }
      },
      {
        type: 'REMOVE_CHILD',
        payload: {
          tile: child.position,
          child: child.id
        }
      },
      {
        type: 'ADD_CHILD',
        payload: {
          tile: target,
          child: child.id
        }
      }

    ]

    const store = mockStore()
    expect(store.dispatch(actions.moveChild(target, child))).toEqual(expectedActions)
  }
  )
})