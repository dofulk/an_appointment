
const initialState = {
  phase: 0,
  allPhases: ['cards', 'movement', 'characters'],
  isPaused: false,
  numberOfTurns: 0,
  drawAmount: 4,
  baseDraw: 4,
  gold: 10,
  level: 0,
  onKill: []

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
        phase: 0
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


    default:
      return state;
  }

}

export default game