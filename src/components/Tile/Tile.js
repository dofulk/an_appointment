import React, { useEffect, useRef } from "react";
import './Tile.css'

const tileStyle = () => {



  
  return {
    width: (100 / 20) + '%',
    height: (100 / 7) + '%',
    backgroundColor: 'fffffaa',
    listStyleType: 'none',
  }
}

const tileMiddleStyle =(damage) =>  {

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




export const Tile = ({ character, building, damage, setPlayerPositionX, setPlayerPositionY, changePosition }) => {

  const inputRef = useRef();


  useEffect(() => {
    if (!character) {

    } else {
      changePosition(inputRef.current.offsetLeft, inputRef.current.offsetTop, character.id)
    }
  }, [changePosition, character])



  useEffect(() => {
    if (!building) {

    } else {
      changePosition(inputRef.current.offsetLeft, inputRef.current.offsetTop, building.id)
    }
  }, [building, changePosition])

  useEffect(() => {
    if (!character) {

    } else if (character.id === 'player') {

      setPlayerPositionX(inputRef.current.offsetLeft);
      setPlayerPositionY(inputRef.current.offsetTop);
    }
  }, [character, setPlayerPositionX, setPlayerPositionY])


  return (
    <div className="component-tile" style={tileStyle()} ref={inputRef}>
      <div className="tile-center" style={tileMiddleStyle(damage)}>

      </div>
    </div>
  );

}
