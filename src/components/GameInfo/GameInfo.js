import React, { useEffect, useState } from "react";
import './GameInfo.css'



export const GameInfo = ({ player, moves, gold }) => {

    const [movesAnimation, setMovesAnimation] = useState(0)
    const [hpAnimation, setHpAnimation] = useState(0)
    const [attackAnimation, setAttackAnimation] = useState(0)
    const [goldAnimation, setGoldAnimation] = useState(0)
    useEffect(() => {
        if (movesAnimation === 1) {
            return
        } else {
            setMovesAnimation(1)
        }

    }, [moves])


    useEffect(() => {
        if (hpAnimation === 1) {
            return
        } else {
            setHpAnimation(1)
        }

    }, [player.hp])
    useEffect(() => {
        if (attackAnimation === 1) {
            return
        } else {
            setAttackAnimation(1)
        }

    }, [player.attack])

    useEffect(() => {
        if (goldAnimation === 1) {
            return
        } else {
            setGoldAnimation(1)
        }

    }, [gold])

    return (
        <div className="game-info">
            <h1
                className="moves"
                movesanimation={movesAnimation}
                onAnimationEnd={() => setMovesAnimation(0)}
            >Moves: {moves}/{player.baseMoves}</h1>

            <h1
                className="hp"
                hpanimation={hpAnimation}
                onAnimationEnd={() => setHpAnimation(0)}
            >HP: {player.hp}/{player.maxHP}</h1>
            <h1
                className="attack"
                attackanimation={attackAnimation}
                onAnimationEnd={() => setAttackAnimation(0)}
            >Attack: {player.attack}/{player.baseAttack}</h1>
            <h1
                className="gold"
                goldanimation={goldAnimation}
                onAnimationEnd={() => setGoldAnimation(0)}
            >Coin: {gold}</h1>

        </div>
    );
}

