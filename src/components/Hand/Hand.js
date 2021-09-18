import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { handSelector, currentPhaseSelector, drawAmountSelector, playedCardsSelector } from '../../redux/selectors/index'
import { draw, changeDrawAmount, playCard, newCycle } from '../../redux/actions/action'
import { getCardEffect } from "../../lib/cardEffects";






export const Hand = () => {

    const dispatch = useDispatch()

    const playedCards = useSelector(playedCardsSelector)
    const hand = useSelector(handSelector)
    const currentPhase = useSelector(currentPhaseSelector)
    const drawAmount = useSelector(drawAmountSelector)

    useEffect(() => {
        if (currentPhase === 'cards') {
            if (Array.isArray(hand) && hand.length) {

                dispatch(getCardEffect(hand[0].cardTitle))
                dispatch(playCard(hand[0].id))


            } else if (drawAmount > 0) {
                dispatch(draw(1))
                dispatch(changeDrawAmount(-1))

            } else {

                dispatch(newCycle())
            }
        }
    })


    let cards = playedCards.map((card) => {
        let allCards = []
        if (card) {
            allCards.push(<li key={card.id}>{card.cardTitle}</li>)
        }
        return allCards
    })


    return (
        <div className="component-Player">
            <ul>{cards}</ul>
            <h1>{drawAmount}</h1>
        </div>
    );
}

