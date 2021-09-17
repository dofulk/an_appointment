import React from "react";

import { Sprite } from '../Sprite/Sprite';




export const Card = ({ id, color, title, description, onClick }) => {



  return (
    <div className="component-tile" style={{
      width: 100,
      height: 150,
      backgroundColor: "red",
      margin: 10
    }}
    onClick={onClick}>
      <Sprite entity={title}/>
      {description}
    </div>
  );

}