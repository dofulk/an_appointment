import { batch } from 'react-redux'
import {changeDrawAmount, changeHp, changeGold, changeAttack, addOnKill, addOnAttack } from './action'

export const bloodRitual = () => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeDrawAmount(2))
            dispatch(changeHp({id: 'player'}, -2))
        })

    }
}

export const bribe = () => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeDrawAmount(2))
            dispatch(changeGold(-2))
        })

    }
}

export const bloodyDagger = () => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeAttack('player', 10))
            dispatch(changeHp({id: 'player'}, -2))
        })

    }
}

export const glassCannon = () => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', 10))
            dispatch(addOnAttack({ action: changeAttack('player', -3), removeOn: 'endCycle' }))
        })
    }
    
}