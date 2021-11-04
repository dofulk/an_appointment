import React from "react";
import './Sprite.css'



export const Sprite = ({ entity }) => {


  return (
    <div className="sprite">
      <div className="sprite_sprite">
        <text>{entity.sprite}</text>
      </div>

      <div className="sprite_attack">{entity.attack}</div>
      <div className="sprite_hp">{entity.hp}</div>
    </div>
  );
}

