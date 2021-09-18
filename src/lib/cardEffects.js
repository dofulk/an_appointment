
import { changeAttack, changeGold, changeHp, changeMoves, } from '../redux/actions/action'
import { bloodRitual, bribe, bloodyDagger } from '../redux/actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const cardEffects = {
    'Attack': { title: 'Attack', effect: changeAttack('player', 2), description: "Add 2 to attack" },
    'Move': { title: 'Move', effect: changeMoves('player', 1), description: "Gain 1 move" },
    'Heal': { title: 'Heal', effect: changeHp('player', 2), description: "Heal for 2 HP" },
    'Blood Ritual': { title: 'Blood Ritual', effect: bloodRitual(), description: "Lose 2 HP, Draw 2" },
    'Bribe': { title: 'Bribe', effect: bribe(), description: "Spend 2 Gold, Draw 2" },
    'Bloody Dagger': { title: 'Bloody Dagger', effect: bloodyDagger(), description: "Lose 2 HP, Gain 10 Attack" },
    'Piece of Silver': { title: 'Piece of Silver', effect: changeGold(2), description: "Gain 2 Gold" }

}

export const getCardEffect = (title) => {
    return cardEffects[title].effect

}

export const generateCard = (title) => {
    return { id: uuidv4(), cardTitle: title }
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