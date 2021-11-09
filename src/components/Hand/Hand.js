import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { handSelector, currentPhaseSelector, drawAmountSelector, discardSelector, drawSelector } from '../../redux/selectors/index'
import {  newCycle, drawOne } from '../../redux/actions/action'
import { getCardEffect } from "../../lib/cardEffects";
import { Card } from "../Card/Card";
import { CardList } from "../CardList/CardList"
import { motion, AnimatePresence } from "framer-motion";
import Modal from 'react-modal';


import './Hand.css'



export const Hand = () => {

    const dispatch = useDispatch()


    const hand = useSelector(handSelector)
    const discard = useSelector(discardSelector)
    const draw = useSelector(drawSelector)
    const currentPhase = useSelector(currentPhaseSelector)
    const drawAmount = useSelector(drawAmountSelector)

    const [modalContent, setModalContent] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [cardsPlayed, setCardsPlayed] = useState(0)
    const [beingPlayed, setBeingPlayed] = useState()


    useEffect(() => {
        setTimeout(() => {
            if (currentPhase === 'cards') {
                if (drawAmount > 0) {

                    dispatch(drawOne(1))

                }
            }
        }, 200)
    }, [drawAmount, currentPhase, dispatch])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentPhase === 'cards') {

                if (Array.isArray(hand) && (cardsPlayed < hand.length) && drawAmount <= 0) {
                    setCardsPlayed(cardsPlayed => cardsPlayed + 1)
                    setBeingPlayed(hand[cardsPlayed].id)
                    let cardEffect = getCardEffect(hand[cardsPlayed].cardTitle)
                    if (cardEffect) {
                        dispatch(getCardEffect(hand[cardsPlayed].cardTitle))
                    }
                    else return



                } else {
                    setBeingPlayed()
                    dispatch(newCycle())

                }
            }
        }, 500)

        return () => clearInterval(timeout);
    }, [drawAmount, cardsPlayed, currentPhase, hand, dispatch])

    useEffect(() => {
        setCardsPlayed(0)
    }, [currentPhase])

    const openCardList = (cards) => {
        setModalIsOpen(true)
        setModalContent(
            <div>
                <CardList listOfCards={cards}></CardList>
                <button onClick={() => setModalIsOpen(false)}>Exit</button>
            </div>)
    }


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

                        <Card title={card.cardTitle} isBig={false} description={card.description} id={card.id} beingPlayed={beingPlayed}></Card>
                    </motion.li>
                </AnimatePresence>)
        }
        return allCards
    })


    return (
        <div className="hand">
            <Modal
                isOpen={modalIsOpen}
            >
                {modalContent}
            </Modal>

            <div onClick={() => openCardList(draw)} className="draw">
                <h1>{draw.length}</h1>
            </div>
            <ul className="cards">{cards}</ul>
            <div onClick={() => openCardList(discard)} className="discard">
                <h1>{discard.length}</h1>
            </div>
        </div>
    );
}

