import { batch } from 'react-redux'
import { changeDrawAmount, changeHP, changeGold, changeAttack, addOnKill, addOnAttack, changeMoves, addOnMove, changeBaseAttack, addToUpgradeQueue } from './action'




const attack = (params) => {
    return changeAttack('player', params.attack)
}

const move = (params) => {
    return changeMoves('player', params.moves)
}
const heal = (params) => {
    return changeHP({ id: 'player' }, params.hp)
}

const bloodRitual = (params) => {

    return (dispatch) => {


        batch(() => {
            dispatch(changeDrawAmount(params.draw))
            dispatch(changeHP({ id: 'player' }, -params.hp))
        })

    }
}

const bribe = (params) => {
    return (dispatch) => {

        batch(() => {
            dispatch(changeDrawAmount(params.draw))
            dispatch(changeGold(-params.gold))
        })

    }
}

const bloodyDagger = (params) => {
    return (dispatch) => {

        batch(() => {
            dispatch(changeAttack('player', params.attack))
            dispatch(changeHP({ id: 'player' }, params.hp))
        })

    }
}
const pieceOfSilver = (params) => {
    return changeGold(params.gold)
}


const vampirism = (params) => {
    return addOnKill({ action: changeHP({ id: 'player' }, params.hp), removeOn: 'endCycle' })
}

const hitman = (params) => {
    return addOnKill({ action: changeGold(params.gold), removeOn: 'endCycle' })
}
const snowball = (params) => {
    return addOnKill({ action: changeMoves('player', params.moves), removeOn: 'endCycle' })
}

const meatball = (params) => {
    return addOnKill({ action: changeAttack('player', params.attack), removeOn: 'endCycle' })
}

const sneakAttack = (params) => {
    return addOnMove({ action: changeAttack('player', params.attack), removeOn: 'endCycle' })
}

const goldenBoot = (params) => {
    return addOnMove({ action: changeGold(params.gold), removeOn: 'endCycle' })
}
const goldenFists = (params) => {
    return addOnAttack({ action: changeGold(params.gold), removeOn: 'endCycle' })
}

const glassCannon = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', params.attack))
            dispatch(addOnMove({ action: changeHP({ id: 'player'}, -1), removeOn: 'endCycle' }))
        })
    }

}

const dashAttack = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', params.attack))
            dispatch(changeMoves('player', params.moves))
        })
    }
}

const midasDagger = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', params.attack))
            dispatch(changeGold(params.gold))
        })
    }
}


const pickpocket = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeDrawAmount(params.draw))
            dispatch(changeGold(params.gold))
        })
    }
}


const sprint = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeMoves('player', params.moves))
            dispatch(changeAttack('player', -params.attack))
        })
    }
}

const quickHands = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeMoves('player', params.moves))
            dispatch(changeDrawAmount(params.draw))
        })
    }
}
const secondWind = (params) => {
    return addOnAttack({ action: changeMoves('player', params.moves), removeOn: 'endCycle' })
}

const bulk = (params) => {

    changeBaseAttack('player', params.strength)
}

const fragileSword = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', params.attack))
            dispatch(addToUpgradeQueue([{ id: params.id, method: 'id', type: 'attack', amount: params.upgradeAmount }]))
        })
    }
}

const morningStrength = (params) => {
    return dispatch => {
        batch(() => {
            dispatch(changeAttack('player', params.attack))
            dispatch(addOnMove({ action: changeAttack('player', -1), removeOn: 'endCycle' }))
        })
    }
}

export const getCardEffect = (effect, params) => {

    switch (effect) {
        case 'Attack':
            return attack(params)
        case 'Move':
            return move(params)
        case 'Heal':
            return heal(params)
        case 'Blood Ritual':
            return bloodRitual(params)
        case 'Bribe':
            return bribe(params)
        case 'Bloody Dagger':
            return bloodyDagger(params)
        case 'Piece of Silver':
            return pieceOfSilver(params)
        case 'Vampirism':
            return vampirism(params)
        case 'Hitman':
            return hitman(params)
        case 'Snowball':
            return snowball(params)
        case 'Meatball':
            return meatball(params)
        case 'Sneak Attack':
            return sneakAttack(params)
        case 'Golden Boot':
            return goldenBoot(params)
        case 'Golden Fists':
            return goldenFists(params)
        case 'Glass Cannon':
            return glassCannon(params)
        case 'Dash Attack':
            return dashAttack(params)
        case 'Midas Dagger':
            return midasDagger(params)
        case 'Pickpocket':
            return pickpocket(params)
        case 'Sprint':
            return sprint(params)
        case 'Quick Hands':
            return quickHands(params)
        case 'Second Wind':
            return secondWind(params)
        case 'Bulk':
            return bulk(params)
        case 'Fragile Sword': 
            return fragileSword(params)
        case 'Morning Strength':
            return morningStrength(params)
        default:
            console.log('no action')
            return {
                type: 'NO_ACTION'
            }
    }
}