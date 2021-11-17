
import { changeGold, addToUpgradeQueue, changeRemoveAmount } from '../redux/actions/action'
import { getCardEffect } from '../redux/actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const allCards = {

    // Level 1
    'Attack': { title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.attack }) }, get description() { return "Add " + this.attack + " Attack" }, onAdd: undefined, attack: 3, moves: undefined, gold: undefined },
    'Move': { title: 'Move', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return "Gain " + this.moves + " moves" }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },
    'Heal': { title: 'Heal', get effect() { return getCardEffect('Heal', { hp: 2 }) }, get description() { return "Heal for 2 HP" }, onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    'Bribe': { title: 'Bribe', get effect() { return getCardEffect('Bribe', { gold: this.gold, draw: 2 }) }, get description() { return "Spend " + this.gold + " Gold, Draw 2" }, onAdd: undefined, attack: undefined, moves: undefined, gold: 5 },
    'Bloody Dagger': { title: 'Bloody Dagger', get effect() { return getCardEffect('Bloody Dagger', { hp: 1, attack: this.attack }) }, get description() { return "Lose 1 HP, Gain " + this.attack + " Attack" }, onAdd: undefined, attack: 10, moves: undefined, gold: undefined },
    'Piece of Silver': { title: 'Piece of Silver', get effect() { return getCardEffect('Piece of Silver', { gold: this.gold }) }, get description() { return "Gain " + this.gold + " Gold" }, onAdd: undefined, attack: undefined, moves: undefined, gold: 7 },
    'Golden Fists': { title: 'Golden Fists', get effect() { return getCardEffect('Golden Fists', { gold: this.gold }) }, get description() { return 'Gain ' + this.gold + ' Gold when you Attack' }, onAdd: undefined, attack: undefined, moves: undefined, gold: 7 },
    'Glass Cannon': { title: 'Glass Cannon', get effect() { return getCardEffect('Glass Cannon', { attack: this.attack, }) }, get description() { return 'Gain ' + this.attack + ' Attack, Take 1 Damage when you move' }, onAdd: undefined, attack: 20, moves: undefined, gold: undefined },
    'Dash Attack': { title: 'Dash Attack', get effect() { return getCardEffect('Dash Attack', { attack: this.attack, moves: this.moves }) }, get description() { return 'Add ' + this.attack + ' to attack and gain ' + this.moves + ' moves' }, onAdd: undefined, attack: 4, moves: 1, gold: undefined },
    'Midas Dagger': { title: 'Midas Dagger', get effect() { return getCardEffect('Midas Dagger', { attack: this.attack, gold: this.gold }) }, get description() { return 'Add ' + this.attack + ' to attack and gain ' + this.gold + ' gold' }, onAdd: undefined, attack: 4, moves: undefined, gold: 2 },
    'Pickpocket': { title: 'Pickpocket', get effect() { return getCardEffect('Pickpocket', { draw: 1, gold: this.gold }) }, get description() { return 'Gain ' + this.gold + ' gold, draw 1' }, onAdd: undefined, attack: undefined, moves: undefined, gold: 2 },
    'Sprint': { title: 'Sprint', get effect() { return getCardEffect('Sprint', { moves: this.moves, attack: this.attack }) }, get description() { return 'Gain ' + this.moves + ' moves, ' + this.attack + ' attack' }, onAdd: undefined, attack: -5, moves: 4, gold: undefined },
    'Quick Hands': { title: 'Quick Hands', get effect() { return getCardEffect('Quick Hands', { moves: this.moves, draw: 1 }) }, get description() { return 'Gain 2 moves and draw 1' }, onAdd: undefined, attack: undefined, moves: 2, gold: undefined },
    'Jackpot': { title: 'Jackpot', get effect() { return getCardEffect('Jackpot', {}) }, get description() { return 'When added gain ' + this.gold + ' gold' }, get onAdd() { return changeGold(this.gold) }, attack: undefined, moves: undefined, gold: 80 },
    'Wetstone': { title: 'Knife Sharpener', get effect() { return getCardEffect('Attack', { attack: this.attack }) }, get description() { return '+ ' + this.attack + ' Attack. On Add, add 2 to a random card with Attack' }, onAdd: addToUpgradeQueue({ method: 'random', type: 'attack', amount: 2 }), attack: 3, moves: undefined, gold: undefined },
    'AAA': { title: 'AAA Batteries', get effect() { return getCardEffect('Move', { moves: this.moves }) }, get description() { return '+ ' + this.moves + ' Moves. On Add, add 1 to a random card with Move' }, onAdd: addToUpgradeQueue({ method: 'random', type: 'moves', amount: 1 }), attack: undefined, moves: 2, gold: undefined },
    'Scalpel': { title: 'Scalpel', get effect() {return getCardEffect('player', {attack: 4})}, get description() { return "Add " +this.attack +" to attack. When added choose a card to remove"}, onAdd: changeRemoveAmount(1), attack: 4, moves: undefined, gold: undefined},


    // Level 2 +
    //    'Blood Ritual': { title: 'Blood Ritual', get effect() { return getCardEffect('Blood Ritual', { hp: 2, draw: 2 }) }, get description() { return "Lose 2 HP, Draw 2" }, onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    //     'Vampirism': { title: 'Vampirism', get effect() { return getCardEffect('Vampirism', { hp: 5 }) }, get description() { return 'Gain 5 HP on a Kill' }, onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },
    //     'Snowball': { title: 'Snowball', get effect() { return getCardEffect('Snowball', { moves: this.moves }) }, get description() { return 'Gain ' + this.moves + ' Moves on a Kill' }, onAdd: undefined, attack: undefined, moves: 3, gold: undefined },
    //     'Meatball': { title: 'Meatball', get effect() { return getCardEffect('Meatball', { attack: this.attack }) }, get description() { return 'Gain' + this.attack + ' Attack on a Kill' }, onAdd: undefined, attack: 15, moves: undefined, gold: undefined },
    //     'Sneak Attack': { title: 'Sneak Attack', get effect() { return getCardEffect('Sneak Attack', { attack: this.attack }) }, get description() { return 'Gain ' + this.attack + ' Attack when you Move' }, onAdd: undefined, attack: 2, moves: undefined, gold: undefined },
    //     'Golden Boot': { title: 'Golden Boot', get effect() { return getCardEffect('Golden Boot', { gold: this.gold }) }, get description() { return 'Gain ' + this.gold + ' Gold when you Move' }, onAdd: undefined, attack: undefined, moves: undefined, gold: 2 },
    //    'Jeffrey Bezos': { title: 'Jeffrey Bezos', get effect() { return getCardEffect('Jeffrey Bezos', { gold: this.gold }) }, get description() { return 'Gain ' + this.gold + ' Gold on a Kill' }, onAdd: undefined, attack: undefined, moves: undefined, gold: 15 },
    //     'Second Wind': { title: 'Second Wind', get effect() { return getCardEffect('Second Wind', { moves: 1 }) }, get description() { return 'Get a bonus move after you attack' }, onAdd: undefined, attack: undefined, moves: undefined, gold: undefined },

    // Concepts I'm unsure about
    //  'Bulk': { id: uuidv4(), title: 'Bulk', get effect() { return getCardEffect('Bulk', { strength: 1 }) }, get description() { return 'Gain ' + 1 + ' strength for the rest of the floor' }, onAdd: undefined, attack: 1, moves: undefined, gold: undefined },

}


export const generateCard = (title) => {
    let newObject = Object.create(
        Object.getPrototypeOf(allCards[title]),
        Object.getOwnPropertyDescriptors(allCards[title]),
    );
    newObject.id = uuidv4()
    return newObject
}

export const getNewCardList = (numberOfCards) => {
    let newCardList = []
    let keys = Object.keys(allCards);

    let i = numberOfCards
    while (i > 0) {
        let randomKey = keys[keys.length * Math.random() << 0]
        newCardList.push(generateCard(randomKey))
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return newCardList

}

export const generateShop = () => {


    let content = []
    let keys = Object.keys(allCards);

    let i = 5
    while (i > 0) {
        let randomKey = keys[keys.length * Math.random() << 0]
        content.push(
            { type: 'card', id: uuidv4(), price: 15, content: generateCard(randomKey) })
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return content
}