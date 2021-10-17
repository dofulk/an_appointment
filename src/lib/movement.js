
const moveDown = (origin, distance) => {

    let cordinate = origin.split(',')
    let target = cordinate[0] + "," + (Number(cordinate[1]) + distance)
    return target
}

const moveUp = (origin, distance) => {

    let cordinate = origin.split(',')
    let target = cordinate[0] + "," + (Number(cordinate[1]) - distance)
    return target
}

const moveLeft = (origin, distance) => {

    let cordinate = origin.split(',')
    let target = (Number(cordinate[0]) - distance) + "," + cordinate[1]
    return target
}
const moveRight = (origin, distance) => {

    let cordinate = origin.split(',')
    let target = (Number(cordinate[0]) + distance)+ "," + cordinate[1]
    return target
}

export const choosePlayerTarget = (position, keystroke) => {

    switch (keystroke) {
        case 'ArrowUp':
            return moveUp(position, 1)
        case 'ArrowRight':
            return moveRight(position, 1)
        case 'ArrowDown':
            return moveDown(position, 1)
        case 'ArrowLeft':
            return moveLeft(position, 1)
        default:
            break;
    }
}
