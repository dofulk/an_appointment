

export const playerSelector = state => state.entities.byId['player']
export const singleTileSelector = (state, id) => state.tiles.byId[id]
export const tilesSelector = state => state.tiles
export const playerMovesSelector = state => state.entities.byId['player'].moves
export const entitiesIdSelector = state => state.entities.characterIds
export const entitiesArraySelector = state => state.entities.byId
export const singleEntitySelector = state => state
export const currentTurnSelector = state => state.entities.currentTurn
export const playerTurnInitiatedSelector = state => state.entities.playerTurnInitiated
export const entityByIdSelector = state => state.entities.byId

export const gameSelector = state => state.game
export const levelSelector = state => state.game.level


export const handSelector = state => state.cards.hand
export const playedCardsSelector = state => state.cards.played
export const discardSelector = state => state.cards.discard
export const drawSelector = state => state.cards.draw


export const currentPhaseSelector = state => state.game.currentPhase
export const drawAmountSelector = state => state.game.drawAmount

export const floorTurnSelector = state => state.level.floorTurn

export const selectTarget = (state) => {


}

export const goldSelector = state => state.game.gold