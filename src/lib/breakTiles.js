
export const breakTiles = (validMoves, numberOfTiles, byId) => {

    if (numberOfTiles <= 0) {

        return byId
    }
    let item = validMoves[Math.floor(Math.random() * validMoves.length)]


    let newTiles = {}
    newTiles[item] = {
        ...byId[item],
        damage: byId[item].damage + 1
    }

    let newById = {
        ...byId,
        ...newTiles
    }

    return breakTiles(validMoves, (numberOfTiles - 1), newById)
}