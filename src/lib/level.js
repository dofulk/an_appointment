import { getNewCardList, generateShop } from "./cardEffects"
import { v4 as uuidv4 } from 'uuid'
import { breakTiles } from "./breakTiles"

const generateEntityArray = (level) => {
    let entities = [
        { id: uuidv4(), position: "", content: getNewCardList(2), type: "building", buildingType: "Chest", sprite: "🎁" },

        { id: uuidv4(), position: "", type: "building", buildingType: "Arcade", sprite: "🎰" },
        { id: uuidv4(), position: "", content: generateShop(), type: "building", buildingType: "Shop", sprite: "💲" },
        { id: uuidv4(), position: "", type: "building", buildingType: "Key", sprite: "🔑" },
        { id: uuidv4(), position: "", type: "building", buildingType: "Medic", sprite: "🏥" },
        { id: uuidv4(), position: "", type: "building", gold: 10, buildingType: "GoldPile", sprite: "💰" },
        { id: uuidv4(), position: "", type: "building", gold: 10, buildingType: "GoldPile", sprite: "💰" },
        { id: uuidv4(), position: "", type: "building", gold: 10, buildingType: "GoldPile", sprite: "💰" },
        { id: uuidv4(), position: "", type: "building", gold: 10, buildingType: "GoldPile", sprite: "💰" },
    ]
    let i = Math.floor((level + 3) / 2)
    while (i > 0) {
        entities.push(
            { id: uuidv4(), position: "", moves: 1, baseMoves: 1, hp: 30, maxHP: 30, attack: 1, baseAttack: 1, type: 'character', sprite: "🪲" },
            { id: uuidv4(), position: "", moves: 1, baseMoves: 1, hp: 10, maxHP: 10, attack: 6, baseAttack: 6, type: 'character', sprite: "🥷🏼" },
            { id: uuidv4(), position: "", moves: 1, baseMoves: 1, hp: 15, maxHP: 15, attack: 3, baseAttack: 3, type: 'character', sprite: "🦊" },
        )
        i--
    }
    return entities
}

export const createLevel = (player, level, numberOfCycles) => {




    let entityArray = generateEntityArray(level)

    let byId = {}
    let allIds = []
    let validMoves = []
    let width = 20
    let height = 4

    let i = 0


    while (i < height) {
        let j = 0
        while (j < width) {
            let positionId = j + ',' + i


            allIds.push(positionId)
            validMoves.push(positionId)
            byId = {
                ...byId,
                [positionId]: { id: positionId, row: i, column: j, isAValidMove: true, character: [], wall: false, damage: 0, isAStructure: false, building: [] },

            }

            j++
        }
        i++
    }


    byId = breakTiles(validMoves, numberOfCycles, byId)



    let playerPosition = '0,0'
    player.position = playerPosition
    validMoves = validMoves.filter(item => item !== playerPosition)
    byId = {
        ...byId,
        [playerPosition]: {
            ...byId[playerPosition],
            character: player.id,
            isAValidMove: false
        }
    }


    let exit = { id: "Exit", position: "", isLocked: true, type: "building", buildingType: "Exit", sprite: "🪜" }


    let exitPosition = (width - 1) + ',' + (height - 1)
    exit.position = exitPosition
    validMoves = validMoves.filter(item => item !== exitPosition)

    byId = {
        ...byId,
        [exitPosition]: {
            ...byId[exitPosition],
            building: exit.id,
        }
    }
    let entities = {
        "player": player,
        "Exit": exit,
    }
    let characterIds = ['player']


    for (const entity in entityArray) {
        let position = validMoves[Math.floor(Math.random() * validMoves.length)]





        validMoves = validMoves.filter(item => item !== position)

        if (entityArray[entity].type === 'character') {

            characterIds.push(entityArray[entity].id)
            byId = {
                ...byId,
                [position]: {
                    ...byId[position],
                    character: entityArray[entity].id,
                    isAValidMove: false
                }
            }
            entities = {
                ...entities,
                [entityArray[entity].id]: {
                    ...entityArray[entity],
                    position: position
                }
            }
        } else if (entityArray[entity].type === 'building') {
            byId = {
                ...byId,
                [position]: {
                    ...byId[position],
                    building: entityArray[entity].id,
                }
            }
            entities = {
                ...entities,
                [entityArray[entity].id]: {
                    ...entityArray[entity],
                    position: position
                }
            }




        }
    }


    //puts player at the front of character array
    characterIds = characterIds.filter(id => id !== "player")
    characterIds.unshift('player')
    return {
        map: {
            byId: byId,
            allIds: allIds,
            validMoves: validMoves,
            height: height,
            width: width,
        },
        entities: {
            byId: entities,
            characterIds: characterIds
        },
        level: level + 1
    }

}