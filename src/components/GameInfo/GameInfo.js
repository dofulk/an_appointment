import React, { useEffect, useState } from "react";
import './GameInfo.css'



export const GameInfo = ({ player, moves, gold }) => {

    const [movesAnimation, setMovesAnimation] = useState(0)
    const [hpAnimation, setHPAnimation] = useState(0)
    const [attackAnimation, setAttackAnimation] = useState(0)
    const [goldAnimation, setGoldAnimation] = useState(0)
    useEffect(() => {
        setMovesAnimation(1)
        let timer = setTimeout(() => {
            setMovesAnimation(0)
        }, 250);

        return () => {
            clearTimeout(timer)
        }
    }, [moves])


    useEffect(() => {
        setHPAnimation(1)
        let timer = setTimeout(() => {
            setHPAnimation(0)
        }, 250);

        return () => {
            clearTimeout(timer)
        }

    }, [player.hp])
    useEffect(() => {
        setAttackAnimation(1)
        let timer = setTimeout(() => {
            setAttackAnimation(0)
        }, 250);

        return () => {
            clearTimeout(timer)
        }

    }, [player.attack])

    useEffect(() => {
        setGoldAnimation(1)
        let timer = setTimeout(() => {
            setGoldAnimation(0)
        }, 250);

        return () => {
            clearTimeout(timer)
        }

    }, [gold])

    return (
        <div className="game-info">
            <div 
            className="moves"
            movesanimation={movesAnimation}>
                <h1

                    
                >Moves: {moves}</h1>
            </div>

            <div 
            className="hp"
            hpanimation={hpAnimation}>
            <h1
            >HP: {player.hp}/{player.maxHP}</h1>
            </div>
            <div 
            className="attack"
            attackanimation={attackAnimation}>
            <h1
            >Attack: {player.attack}</h1>
            </div>
            <div 
            className="gold"
            goldanimation={goldAnimation}>

            <h1
            >$: {gold}</h1>
            </div>

        </div>
    );
}

