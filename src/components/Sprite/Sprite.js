import React from "react";
import './Sprite.css'



export const Sprite = ({ entity }) => {


  return (
    <div className="sprite">
      <h2 className="sprite_sprite">{entity.sprite}</h2>
      <div className="sprite_info">
        <h2 className="sprite_info--attack">{entity.attack}</h2>
        <h2 className="sprite_info--hp">{entity.hp}</h2>
      </div>
    </div>
  );
}

