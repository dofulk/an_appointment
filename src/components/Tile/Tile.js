import React, { useEffect, useRef } from "react";
import { Sprite } from '../Sprite/Sprite';

const tileStyle = (damage) => {



  let background

  switch (damage) {
    case 0:
      background = '#e8f5e9';
      break;
    case 1:
      background = '#c8e6c9'
      break;
    case 2:
      background = '#a5d6a7'
      break;
    case 3:
      background = '#81c784'
      break;
    case 4:
      background = '#66bb6a'
      break;
    case 5:
      background = '#4caf50'
      break;
    case 6:
      background = '#43a047'
      break;
    case 7:
      background = '#388e3c'
      break;
    case 8:
      background = '#2e7d32'
      break;
    case 9:
      background = '#1b5e20'
      break;
    default:
      background = 'black'
  }
  return {
    width: (100 / 20) + '%',
    height: (100 / 7) + '%',
    backgroundColor: background,
    listStyleType: 'none',
    borderRadius: 3,
  }
}



export const Tile = ({ character, building, damage, setPlayerPositionX, setPlayerPositionY, changePosition }) => {

  const inputRef = useRef();


  useEffect(() => {
    if (!character) {

    } else {
      changePosition(inputRef.current.offsetLeft, inputRef.current.offsetTop, character.id)
    }
  }, [character])


  useEffect(() => {
    if (!building) {

    } else {
      changePosition(inputRef.current.offsetLeft, inputRef.current.offsetTop, building.id)
    }
  }, [building])

  useEffect(() => {
    if (!character) {

    } else if (character.id === 'player') {

      setPlayerPositionX(inputRef.current.offsetLeft);
      setPlayerPositionY(inputRef.current.offsetTop);
    }
  }, [character, setPlayerPositionX, setPlayerPositionY])


  return (
    <div className="component-tile" style={tileStyle(damage)} ref={inputRef}>
    </div>
  );

}
