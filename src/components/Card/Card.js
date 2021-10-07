
import React, { useEffect, useState } from "react";

import { Sprite } from '../Sprite/Sprite';
import './Card.css'



export const Card = ({ id, color, title, description, onClick, isBig, beingPlayed }) => {

  const [isPlaying, setIsPlaying] = useState(0)

  useEffect(()=> {
    if (beingPlayed === id) {
      console.log('being played')
      setIsPlaying(1)
    } else {
      setIsPlaying(0)
    }
  }, [beingPlayed])

  
  let subhead = () => {
    if (isBig) {
      return <div className="description">
        {description}
      </div>
    }
  }

  return (
    <div className="card"
    isplaying={isPlaying}
      onClick={onClick}>

      <h2>{title}</h2>
      {subhead()}
    </div>
  );

}

