import { combineReducers } from "redux";
import levelReducer from "./level/level";
import entitiesReducer from "./entities/entities"
import tilesReducer from "./tiles/tiles"
import cardsReducer from "./cards/cards"
import gameReducer from "./game/game"


export default combineReducers({ level: levelReducer, tiles: tilesReducer, entities: entitiesReducer, cards: cardsReducer, game: gameReducer, });