
import React, { useEffect, useState } from "react";

import { Sprite } from '../Sprite/Sprite';
import './Card.css'



export const Card = ({ id, color, title, description, onClick, beingPlayed }) => {

  const [isPlaying, setIsPlaying] = useState(0)

  useEffect(()=> {
    if (beingPlayed === id) {
      setIsPlaying(1)
    } else {
      setIsPlaying(0)
    }
  }, [beingPlayed, id])

  

  return (
    <div className="card"
    isplaying={isPlaying}
      onClick={onClick}>

      <h2>{title}</h2>
      <div className="description">
        {description}
      </div>
    </div>
  );

}

