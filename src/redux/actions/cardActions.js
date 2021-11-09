import { batch } from 'react-redux'
import {changeDrawAmount, changeHp, changeGold, changeAttack, addOnKill, addOnAttack, changeMoves, draw } from './action'

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
            dispatch(addOnAttack({ action: changeMoves('player', -3), removeOn: 'endCycle' }))
        })
    }
    
}

export const dashAttack = () => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', 4))
            dispatch(changeMoves('player', 1))
        })
    }
}


export const midasDagger = () => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', 5))
            dispatch(changeGold(2))
        })
    }
}

export const pickpocket = () => {
    return dispatch => {
        batch(() => {
            dispatch(changeDrawAmount(1))
            dispatch(changeGold(2))
        })
    }
}

export const sprint = () => {
    return dispatch => {
        batch(() => {
            dispatch(changeMoves('player', 3))
            dispatch(changeAttack('player', -5))
        })
    }
}


export const quickHands = () => {
    return dispatch => {
        batch(() => {
            dispatch(changeMoves('player', 2))
            dispatch(changeDrawAmount(1))
        })
    }
}