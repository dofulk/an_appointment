import React from "react";
import './Sprite.css'





export const Sprite = ({ entity, style, width, height }) => {


  return (
    <div className="sprite" style={style}>
      <div className="sprite_sprite">
        {entity.sprite}
      </div>
      {entity.attack && <div className="sprite_attack">{entity.attack}</div>}
      {entity.hp && <div className="sprite_hp">{entity.hp}</div>}
    </div>
  );
}

