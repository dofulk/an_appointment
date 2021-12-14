
import { changeGold, addToUpgradeQueue, changeMaxHP } from '../redux/actions/action'
import { getCardEffect } from '../redux/actions/cardActions'
import { v4 as uuidv4 } from 'uuid'

const allCards = {

    // Tier 0
    'Attack': { title: 'Attack', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " Attack" }, onAdd: undefined, params: { attack: 1 }, tier: 0 },
    'Move': { title: 'Move', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "Gain " + this.params.moves + " moves" }, onAdd: undefined, params: { moves: 1 }, tier: 0 },

    // Tier 1
    'Heal': { title: 'Heal', get effect() { return getCardEffect('Heal', { hp: this.params.hp }) }, get description() { return "Heal for" + this.params.hp + " HP" }, onAdd: undefined, params: { hp: 1 }, tier: 1 },
    'Piece of Silver': { title: 'Piece of Silver', get effect() { return getCardEffect('Piece of Silver', { gold: this.params.gold }) }, get description() { return "Gain " + this.params.gold + " Gold" }, onAdd: undefined, params: { gold: 2 }, tier: 1 },
    'Dash Attack': { title: 'Dash Attack', get effect() { return getCardEffect('Dash Attack', { attack: this.params.attack, moves: this.params.moves }) }, get description() { return 'Add ' + this.params.attack + ' to attack and gain ' + this.params.moves + ' moves' }, onAdd: undefined, params: { attack: 2, moves: 1 }, tier: 1 },
    'Midas Dagger': { title: 'Midas Dagger', get effect() { return getCardEffect('Midas Dagger', { attack: this.params.attack, gold: this.params.gold }) }, get description() { return 'Add ' + this.params.attack + ' to attack and gain ' + this.params.gold + ' gold' }, onAdd: undefined, params: { attack: 2, gold: 1 }, tier: 1 },
    'Sprint': { title: 'Sprint', get effect() { return getCardEffect('Sprint', { moves: this.params.moves, attack: this.params.attack }) }, get description() { return 'Gain ' + this.params.moves + ' moves, ' + this.params.attack + ' attack' }, onAdd: undefined, params: { attack: -1, moves: 3 }, tier: 1 },
    'Jackpot': { title: 'Jackpot', get effect() { return getCardEffect('Jackpot', {}) }, get description() { return 'When added gain ' + this.params.gold + ' gold' }, get onAdd() { return changeGold(this.params.gold) }, params: { gold: 25 }, tier: 1 },
    'Wetstone': { title: 'Wetstone', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return '+ ' + this.params.attack + ' Attack. On Add, add ' + this.params.upgradeAmount + ' to a random card with Attack' }, get onAdd() { return addToUpgradeQueue([{ method: 'random', type: 'attack', amount: this.params.upgradeAmount }]) }, params: { attack: 2, upgradeAmount: 1 }, tier: 1 },
    'AAA': { title: 'AAA', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return '+ ' + this.params.moves + ' Moves. On Add, add ' + this.params.upgradeAmount + ' to a random card with Move' }, get onAdd() { return addToUpgradeQueue([{ method: 'random', type: 'moves', amount: this.params.upgradeAmount }]) }, params: { moves: 2, upgradeAmount: 1 }, tier: 1 },
    'Fragile Sword': { title: 'Fragile Sword', get effect() { return getCardEffect('Fragile Sword', { attack: this.params.attack, id: this.id, upgradeAmount: this.params.upgradeAmount }) }, get description() { return '+ ' + this.params.attack + ' Attack. On Play, this card permanently loses ' + this.params.upgradeAmount + ' attack' }, onAdd: undefined, params: { attack: 8, upgradeAmount: -1 }, tier: 1 },
    'Morning Strength': { title: 'Morning Strength', get effect() { return getCardEffect('Morning Strength', { attack: this.params.attack }) }, get description() { return '+ ' + this.params.attack + ' Attack. On Move, lose 1 attack' }, onAdd: undefined, params: { attack: 5 }, tier: 1 },
    'Vampirism': { title: 'Vampirism', get effect() { return getCardEffect('Vampirism', { hp: this.params.hp }) }, get description() { return 'Gain ' + this.params.hp + ' HP on a Kill' }, onAdd: undefined, params: { hp: 1 }, tier: 1 },
    'Bribe': { title: 'Bribe', get effect() { return getCardEffect('Bribe', { gold: this.params.gold, draw: this.params.draw }) }, get description() { return this.params.gold + " Gold, Draw " + this.params.draw }, onAdd: undefined, params: { gold: -1, draw: 1 }, tier: 1 },
    'Cultivate': { title: 'Cultivate', get effect() { return getCardEffect('Cultivate', {}) }, get description() { return 'When added gain ' + this.params.hp + ' max HP' }, get onAdd() { return changeMaxHP({ id: 'player' }, this.params.hp) }, params: { hp: 1 }, tier: 1 },
    'Scalpel': { title: 'Scalpel', get effect() { return getCardEffect('Attack', { attack: this.params.attack }) }, get description() { return "Add " + this.params.attack + " to attack. When added choose a card to remove" }, onAdd: addToUpgradeQueue([{ method: 'remove' }]), params: { attack: 2 }, tier: 1 },


    // Tier 2
    'Live Wire': { title: 'Live Wire', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return '+ ' + this.params.moves + ' Moves. On Add, add ' + this.params.upgradeAmount + ' to a random card with Move' }, get onAdd() { return addToUpgradeQueue([{ method: 'choose', type: 'moves', amount: this.params.upgradeAmount }]) }, params: { moves: 2, upgradeAmount: 2 }, tier: 1 },
    'Windup': { title: 'Windup', get effect() { return getCardEffect('Attack', { moves: this.params.moves }) }, get description() { return '+ ' + this.params.attack + ' Moves. On Add, add ' + this.params.upgradeAmount + ' to a random card with Move' }, get onAdd() { return addToUpgradeQueue([{ method: 'choose', type: 'attack', amount: this.params.upgradeAmount }]) }, params: { attack: 2, upgradeAmount: 2 }, tier: 1 },
    'Snowball': { title: 'Snowball', get effect() { return getCardEffect('Snowball', { moves: this.params.moves }) }, get description() { return 'Gain ' + this.params.moves + ' Moves on a Kill' }, params: { moves: 2 }, tier: 2 },
    'Bloody Dagger': { title: 'Bloody Dagger', get effect() { return getCardEffect('Bloody Dagger', { hp: this.params.hp, attack: this.params.attack }) }, get description() { return this.params.hp + " HP, Gain " + this.params.attack + " Attack" }, onAdd: undefined, params: { attack: 10, hp: -1 }, tier: 2 },
    'Golden Fists': { title: 'Golden Fists', get effect() { return getCardEffect('Golden Fists', { gold: this.params.gold }) }, get description() { return 'Gain ' + this.params.gold + ' Gold when you Attack' }, onAdd: undefined, params: { gold: 5 }, tier: 2 },
    'Dropped Baton': { title: 'Dropped Baton', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return "+ " + this.params.moves + " Moves. When added choose a card to remove" }, get onAdd() { return addToUpgradeQueue([{ method: 'remove' }]) }, params: { moves: 2 }, tier: 2 },
    'Glass Cannon': { title: 'Glass Cannon', get effect() { return getCardEffect('Glass Cannon', { attack: this.params.attack, }) }, get description() { return 'Gain ' + this.params.attack + ' Attack, Take 1 Damage when you move' }, onAdd: undefined, params: { attack: 20 }, tier: 2 },
    'Blood Ritual': { title: 'Blood Ritual', get effect() { return getCardEffect('Blood Ritual', { hp: 1, draw: 2 }) }, get description() { return "Lose 1 HP, Draw 2" }, onAdd: undefined, params: {}, tier: 2 },
    'Quick Hands': { title: 'Quick Hands', get effect() { return getCardEffect('Quick Hands', { moves: this.params.moves, draw: 1 }) }, get description() { return 'Gain ' + this.params.moves + ' moves and draw ' + this.params.draw }, onAdd: undefined, params: { moves: 1, draw: 1 }, tier: 2 },
    'Pickpocket': { title: 'Pickpocket', get effect() { return getCardEffect('Pickpocket', { draw: this.params.draw, gold: this.params.gold }) }, get description() { return 'Gain ' + this.params.gold + ' gold, draw ' + this.params.draw }, onAdd: undefined, params: { gold: 1, draw: 1 }, tier: 2 },
    'Sneak Attack': { title: 'Sneak Attack', get effect() { return getCardEffect('Sneak Attack', { attack: this.params.attack }) }, get description() { return 'Gain ' + this.params.attack + ' Attack when you Move' }, onAdd: undefined, params: { attack: 1 }, tier: 2 },
    'Golden Boot': { title: 'Golden Boot', get effect() { return getCardEffect('Golden Boot', { gold: this.params.gold }) }, get description() { return 'Gain ' + this.params.gold + ' Gold when you Move' }, onAdd: undefined, params: { gold: 1 }, tier: 2 },
    'Hitman': { title: 'Hitman', get effect() { return getCardEffect('Hitman', { gold: this.params.gold }) }, get description() { return 'Gain ' + this.params.gold + ' Gold on a Kill' }, onAdd: undefined, params: { gold: 10 }, tier: 2 },
    'Second Wind': { title: 'Second Wind', get effect() { return getCardEffect('Second Wind', { moves: this.params.moves }) }, get description() { return 'Get ' + this.params.moves + ' bonus Moves after your first attack' }, onAdd: undefined, params: { moves: 1 }, tier: 2 },


    // Tier 3 +
    'Speedy': { title: 'Speedy', get effect() { return getCardEffect('Move', { moves: this.params.moves }) }, get description() { return '+ ' + this.params.moves + ' Moves. On Add, add ' + this.params.upgradeAmount + ' to a all cards with Move' }, get onAdd() { return addToUpgradeQueue([{ method: 'all', type: 'moves', amount: this.params.upgradeAmount }]) }, params: { moves: 2, upgradeAmount: 3 }, tier: 3 },
    'Whirlwind': { title: 'Whirlwind', get effect() { return getCardEffect('Attack', { moves: this.params.moves }) }, get description() { return '+ ' + this.params.attack + ' Attack. On Add, add ' + this.params.upgradeAmount + ' to a all cards with Attack' }, get onAdd() { return addToUpgradeQueue([{ method: 'all', type: 'attack', amount: this.params.upgradeAmount }]) }, params: { attack: 2, upgradeAmount: 3 }, tier: 3 },
    'Cull': { title: 'Cull', get effect() { return getCardEffect('Cull', {}) }, get description() { return "When added choose 2 cards to remove" }, onAdd: addToUpgradeQueue([{ method: 'remove' }, { method: 'remove' }]), params: {}, tier: 3 },
    'Meatball': { title: 'Meatball', get effect() { return getCardEffect('Meatball', { attack: this.params.attack }) }, get description() { return 'Gain' + this.params.attack + ' Attack on a Kill' }, onAdd: undefined, params: { attack: 10 }, tier: 3 },


    // Concepts I'm unsure about

    //  'Bulk': { id: uuidv4(), title: 'Bulk', get effect() { return getCardEffect('Bulk', { strength: 1 }) }, get description() { return 'Gain ' + 1 + ' strength for the rest of the floor' }, onAdd: undefined, attack: 1, moves: undefined, gold: undefined },

}


