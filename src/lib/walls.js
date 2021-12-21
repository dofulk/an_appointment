const eyes = (x, y) => {
    if (y === 2 && ((1 < x && x < 5) || (7 < x && x < 11))) {
        return true
    } else {
        return false
    }

}

const shades = (x, y) => {
    if ((y === 1 || y === 3) && ((1 < x && x < 5) || (7 < x && x < 11))) {
        return true
    } else {
        return false
    }
}

const squares = (x, y) => {
    if ((1 <= y &&  y <= 3) && ((1 < x && x < 5) || (7 < x && x < 11))) {
        return true
    } else {
        return false
    }
}

const crosses = (x, y) => {
    if ((y === 2 && ((2 <= x && x <= 4) || (8 <= x && x <= 10))) || ((x === 3 || x === 9) && ( 1 <= y && y <= 3 ))) {
        return true
    } else {
        return false
    }
}

const oneCross = (x, y) => {
    if ((y === 2 && (5 <= x && x <= 7)) || (x === 6  && ( 1 <= y && y <= 3 ))) {
        return true
    } else {
        return false
    }
}


const wings = (x, y) => {
    if ((y === 2 && ((2 <= x && x <= 4) || (8 <= x && x <= 10))) || (x === 6  && ( 1 <= y && y <= 3 ))) {
        return true
    } else {
        return false
    }
}

const wallFunctions = [
    'eyes',
    'shades',
    'squares',
    'crosses',
    'oneCross',
    'wings'

]

export const chooseRandomWallFunction = () => {
    return wallFunctions[Math.floor(Math.random() * wallFunctions.length)]
}

export const checkIfWall = (positionId, map) => {
    let coords = positionId.split(',')
    let x = parseInt(coords[0])
    let y = parseInt(coords[1])
    switch (map) {
        case 'eyes':
            return eyes(x, y)
        case 'shades':
            return shades(x, y)
        case 'squares':
            return squares(x, y)
        case 'crosses':
            return crosses(x, y)
        case 'oneCross':
            return oneCross(x, y)
        case 'wings':
            return wings(x, y)
        default:
            return false
    }

}