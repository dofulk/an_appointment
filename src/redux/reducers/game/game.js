

export const initialState = {
  phase: 0,
  allPhases: ['cards', 'player', 'enemies'],
  isPaused: false,
  numberOfCycles: 0,
  drawAmount: 4,
  baseDraw: 4,
  gold: 10,
  level: 0,
  onKill: [],
  onMove: [],
  onAttack: [],
  onNewMap: [],
  upgradeQueue: [],

};


const game = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_PHASE':
      return {
        ...state,
        phase: state.phase + 1
      }
    case 'END_CYCLE':
      return {
        ...state,
        phase: 0,
        onKill: state.onKill.filter(item => item.removeOn !== 'endCycle'),
        onMove: state.onMove.filter(item => item.removeOn !== 'endCycle'),
        onAttack: state.onAttack.filter(item => item.removeOn !== 'endCycle'),

      }

    case 'ON_ATTACK':
      return {
        ...state,
        onKill: state.onKill.filter(item => item.removeOn !== 'onAttack'),
        onMove: state.onMove.filter(item => item.removeOn !== 'onAttack'),
        onAttack: state.onAttack.filter(item => item.removeOn !== 'onAttack'),

      }

    case 'NEW_CYCLE':
      return {
        ...state,
        phase: state.phase + 1,
        drawAmount: state.baseDraw,
        numberOfCycles: state.numberOfCycles + 1
      }

    case 'DRAW_ONE':
    case 'CHANGE_DRAW_AMOUNT':
      return {
        ...state,
        drawAmount: state.drawAmount + action.payload.amount

      }
    case 'CHANGE_GOLD':
    case 'BUY_CARD':
      if (state.gold + action.payload.gold <= 0) {
        return {
          ...state,
          gold: 0
        }
      } else {
        return {
          ...state,
          gold: state.gold + action.payload.gold
        }

      }
    case 'NEW_MAP':
      return {
        ...state,
        level: action.payload.level,
        phase: 0,
        drawAmount: state.baseDraw,
        onKill: state.onKill.filter(item => item.removeOn !== 'newMap' && item.removeOn !== 'endCycle'),
        onMove: state.onMove.filter(item => item.removeOn !== 'newMap' && item.removeOn !== 'endCycle'),
        onAttack: state.onAttack.filter(item => item.removeOn !== 'newMap' && item.removeOn !== 'endCycle'),
        onNewMap: []
      }
    case 'ADD_ON_KILL':
      return {
        ...state,
        onKill: [
          ...state.onKill,
          action.payload.onKill,

        ]
      }
    case 'ADD_ON_MOVE':
      return {
        ...state,
        onMove: [
          ...state.onMove,
          action.payload.onMove
        ]
      }
    case 'ADD_ON_ATTACK':
      return {
        ...state,
        onAttack: [
          ...state.onAttack,
          action.payload.onAttack
        ]
      }
    case 'REMOVE_ON':
      return {
        ...state,
        onPlay: [
          ...state.removeOn,
          action.payload.removeOn
        ]
      }
    case 'ADD_TO_UPGRADE_QUEUE':
      return {
        ...state,
        upgradeQueue: [
          ...state.upgradeQueue,
          ...action.payload.upgrades
        ]
      }
    case 'REMOVE_CARD':
    case 'UPGRADE_CARD':
      return {
        ...state,
        upgradeQueue: state.upgradeQueue.slice(1)
      }

    case 'NEW_GAME':
      return initialState

    default:
      return state;
  }

}

export default game