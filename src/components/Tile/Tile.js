import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { heightSelector, widthSelector } from "../../redux/selectors";
import './Tile.css'

const tileStyle = (width, height) => {




  return {
    width: (100 / width) + '%',
    height: (100 / height) + '%',
    backgroundColor: 'fffffaa',
    listStyleType: 'none',
  }
}

const tileMiddleStyle = (damage) => {

  let background

  switch (damage) {
    case 0:
      background = '#e8f5e9';
      break;
    case 1:
      background = '#c8e6c9'
      break;
    // case 1:
    //   background = '#a5d6a7'
    //   break;
    case 2:
      background = '#81c784'
      break;
    // case 2:
    //   background = '#66bb6a'
    //   break;
    case 3:
      background = '#4caf50'
      break;
    // case 3:
    //   background = '#43a047'
    //   break;
    case 4:
      background = '#388e3c'
      break;
    // case 4:
    //   background = '#2e7d32'
    //   break;
    // case 9:
    //   background = '#1b5e20'
    //   break;
    default:
      background = '#595959'
  }
  return {
    backgroundColor: background,
    width: '96%',
    height: '96%',
    margin: '2%',
  }
}




export const Tile = ({ characterId, buildingId, damage, setPlayerPositionX, setPlayerPositionY, changePosition, setModalContent }) => {

  const inputRef = useRef();
  const width = useSelector(widthSelector)
  const height = useSelector(heightSelector)


  useEffect(() => {
      changePosition(inputRef.current.offsetLeft, inputRef.current.offsetTop, characterId)


  }, [changePosition, characterId])


  useEffect(() => {
    if (characterId === 'player' && buildingId) {
      setModalContent(buildingId)
    } else if (characterId === 'player') {
      setModalContent()
    }
  }, [characterId, buildingId, setModalContent])

  useEffect(() => {

      changePosition(inputRef.current.offsetLeft, inputRef.current.offsetTop, buildingId)
  }, [buildingId, changePosition])

  useEffect(() => {
    if (characterId === 'player') {

      setPlayerPositionX(inputRef.current.offsetLeft);
      setPlayerPositionY(inputRef.current.offsetTop);
    }
  }, [characterId, setPlayerPositionX, setPlayerPositionY])


  return (
    <div className="component-tile" style={tileStyle(width, height)} ref={inputRef}>
      <div className="tile-center" style={tileMiddleStyle(damage)}>

      </div>
    </div>
  );

}
