
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { entitiesArraySelector, levelSelector} from '../../redux/selectors/index'
import { Tile } from "../Tile/Tile";
import { newMap } from '../../redux/actions/action';
import { createLevel } from "../../lib/level";


const selectTiles = state => state.tiles
const selectWidth = state => state.level.width


function isEven(num) {
    return num % 2 === 0
}



const gamemapStyle = width => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        width: (50 * width) + 'px',
        alignContent: 'flex-start',
        alignSelf: 'center'
    }
}


const renderedTiles = (tiles, entities) => {
    let tileList = []
    tiles.allIds.map(id => {
        let tile = tiles.byId[id]
        let character = tile.character
        let building = tile.building
        if (tiles.byId[id].wall) {
            return tileList.push(<Tile key={id} id={id} color="wall" character={entities[character]} building={entities[building]}/>)
        }
        if ((!isEven(tiles.byId[id].row) && !isEven(tiles.byId[id].column)) || (isEven(tiles.byId[id].row) && isEven(tiles.byId[id].column))) {
            return tileList.push(<Tile key={id} id={id} color="dark" character={entities[character]} building={entities[building]} damage={tiles.byId[id].damage} />)
        } else {
            return tileList.push(<Tile key={id} id={id} color="light" character={entities[character]} building={entities[building]} damage={tiles.byId[id].damage} />)
        }
    })
    return tileList
}



export const GameMap = () => {
    const tiles = useSelector(selectTiles)
    const width = useSelector(selectWidth)

    const entitiesArray = useSelector(entitiesArraySelector)
    const level = useSelector(levelSelector)




    const dispatch = useDispatch()


    useEffect(() => {
        

        if (!Object.keys(tiles.byId).length) {
            console.log(level)
            dispatch(newMap(createLevel(entitiesArray.player, 1)))
        }

    })



    return (
        <div style={{
            display: "flex",
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={gamemapStyle(width)}>
                {renderedTiles(tiles, entitiesArray)}
            </div>
        </div>
    )
}