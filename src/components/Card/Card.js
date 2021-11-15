
import React, { useEffect, useState, useRef } from "react";

import { Sprite } from '../Sprite/Sprite';
import './Card.css'



export const Card = ({ id, color, title, description, onClick, beingPlayed }) => {

  const [isPlaying, setIsPlaying] = useState(0)
  const [upgradeAnimation, setUpgradeAnimation] = useState(0)
  const firstRender = useRef(true);

  useEffect(() => {
    if (beingPlayed === id) {
      setIsPlaying(1)
    } else {
      setIsPlaying(0)
    }
  }, [beingPlayed, id])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      setUpgradeAnimation(1)
      let timer = setTimeout(() => {
        setUpgradeAnimation(0)
      }, 250);

      return () => {
        clearTimeout(timer)
      }
    }
  }, [description])



  return (
    <div className="card"
      isplaying={isPlaying}
      onClick={onClick}
      upgradeAnimation={upgradeAnimation}
    >


      <h2>{title}</h2>
      <div className="description">
        {description}
      </div>
    </div>
  );

}

