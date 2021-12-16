
import React, { useEffect, useState, useRef } from "react";
import { Button } from '../Button/Button'


import './Card.css'



export const Card = ({ id, color, title, description, onClick, beingPlayed, isLarge = "false", buttonText, onButtonClick, blank = false }) => {

  const [isPlaying, setIsPlaying] = useState(0)
  const [upgradeAnimation, setUpgradeAnimation] = useState(0)
  const [opacity, setOpacity] = useState(0)
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
      setOpacity(1)
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

  useEffect(() => {
    return () => {
      setOpacity(0)
    }
  }, [])



  return (
    <div className="card_container" islarge={isLarge}>
      <div className="card"
        isplaying={isPlaying}
        onClick={onClick}
        upgradeanimation={upgradeAnimation}
        islarge={blank ? "false" : isLarge}
        opacity={opacity}
        blank={blank.toString()}
      >


        <h2>{title}</h2>
        <div className="description">
          {description}
        </div>

      </div>
      {(buttonText && !blank && isLarge === "true") && <Button text={buttonText} onClick={onButtonClick}></Button>}
    </div>
  );

}

