import { batch } from 'react-redux'
import { drawCards, changeHp, changeGold, changeAttack } from './action'

export const bloodRitual = () => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(drawCards(2))
            dispatch(changeHp('player', -2))
        })

    }
}

export const bribe = () => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(drawCards(2))
            dispatch(changeGold(-2))
        })

    }
}

export const bloodyDagger = () => {
    return (dispatch, getState) => {

        batch(() => {
            dispatch(changeAttack('player', 10))
            dispatch(changeHp('player', -2))
        })

    }
}