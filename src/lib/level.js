import { getNewCardList, generateShop } from "./cardEffects"
import { v4 as uuidv4 } from 'uuid'

const generateEntityArray = (level) => {
    let entities = [
        { id: "Chest", position: "", content: getNewCardList(2), type: "building", buildingType: "Chest", sprite: "🎁" },
        { id: "Exit", position: "", isLocked: true, type: "building", buildingType: "Exit", sprite: "🚪" },
        { id: "Arcade", position: "", type: "building", buildingType: "Arcade", sprite: "🎰" },
        { id: "Shop", position: "", content: generateShop(), type: "building", buildingType: "Shop", sprite: "💲" },
        { id: "Key", position: "", type: "building", buildingType: "Key", sprite: "🔑" }
    ]
    let i = Math.floor((level + 3)/2)
    while (i > 0) {
        entities.push(
            { id: uuidv4(), position: "", moves: 3, baseMoves: 3, hp: 30, maxHP: 30, attack: 4, baseAttack: 4, type: 'character', sprite: "🪲" },
            { id: uuidv4(), position: "", moves: 6, baseMoves: 6, hp: 10, maxHP: 10, attack: 1, baseAttack: 1, type: 'character', sprite: "🥷🏼" },
            { id: uuidv4(), position: "", moves: 4, baseMoves: 4, hp: 15, maxHP: 15, attack: 6, baseAttack: 6, type: 'character', sprite: "🦊" },
        )
        i--
    }
    return entities
}

export const createLevel = (player, level) => {

    let entityArray = generateEntityArray(level)
    console.log(player)
    entityArray.push(player)

    let byId = {}
    let allIds = []
    let validMoves = []
    let width = 9 + (2 * Math.round(level/2))
    let height = 9 + (2 * Math.round(level/2))

    let i = 0

    //checks if point a,b is inside of circle with radius r and center x,y
    let checkInCircle = (a, b, x, y, r) => {
        let dist_points = (a - x) * (a - x) + (b - y) * (b - y);
        r *= r;
      
        if (dist_points < r) {
          return true;
        }
      
        return false;
      }

    let radius = Math.round(height / 2 - 1)
    let x = Math.round(width / 2 - 1)
    let y = Math.round(height / 2 -1)  

    while (i < height) {
        let j = 0
        while (j < width) {
            let positionId = i + ',' + j


            allIds.push(positionId)

            if (!checkInCircle(i, j, x, y, radius)) {
                byId = {
                    ...byId,
                    [positionId]: { id: positionId, row: i, column: j, isAValidMove: false, character: [], wall: true, damage: 0, isAStructure: true, building: [] },
                }
            } else {
                validMoves.push(positionId)
                byId = {
                    ...byId,
                    [positionId]: { id: positionId, row: i, column: j, isAValidMove: true, character: [], wall: false, damage: 0, isAStructure: false, building: [] },
                }
            }

            j++
        }
        i++
    }

    

    let entities = {}
    let characterIds = []

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
    console.log(characterIds)
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
        }
    }

}