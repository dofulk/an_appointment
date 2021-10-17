

export const playerSelector = state => state.entities.byId['player']
export const singleTileSelector = (state, id) => state.tiles.byId[id]
export const tilesSelector = state => state.tiles
export const playerMovesSelector = state => state.entities.byId['player'].moves
export const entitiesIdSelector = state => state.entities.characterIds
export const entitiesArraySelector = state => state.entities.byId
export const turnSelector = state => state.entities.turn
export const currentTurnSelector = state => state.entities.characterIds[state.entities.turn]
export const characterIdsSelector = state => state.entities.characterIds
export const currentEntityIdsSelector = state => state.entities.characterIds[state.entities.currentTurn]
export const currentEntitySelector = state => state.entities.byId[state.entities.characterIds[state.entities.currentTurn]]

export const entityByIdSelector = state => state.entities.byId

export const gameSelector = state => state.game
export const levelSelector = state => state.game.level


export const handSelector = state => state.cards.hand
export const discardSelector = state => state.cards.discard
export const drawSelector = state => state.cards.draw



export const phaseSelector = state => state.game.phase
export const currentPhaseSelector = state => state.game.allPhases[state.game.phase]
export const drawAmountSelector = state => state.game.drawAmount
export const numberOfCyclesSelector = state => state.game.numberOfCycles

export const floorTurnSelector = state => state.level.floorTurn

export const goldSelector = state => state.game.gold

export const onKillSelector = state => state.game.onKill
export const onMoveSelector = state => state.game.onMove
export const onAttackSelector = state => state.game.onAttack

export const heightSelector = state => state.level.height
export const widthSelector = state => state.level.width