import React, {useEffect} from "react";
import { Sprite } from '../Sprite/Sprite';
import { useDispatch } from 'react-redux' 
import { entitiesIdSelector } from "../../redux/selectors";
import { deleteEntity } from "../../redux/actions/action";






const tileStyle = (color, damage) => {


  let background
  // switch (color) {
  //   case 'light':
  //     switch (damage) {
  //       case 0:
  //         background = '#ffcdd2';
  //         break;
  //       case 1:
  //         background = '#ef9a9a'
  //         break;
  //       default:
  //         background = '#e57373'
  //     }
  //     background = '#ffcdd2';
  //     break;
  //   case 'dark':
  //     background = '#f5f5f5';
  //     break;
  //   case 'wall':
  //     background = 'black'
  //     break;
  //   default:
  //     background = 'red';
  //     break;
  // }
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
    case 4:
      background = '#4caf50'
      break;
    case 5:
      background = '#43a047'
      break;
    case 6:
      background = '#388e3c'
      break;
    case 7:
      background = '#2e7d32'
      break;
    case 8:
      background = '#1b5e20'
      break;
    default:
      background = 'black'
  }
  return {
    border: '1px solid black',
    width: '48px',
    height: '48px',
    backgroundColor: background,
  }
}



export const Tile = ({ id, color, character, building, damage }) => {


  const dispatch = useDispatch()


  

  useEffect(() => {
    if (character && character.hp <= 0 && character.id !== 'player') {
      console.log('Im MELLLLLLLLTTTTTTTTTTINGGGGGGGG')
      dispatch(deleteEntity(character, id))
    } else if (character && character.hp <= 0 && character.id == 'player') {
      console.log('Game OVERERER')
    }

  })

  let sprite = (character, building) => {

    if (character) {
      return <Sprite entity={character.sprite} />
    } else if (building) {
      return <Sprite entity={building.sprite}/>
    }
  }

  return (
    <div className="component-tile" style={tileStyle(color, damage)}>
      {sprite(character, building)}
    </div>
  );

}
