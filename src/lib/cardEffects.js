
import { changeAttack, changeGold, changeHp, changeMoves, addOnKill, addOnMove, addOnAttack, changeRemoveAmount, removeOn, changeBaseAttack, attackTarget } from '../redux/actions/action'
import { bloodRitual, bribe, bloodyDagger, glassCannon, dashAttack, midasDagger, pickpocket, sprint, quickHands } from '../redux/actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const cardEffects = {
    'Attack': { title: 'Attack', effect: changeAttack('player', 3), description: "Add 3 to attack", onAdd: undefined},
    'Move': { title: 'Move', effect: changeMoves('player', 2), description: "Gain 2 moves" , onAdd: undefined},
    'Heal': { title: 'Heal', effect: changeHp({id: 'player'}, 2), description: "Heal for 2 HP" , onAdd: undefined},
    'Blood Ritual': { title: 'Blood Ritual', effect: bloodRitual(), description: "Lose 2 HP, Draw 2", onAdd: undefined },
    'Bribe': { title: 'Bribe', effect: bribe(), description: "Spend 5 Gold, Draw 2" , onAdd: undefined},
    'Bloody Dagger': { title: 'Bloody Dagger', effect: bloodyDagger(), description: "Lose 2 HP, Gain 10 Attack", onAdd: undefined },
    'Piece of Silver': { title: 'Piece of Silver', effect: changeGold(5), description: "Gain 5 Gold" , onAdd: undefined},
    'Vampirism': {title: 'Vampirism', effect: addOnKill({ action: changeHp({id: 'player'}, 5), removeOn: 'endCycle' }), description: 'Gain 5 HP on a Kill', onAdd: undefined},
    'Jeffrey Bezos': {title: 'Jeffrey Bezos', effect: addOnKill({ action: changeGold(15), removeOn: 'endCycle' }), description: 'Gain 15 Gold on a Kill', onAdd: undefined},
    'Snowball': {title: 'Snowball', effect: addOnKill({ action: changeMoves('player', 3), removeOn: 'endCycle' }), description: 'Gain 3 Moves on a Kill', onAdd: undefined},
    'Meatball': {title: 'Meatball', effect: addOnKill({ action: changeAttack('player', 15), removeOn: 'endCycle' }), description: 'Gain 15 Attack on a Kill', onAdd: undefined},
    'Sneak Attack': {title: 'Sneak Attack', effect: addOnMove({ action: changeAttack('player', 2), removeOn: 'endCycle' }), description: 'Gain 2 Attack when you Move', onAdd: undefined},
    'Golden Boot': {title: 'Golden Boot', effect: addOnMove({ action: changeGold(3), removeOn: 'endCycle' }), description: 'Gain 3 Gold when you Move', onAdd: undefined},
    'Fury Blows': {title: 'Fury Blows', effect: addOnAttack({ action: changeAttack('player', 2), removeOn: 'endCycle' }), description: 'Gain 2 Attack when you Attack', onAdd: undefined},
    'Golden Fists': {title: 'Golden Fists', effect: addOnAttack({ action: changeGold(7), removeOn: 'endCycle' }), description: 'Gain 7 Gold when you Attack', onAdd: undefined},
    'Glass Cannon': {title: 'Glass Cannon', effect: glassCannon(), description: 'Gain 15 Attack, Lose 3 Attack when you Move', onAdd: undefined},
    'Dash Attack': {title: 'Dash Attack', effect: dashAttack(), description: 'Add 4 to attack and gain 1 move', onAdd: undefined},
    'Midas Dagger': {title: 'Midas Dagger', effect: midasDagger(), description: 'Add 5 to attack and gain 2 gold', onAdd: undefined},
    'Pickpocket': {title: 'Pickpocket', effect: pickpocket(), description: 'Gain 2 gold, draw 1', onAdd: undefined},
    'Sprint': {title: 'Sprint', effect: sprint(), description: 'Gain 3 moves, lose 5 attack', onAdd: undefined},
    'Quick Hands': {title: 'Quick Hands', effect: quickHands(), description: 'Gain 2 moves and draw 1', onAdd: undefined},
    'Jackpot': {title: 'Jackpot', effect: undefined, description: 'When added gain 150 gold', onAdd: changeGold(150)},
    'Second Wind': {title: 'Second Wind', effect: addOnAttack({ action: changeMoves('player', 1), removeOn: 'onAttack'}), description: 'Get a bonus move after you attack', onAdd: undefined},
    'Bulk': {title: 'Bulk', effect: changeBaseAttack('player', 1), description: 'Gain 1 attack for the rest of the floor', onAdd: undefined}

    // 'Scalpel': { title: 'Scalpel', effect: changeAttack('player', 4), description: "Add 4 to attack. When added choose a card to remove", onAdd: changeRemoveAmount(1)},

}

export const getCardEffect = (title) => {
    return cardEffects[title].effect

}

export const generateCard = (title, description) => {
    return { id: uuidv4(), cardTitle: title, description: description }
}

export const getNewCardList = (numberOfCards) => {
    let newCardList = []
    let keys = Object.keys(cardEffects);

    let i = numberOfCards
    while (i > 0) {
        let randomKey = keys[ keys.length * Math.random() << 0]
        newCardList.push(cardEffects[randomKey])
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return newCardList
   // return [{title: 'Second Wind', effect: addOnAttack({ action: changeMoves('player', 1), removeOn: 'endCycle'}), description: 'Get a bonus move after you attack', onAdd: undefined}]

}

export const generateShop = () => {


    let content = []
    let keys = Object.keys(cardEffects);

    let i = 5
    while (i > 0) {
        let randomKey = keys[ keys.length * Math.random() << 0]
        content.push(
            {type: 'card', id: uuidv4(), price: 15, content: cardEffects[randomKey]})
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return content
}