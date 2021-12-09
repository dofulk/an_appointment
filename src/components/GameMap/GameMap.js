
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







const renderedTiles = (tiles, entities, setPlayerPositionX, setPlayerPositionY, changePosition, setModalContent) => {
    let tileList = []
    tiles.allIds.map(id => {
        let tile = tiles.byId[id]
        let character = tile.character
        let building = tile.building
        return tileList.push(<Tile key={id} id={id} color="light" characterId={character} buildingId={building} setPlayerPositionX={setPlayerPositionX} setPlayerPositionY={setPlayerPositionY} damage={tiles.byId[id].damage} changePosition={changePosition} setModalContent={setModalContent} />)
    })
    return tileList
}

const renderedEntities = (entities, sprites, width, height) => {
    let allEntities = []
    let entityKeys = Object.keys(entities)
    entityKeys.map(id => {
        if (sprites[id]) {
            return allEntities.push(<Sprite className="sprite" entity={entities[id]} key={id}
                style={{
                    transform: `translate(${sprites[id][0]}px, ${sprites[id][1]}px)`,
                    zIndex: (entities[id].type === 'building' ? 1 : 2),
                    width: (100 / width) + '%',
                    height: (100 / height) + '%',

                }} />)
        } else {
            return allEntities.push(<Sprite className="sprite" entity={entities[id]} key={id}
            />)
        }
    })
    return allEntities
}




export const GameMap = ({ setModalContent }) => {
    const tiles = useSelector(selectTiles)
    const width = useSelector(selectWidth)
    const height = useSelector(selectHeight)
    // const onNewMap = 

    const entitiesArray = useSelector(entitiesArraySelector)

    const numberOfCycles = useSelector(numberOfCyclesSelector)

    const [sprites, setSprites] = useState({})
    const [playerPositionX, setPlayerPositionX] = useState()
    const [playerPositionY, setPlayerPositionY] = useState()
    const { viewWidth } = useWindowDimensions();
    const ref = useRef()

    const gameMapTransformation = (x, y) => {
        // if ((viewWidth / 2) > x) {

        return `translate(${-0}px, ${0}px)`
        // } else if (ref.current && (ref.current.offsetWidth - (viewWidth / 2) < x)) {
        //     return `translate(${-(ref.current.offsetWidth - viewWidth)}px, ${0}px)`
        // } else {
        //     return `translate(${-(x - (viewWidth / 2))}px, ${0}px)`
        // }


    }

    const gameMapWidth = (currentRef) => {
        if (!currentRef) {
            return 0
        } else {
            return (currentRef.offsetHeight / height * width) + 'px'
        }

    }

    const gamemapStyle = (width, height) => {
        return {
            display: 'flex',
            flexWrap: 'wrap',
            width: gameMapWidth(ref.current),
            height: '100%',
            alignContent: 'flex-start',
            alignSelf: 'center',


        }
    }

    const gameMapContainerStyle = () => {
        return {
            transform: gameMapTransformation(playerPositionX, playerPositionY),
            top: '0',
            left: '0',
            height: '100%'
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
            {renderedEntities(entitiesArray, sprites, width, height)}
            <div style={gamemapStyle(width, height)}>
                {renderedTiles(tiles, entitiesArray, setPlayerPositionX, setPlayerPositionY, changePosition, setModalContent)}
            </div>
        </div>

    )
}