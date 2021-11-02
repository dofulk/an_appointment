
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { entitiesArraySelector, levelSelector, numberOfCyclesSelector } from '../../redux/selectors/index'
import { Tile } from "../Tile/Tile";
import { newMap } from '../../redux/actions/action';
import { createLevel } from "../../lib/level";
import { AnimateSharedLayout } from 'framer-motion'


const selectTiles = state => state.tiles
const selectWidth = state => state.level.width
const selectHeight = state => state.level.height

function isEven(num) {
    return num % 2 === 0
}



const gamemapStyle = (width, height) => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        width: (100 * width) + 'px',
        height: (100 * height),
        alignContent: 'flex-start',
        alignSelf: 'center',

    }
}




const renderedTiles = (tiles, entities, setPlayerPosition) => {
    let tileList = []
    tiles.allIds.map(id => {
        let tile = tiles.byId[id]
        let character = tile.character
        let building = tile.building
        if (tiles.byId[id].wall) {
            return tileList.push(<Tile key={id} id={id} color="wall" character={entities[character]} building={entities[building]} setPlayerPosition={setPlayerPosition}/>)
        }
        if ((!isEven(tiles.byId[id].row) && !isEven(tiles.byId[id].column)) || (isEven(tiles.byId[id].row) && isEven(tiles.byId[id].column))) {
            return tileList.push(<Tile key={id} id={id} color="dark" character={entities[character]} building={entities[building]} setPlayerPosition={setPlayerPosition} damage={tiles.byId[id].damage}/>)
        } else {
            return tileList.push(<Tile key={id} id={id} color="light" character={entities[character]} building={entities[building]} setPlayerPosition={setPlayerPosition} damage={tiles.byId[id].damage}/>)
        }
    })
    return tileList
}



export const GameMap = ({setPlayerPosition}) => {
    const tiles = useSelector(selectTiles)
    const width = useSelector(selectWidth)
    const height = useSelector(selectHeight)

    const entitiesArray = useSelector(entitiesArraySelector)
    const level = useSelector(levelSelector)

    const numberOfCycles = useSelector(numberOfCyclesSelector)



    const dispatch = useDispatch()


    useEffect(() => {


        if (!Object.keys(tiles.byId).length) {
            console.log(level)
            dispatch(newMap(createLevel(entitiesArray.player, 0, numberOfCycles)))
        }

    })



    return (

        <div className="gamemap">
            <AnimateSharedLayout>
                <ul style={gamemapStyle(width, height)}>
                    {renderedTiles(tiles, entitiesArray, setPlayerPosition)}
                </ul>
            </AnimateSharedLayout>
        </div>

    )
}