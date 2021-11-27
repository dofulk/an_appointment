import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEntity } from "../../redux/actions/action";
import './Sprite.css'





export const Sprite = ({ entity, style, width, height }) => {
  const dispatch = useDispatch()
  const [opacity, setOpacity] = useState("1")

  useEffect(() => {
    if (entity.hp <= 0 && entity.id !== 'player') {
      setOpacity("0")
      dispatch(deleteEntity(entity, entity.position))
    } else if (entity.hp <= 0 && entity.id === 'player') {
      console.log('GAME OVER')
    }
  }, [dispatch, entity])


  return (
    <div className="sprite" style={style} opacity={opacity}>
      <div className="sprite_sprite">
        {entity.sprite}
      </div>
      <div className="sprite_attack">
      {entity.attack && <div className="sprite_attack_number">{entity.attack}</div>}

        {entity.type === 'character' && <div className="sprite_attack_symbol">👊</div>}

      </div>
      <div className="sprite_hp">
      {entity.hp && <div className="sprite_hp_number">{entity.hp}</div>}
        {entity.type === 'character' && <div className="sprite_hp_symbol">❤️</div>}
   
      </div>
    </div>
  );
}

