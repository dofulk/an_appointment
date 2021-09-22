import { attackTarget, changeHp, deleteEntity, moveEntity } from "./action"
import { batch } from "react-redux"



const batchList = (list, dispatch) => {

    for (let item in list) {
        dispatch(list[item].action)


    }
}

export const onKill = (character, id, listOfActions) => {

    return dispatch => {
        batch(() => {
            dispatch(deleteEntity(character, id))
            batchList(listOfActions, dispatch)

        })

    }
}

export const onAttack = (target, entity, listOfActions) => {

    return dispatch => {
        batch(() => {
            dispatch(attackTarget(target, entity))
            batchList(listOfActions, dispatch)

        })

    }
}
export const onMove = (targetTile, entity, listOfActions) => {

    return dispatch => {
        batch(() => {
            dispatch(moveEntity(targetTile, entity))
            batchList(listOfActions, dispatch)

        })

    }
}