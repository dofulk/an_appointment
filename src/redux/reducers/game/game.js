import { changeHp, changeAttack } from "../../actions/action";

const initialState = {
  phase: 0,
  allPhases: ['cards', 'movement', 'characters'],
  isPaused: false,
  numberOfTurns: 0,
  drawAmount: 4,
  baseDraw: 4,
  gold: 10,
  level: 0,
  onKill: [{action: changeHp('player', 2), removeOn: 'endCycle'}],
  onMove: [],
  onAttack: [],
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
        onAttack: state.onAttack.filter(item => item.removeOn !== 'endCycle')
      }

    case 'NEW_CYCLE':
      return {
        ...state,
        phase: state.phase + 1,
        drawAmount: state.baseDraw
      }

    case 'CHANGE_DRAW_AMOUNT':
      return {
        ...state,
        drawAmount: state.drawAmount + action.payload.amount

      }
    case 'CHANGE_GOLD':
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
      return{
        ...state,
        level: state.level + 1,
        phase: 0,
        drawAmount: state.baseDraw
      }
      case 'ADD_ON_KILL':
        return {
          ...state,
          onKill: [
            ...state.onKill,
            action.payload.onKill
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

    default:
      return state;
  }

}

export default game