const scaleParams = (params, type, factor) => {
    let newParams = {}
    switch (type) {
        case 'addition':
            for (const key in params) {
                newParams[key] = params[key] + factor
            }
            return newParams
        case 'multiply':
            for (const key in params) {
                newParams[key] = params[key] * (factor + 1)
            }
            return newParams
        case 'logarithmic':
            for (const key in params) {
                newParams[key] = params[key] * Math.pow(2, factor)
            }
            return newParams;
        default:
            return params;
    }
}

export const generateCard = (title, tier) => {
    let newObject = Object.create(
        Object.getPrototypeOf(allCards[title]),
        Object.getOwnPropertyDescriptors(allCards[title]),
    );

    newObject.params = scaleParams(newObject.params, 'multiply', (tier - newObject.tier))
    newObject.id = uuidv4()
    return newObject
}

export const getNewCardList = (numberOfCards, tier) => {
    let newCardList = []
    let allKeys = Object.keys(allCards);
    let keys = allKeys.filter(key => allCards[key].tier <= tier)

    let i = numberOfCards
    while (i > 0) {
        let randomKey = keys[keys.length * Math.random() << 0]
        newCardList.push(generateCard(randomKey, tier))
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return newCardList

}


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateShop = (tier) => {


    let content = []
    let allKeys = Object.keys(allCards);
    let keys = allKeys.filter(key => allCards[key].tier <= tier)

    let i = 5
    let multiplier = Math.pow(2, (tier - 1))
    while (i > 0) {
        let randomKey = keys[keys.length * Math.random() << 0]
        content.push(
            { type: 'card', id: uuidv4(), price: 5 * multiplier + getRandomInt(-2 * multiplier, 2 * multiplier), content: generateCard(randomKey, tier) })
        keys = keys.filter(key => key !== randomKey)
        i--
    }
    return content
}