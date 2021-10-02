import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { handSelector, currentPhaseSelector, drawAmountSelector } from '../../redux/selectors/index'
import { draw, changeDrawAmount, newCycle, drawOne } from '../../redux/actions/action'
import { getCardEffect } from "../../lib/cardEffects";
import { Card } from "../Card/Card";
import { motion } from "framer-motion";
import { batch } from "react-redux";






export const Hand = () => {

    const dispatch = useDispatch()


    const hand = useSelector(handSelector)
    const currentPhase = useSelector(currentPhaseSelector)
    const drawAmount = useSelector(drawAmountSelector)
    const [cardsPlayed, setCardsPlayed] = useState(0)


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentPhase === 'cards') {
                if (drawAmount > 0) {

                    dispatch(drawOne(1))

                } else if (Array.isArray(hand) && (cardsPlayed < hand.length) && drawAmount <= 0) {
                    setCardsPlayed(cardsPlayed => cardsPlayed + 1)
                    dispatch(getCardEffect(hand[cardsPlayed].cardTitle))



                } else {
                    dispatch(newCycle())

                }
            }
        }, 250)

        return () => clearInterval(timeout);
    }, [drawAmount, cardsPlayed, currentPhase])


    let cards = hand.map((card) => {
        let allCards = []
        if (card) {
            allCards.push(<li key={card.id} style={{
                listStyle: "none"
            }}>

                <Card title={card.cardTitle} isBig={false}></Card>
            </li>)
        }
        return allCards
    })


    return (
        <div className="component-Player">
            <ul>{cards}</ul>
            <h1>{currentPhase}</h1>
        </div>
    );
}

