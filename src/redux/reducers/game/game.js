
const initialState = {
  currentPhase: 'cards',
  isPaused: false,
  numberOfTurns: 0,
  drawAmount: 4,
  baseDraw: 4,
  gold: 10,
  level: 0

};


const game = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_PHASE':
      return {
        ...state,
        currentPhase: action.payload.phase
      }
    case 'END_CYCLE':
      return {
        ...state,
        currentPhase: 'cards'
      }

    case 'NEW_CYCLE':
      return {
        ...state,
        currentPhase: action.payload.phase,
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
        currentPhase: 'cards',
        drawAmount: state.baseDraw
      }


    default:
      return state;
  }

}

export default game