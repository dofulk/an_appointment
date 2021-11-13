
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { entitiesArraySelector, numberOfCyclesSelector } from '../../redux/selectors/index'
import { Tile } from "../Tile/Tile";
import { newMap } from '../../redux/actions/action';
import { createLevel } from "../../lib/level";
import { Sprite } from "../Sprite/Sprite";
import './GameMap.css'


const selectTiles = state => state.tiles
const selectWidth = state => state.level.width
const selectHeight = state => state.level.height

function isEven(num) {
    return num % 2 === 0
}


const getWindowDimensions = () => {
    const { innerWidth: viewWidth, innerHeight: viewHeight } = window;
    return {
        viewWidth,
        viewHeight
    };
}


const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}







const renderedTiles = (tiles, entities, setPlayerPositionX, setPlayerPositionY, changePosition) => {
    let tileList = []
    tiles.allIds.map(id => {
        let tile = tiles.byId[id]
        let character = tile.character
        let building = tile.building
        if (tiles.byId[id].wall) {
            return tileList.push(<Tile key={id} id={id} color="wall" character={entities[character]} building={entities[building]} setPlayerPositionX={setPlayerPositionX} setPlayerPositionY={setPlayerPositionY} changePosition={changePosition} />)
        }
        if ((!isEven(tiles.byId[id].row) && !isEven(tiles.byId[id].column)) || (isEven(tiles.byId[id].row) && isEven(tiles.byId[id].column))) {
            return tileList.push(<Tile key={id} id={id} color="dark" character={entities[character]} building={entities[building]} setPlayerPositionX={setPlayerPositionX} setPlayerPositionY={setPlayerPositionY} damage={tiles.byId[id].damage} changePosition={changePosition} />)
        } else {
            return tileList.push(<Tile key={id} id={id} color="light" character={entities[character]} building={entities[building]} setPlayerPositionX={setPlayerPositionX} setPlayerPositionY={setPlayerPositionY} damage={tiles.byId[id].damage} changePosition={changePosition} />)
        }
    })
    return tileList
}

const renderedEntities = (entities, sprites) => {
    let allEntities = []
    let entityKeys = Object.keys(entities)
    entityKeys.map(id => {
        if (sprites[id]) {
            return allEntities.push(<Sprite className="sprite" entity={entities[id]} key={id}
                style={{
                    transform: `translate(${sprites[id][0]}px, ${sprites[id][1]}px)`,
                    zIndex: (entities[id].type === 'building' ? 1 : 2)

                }} />)
        } else {
            return allEntities.push(<Sprite className="sprite" entity={entities[id]} key={id}
            />)
        }
    })
    return allEntities
}




export const GameMap = () => {
    const tiles = useSelector(selectTiles)
    const width = useSelector(selectWidth)
    const height = useSelector(selectHeight)
    // const onNewMap = 

    const entitiesArray = useSelector(entitiesArraySelector)

    const numberOfCycles = useSelector(numberOfCyclesSelector)

    const [sprites, setSprites] = useState({})
    const [playerPositionX, setPlayerPositionX] = useState()
    const [playerPositionY, setPlayerPositionY] = useState()
    const { viewHeight, viewWidth } = useWindowDimensions();
    const ref = useRef()

    const gameMapTransformation = (x, y) => {
        if ((viewWidth / 2) > x) {
            console.log(viewHeight, viewWidth)

            return `translate(${-0}px, ${-y}px)`
        } else if (ref.current && (ref.current.offsetWidth - (viewWidth / 2) < x )) {
            return `translate(${-(ref.current.offsetWidth - viewWidth)}px, ${-y}px)`
        } else {
            return `translate(${-(x - (viewWidth / 2))}px, ${-y}px)`
        }


    }


    const gamemapStyle = (width, height) => {
        return {
            display: 'flex',
            flexWrap: 'wrap',
            width: (150 * width) + 'px',
            height: (150 * height) + 'px',
            alignContent: 'flex-start',
            alignSelf: 'center',


        }
    }

    const gameMapContainerStyle = () => {
        return {
            transform: gameMapTransformation(playerPositionX, playerPositionY),
            top: '45%',
            left: '0',
        }
    }

    const dispatch = useDispatch()


    useEffect(() => {


        if (!Object.keys(tiles.byId).length) {
            dispatch(newMap(createLevel(entitiesArray.player, 0, numberOfCycles)))
        }

    })



    const changePosition = useCallback(
        (x, y, id) => {

            setSprites(prevSprites => {
                return {
                    ...prevSprites,
                    [id]: [x, y]
                }
            })

        }, [setSprites]
    )


    return (

        <div className="gamemap" style={gameMapContainerStyle()} ref={ref}>
            {renderedEntities(entitiesArray, sprites)}
            <ul style={gamemapStyle(width, height)}>
                {renderedTiles(tiles, entitiesArray, setPlayerPositionX, setPlayerPositionY, changePosition)}
            </ul>
        </div>

    )
}