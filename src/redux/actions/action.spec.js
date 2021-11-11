import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './action'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to add a character to a tile', () => {
    const tile = '0,0'
    const child = 'player'
    const expectedAction = {
      type: 'ADD_CHARACTER',
      payload: {
        tile: tile,
        character: child
      }
    }
    expect(actions.addCharacter(tile, child)).toEqual(expectedAction)
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
    const entity = { id: "player", position: "1,1", moves: 3, baseMoves: 3, hp: 30, maxHP: 30, attack: 3, baseAttack: 4, type: 'character', sprite: "🙂" }
    const hp = 1
    const expectedAction = {
      type: 'CHANGE_HP',
      payload: {
        id: entity.id,
        hp: hp,
      }
    }
    expect(actions.changeHp(entity, hp)).toEqual(expectedAction)
  })

  it('should create an action to change the phase of the turn', () => {
    const phase = 'cards'
    const expectedAction = {
      type: 'NEW_PHASE',
      payload: {
        phase: 'cards'
      }
    }
    expect(actions.newPhase(phase)).toEqual(expectedAction)
  })

  it('should create an action change position of an entity', () => {
    const target = { id: '2,2', row: 2, column: 2, isAValidMove: true, character: [], wall: false, damage: 1, isAStructure: false, building: [] }
    const id = 'player'
    const expectedAction = {
      type: 'MOVE_ENTITY',
      payload: {
        target: target.id,
        entity: id,
        targetDamage: target.damage
      }
    }
    expect(actions.moveEntity(target, id)).toEqual(expectedAction)
  })
})





describe('async actions', () => {


})