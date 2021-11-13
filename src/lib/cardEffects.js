
import {changeGold, changeBaseAttack, } from '../redux/actions/action'
import { getCardEffect } from '../redux/actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const allCards = {
    'Attack': { id: uuidv4(), title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.attack }) }, get description() { return "Add " + this.attack + " to attack" }, onAdd: undefined, attack: 3, moves: undefined, gold: undefined },
    'Move': { id: uuidv4(), title: 'Move', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return "Gain " + this.moves + " moves" }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },
    'Heal': { id: uuidv4(), title: 'Heal', get effect() { return getCardEffect('Heal', { hp: 2 }) }, get description() { return "Heal for 2 HP" }, onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Blood Ritual': { id: uuidv4(), title: 'Blood Ritual', get effect() { return getCardEffect('Blood Ritual', { hp: 2, draw: 2 }) }, get description() { return "Lose 2 HP, Draw 2" }, onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Bribe': { id: uuidv4(), title: 'Bribe', get effect() { return getCardEffect('Bribe', { gold: 5, draw: 2 }) }, description: "Spend 5 Gold, Draw 2", onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Bloody Dagger': { id: uuidv4(), title: 'Bloody Dagger', get effect() { return getCardEffect('Bloody Dagger', { hp: 2, attack: 10 }) }, description: "Lose 2 HP, Gain 10 Attack", onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Piece of Silver': { id: uuidv4(), title: 'Piece of Silver', get effect() { return getCardEffect('Piece of Silver', { gold: 7 }) }, description: "Gain 7 Gold", onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Vampirism': { id: uuidv4(), title: 'Vampirism', get effect() { return getCardEffect('Vampirism', { hp: 5 }) }, description: 'Gain 5 HP on a Kill', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Jeffrey Bezos': { id: uuidv4(), title: 'Jeffrey Bezos', get effect() { return getCardEffect('Jeffrey Bezos', { gold: 15 }) }, description: 'Gain 15 Gold on a Kill', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Snowball': { id: uuidv4(), title: 'Snowball', get effect() { return getCardEffect('Snowball', { moves: 3 }) }, description: 'Gain 3 Moves on a Kill', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Meatball': { id: uuidv4(), title: 'Meatball', get effect() { return getCardEffect('Meatball', { attack: 15 }) }, description: 'Gain 15 Attack on a Kill', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Sneak Attack': { id: uuidv4(), title: 'Sneak Attack', get effect() { return getCardEffect('Sneak Attack', { attack: 2 }) }, description: 'Gain 2 Attack when you Move', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Golden Boot': { id: uuidv4(), title: 'Golden Boot', get effect() { return getCardEffect('Golden Boot', { gold: 2 }) }, description: 'Gain 2 Gold when you Move', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Golden Fists': { id: uuidv4(), title: 'Golden Fists', get effect() { return getCardEffect('Golden Fists', { gold: 7 }) }, description: 'Gain 7 Gold when you Attack', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Glass Cannon': { id: uuidv4(), title: 'Glass Cannon', get effect() { return getCardEffect('Glass Cannon', { attack: 15 }) }, description: 'Gain 15 Attack, Lose 3 Attack when you Move', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Dash Attack': { id: uuidv4(), title: 'Dash Attack', get effect() { return getCardEffect('Dash Attack', { attack: 4, move: 1 }) }, description: 'Add 4 to attack and gain 1 move', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Midas Dagger': { id: uuidv4(), title: 'Midas Dagger', get effect() { return getCardEffect('Midas Dagger', { attack: 5, gold: 2 }) }, description: 'Add 5 to attack and gain 2 gold', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Pickpocket': { id: uuidv4(), title: 'Pickpocket', get effect() { return getCardEffect('Pickpocket', { draw: 1, gold: 2 }) }, description: 'Gain 2 gold, draw 1', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Sprint': { id: uuidv4(), title: 'Sprint', get effect() { return getCardEffect('Sprint', { moves: 3, attack: 5 }) }, description: 'Gain 3 moves, lose 5 attack', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Quick Hands': { id: uuidv4(), title: 'Quick Hands', get effect() { return getCardEffect('Quick Hands', { moves: 2, draw: 1 }) }, description: 'Gain 2 moves and draw 1', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Jackpot': { id: uuidv4(), title: 'Jackpot', effect: undefined, description: 'When added gain 150 gold', onAdd: changeGold(150), attack: undefined, moves: undefined, gold: undefined },
    'Second Wind': { id: uuidv4(), title: 'Second Wind', get effect() { return getCardEffect('Second Wind', { moves: 1 }) }, description: 'Get a bonus move after you attack', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Bulk': { id: uuidv4(), title: 'Bulk', effect: changeBaseAttack('player', 1), description: 'Gain 1 attack for the rest of the floor', onAdd: undefined, attack: undefined, moves: undefined, gold: undefined }

    // 'Scalpel': { title: 'Scalpel', effect: changeAttack('player', 4), description: "Add 4 to attack. When added choose a card to remove", onAdd: changeRemoveAmount(1)},
    //get effect() { return getCardEffect(, {})}
}


export const generateCard = (title) => {
    return {
        ...allCards[title],
        id: uuidv4()
    }
}

export const getNewCardList = (numberOfCards) => {
    // let newCardList = []
    // let keys = Object.keys(allCards);

    // let i = numberOfCards
    // while (i > 0) {
    //     let randomKey = keys[ keys.length * Math.random() << 0]
    //     newCardList.push(allCards[randomKey])
    //     keys = keys.filter(key => key !== randomKey)
    //     i--
    // }
    // return newCardList
    return [{ id: uuidv4(), title: 'Jackpot', effect: undefined, description: 'When added gain 150 gold', onAdd: changeGold(150), attack: undefined, moves: undefined, gold: undefined }]

}

export const generateShop = () => {


    let content = []
    let keys = Object.keys(allCards);

    let i = 5
    while (i > 0) {
        let randomKey = keys[keys.length * Math.random() << 0]
        content.push(
            { type: 'card', id: uuidv4(), price: 15, content: allCards[randomKey] })
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return content
}