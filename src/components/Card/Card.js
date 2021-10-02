import React from "react";

import { Sprite } from '../Sprite/Sprite';
import './Card.css'



export const Card = ({ id, color, title, description, onClick, isBig }) => {

  let subhead = () => {
    if (isBig) {
      return <div className="description">
        {description}
      </div>
    }
  }

  return (
    <div className="card"
      onClick={onClick}>

      <h2>{title}</h2>
      {subhead()}
    </div>
  );

}

