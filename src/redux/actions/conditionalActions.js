import { changeHp, deleteEntity } from "./action"
import { batch } from "react-redux"
export const onKill = (character, id, onKill) => {
    return dispatch => {
        batch(() => {
            dispatch(deleteEntity(character, id))
            dispatch(onKill)
        })

    }
}