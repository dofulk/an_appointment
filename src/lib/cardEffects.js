
import { changeAttack, changeGold, changeHp, changeMoves, addOnKill, addOnMove, addOnAttack } from '../redux/actions/action'
import { bloodRitual, bribe, bloodyDagger, glassCannon } from '../redux/actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const cardEffects = {
    'Attack': { title: 'Attack', effect: changeAttack('player', 2), description: "Add 2 to attack" },
    'Move': { title: 'Move', effect: changeMoves('player', 1), description: "Gain 1 move" },
    'Heal': { title: 'Heal', effect: changeHp({id: 'player'}, 2), description: "Heal for 2 HP" },
    'Blood Ritual': { title: 'Blood Ritual', effect: bloodRitual(), description: "Lose 2 HP, Draw 2" },
    'Bribe': { title: 'Bribe', effect: bribe(), description: "Spend 2 Gold, Draw 2" },
    'Bloody Dagger': { title: 'Bloody Dagger', effect: bloodyDagger(), description: "Lose 2 HP, Gain 10 Attack" },
    'Piece of Silver': { title: 'Piece of Silver', effect: changeGold(2), description: "Gain 2 Gold" },
    'Vampirism': {title: 'Vampirism', effect: addOnKill({ action: changeHp({id: 'player'}, 2), removeOn: 'endCycle' }), description: 'Gain 2 HP on a Kill'},
    'Jeffrey Bezos': {title: 'Jeffrey Bezos', effect: addOnKill({ action: changeGold(5), removeOn: 'endCycle' }), description: 'Gain 5 Gold on a Kill'},
    'Snowball': {title: 'Snowball', effect: addOnKill({ action: changeMoves('player', 2), removeOn: 'endCycle' }), description: 'Gain 2 Moves on a Kill'},
    'Meatball': {title: 'Meatball', effect: addOnKill({ action: changeAttack('player', 3), removeOn: 'endCycle' }), description: 'Gain 3 Attack on a Kill'},
    'Sneak Attack': {title: 'Sneak Attack', effect: addOnMove({ action: changeAttack('player', 1), removeOn: 'endCycle' }), description: 'Gain 1 Attack when you Move'},
    'Golden Boot': {title: 'Golden Boot', effect: addOnMove({ action: changeGold(1), removeOn: 'endCycle' }), description: 'Gain 1 Gold when you Move'},
    'Fury Blows': {title: 'Fury Blows', effect: addOnAttack({ action: changeAttack('player', 2), removeOn: 'endCycle' }), description: 'Gain 1 Attack when you Attack'},
    'Golden Fists': {title: 'Golden Fists', effect: addOnAttack({ action: changeGold(1), removeOn: 'endCycle' }), description: 'Gain 1 Gold when you Attack'},
    'Glass Cannon': {title: 'Glass Cannon', effect: glassCannon(), description: 'Gain 10 Attack, Lose 3 Attack when you Attack'},



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
    console.log(newCardList)
    return newCardList
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