import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { handSelector, currentPhaseSelector, drawAmountSelector } from '../../redux/selectors/index'
import { draw, changeDrawAmount, newCycle, drawOne } from '../../redux/actions/action'
import { getCardEffect } from "../../lib/cardEffects";
import { Card } from "../Card/Card";
import { motion, AnimatePresence } from "framer-motion";






export const Hand = () => {

    const dispatch = useDispatch()


    const hand = useSelector(handSelector)
    const currentPhase = useSelector(currentPhaseSelector)
    const drawAmount = useSelector(drawAmountSelector)
    const [cardsPlayed, setCardsPlayed] = useState(0)
    const [beingPlayed, setBeingPlayed] = useState()


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentPhase === 'cards') {
                if (drawAmount > 0) {

                    dispatch(drawOne(1))

                }
            }
        }, 200)
    }, [drawAmount, currentPhase])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentPhase === 'cards') {

                if (Array.isArray(hand) && (cardsPlayed < hand.length) && drawAmount <= 0) {
                    setCardsPlayed(cardsPlayed => cardsPlayed + 1)
                    setBeingPlayed(hand[cardsPlayed].id)
                    dispatch(getCardEffect(hand[cardsPlayed].cardTitle))



                } else {
                    setBeingPlayed()
                    dispatch(newCycle())

                }
            }
        }, 500)

        return () => clearInterval(timeout);
    }, [drawAmount, cardsPlayed, currentPhase])

    useEffect(() => {
        setCardsPlayed(0)
    }, [currentPhase])

    let cards = hand.map((card) => {
        let allCards = []
        if (card) {
            allCards.push(
                <AnimatePresence>
                    <motion.li
                        key={card.id}
                        style={{
                            listStyle: "none"
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >

                        <Card title={card.cardTitle} isBig={false} id={card.id} beingPlayed={beingPlayed}></Card>
                    </motion.li>
                </AnimatePresence>)
        }
        return allCards
    })


    return (
        <div className="component-Player">
            <ul>{cards}</ul>
            <h1>{currentPhase}</h1>
            <h1>{drawAmount}</h1>
        </div>
    );
}

