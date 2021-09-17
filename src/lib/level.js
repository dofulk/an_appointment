import { getNewCardList } from "./cardEffects"
import { v4 as uuidv4 } from 'uuid'

const generateEntityArray = (level) => {
    let entities = [
    { id: "Chest", position: "", content: getNewCardList(2), type: "building", buildingType: "Chest", sprite: "🎁" },
    { id: "Exit", position: "", type: "building", buildingType: "Exit", sprite: "🚪" }
    ]
    let i = level + 1
    while (i > 0) {
        entities.push(
            { id: uuidv4(), position: "", moves: 3, baseMoves: 3, hp: 30, maxHP: 30, attack: 4, baseAttack: 4, type: 'character', sprite: "🪲" },
            { id: uuidv4(), position: "", moves: 8, baseMoves: 8, hp: 10, maxHP: 10, attack: 1, baseAttack: 1, type: 'character', sprite: "🥷🏼" },
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
    let width = 15
    let height = 15

    let i = 0

    while (i < height) {
        let j = 0
        while (j < width) {
            let positionId = i + ',' + j


            allIds.push(positionId)

            if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
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
            characterIds.push([entityArray[entity].id])
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

    return {
        map: {
            byId: byId,
            allIds: allIds,
            validMoves: validMoves,
        },
        entities: {
            byId: entities,
            characterIds: characterIds
        }
    }

}