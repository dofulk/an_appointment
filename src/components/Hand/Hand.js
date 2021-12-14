import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { handSelector, currentPhaseSelector, drawAmountSelector, discardSelector, drawSelector, upgradeQueueSelector } from '../../redux/selectors/index'
import { newCycle, drawOne, upgradeCard, removeCard, upgradeCards } from '../../redux/actions/action'
import { Card } from "../Card/Card";
import { CardList } from "../CardList/CardList"
import Modal from 'react-modal';


import './Hand.css'



export const Hand = () => {

    const dispatch = useDispatch()


    const hand = useSelector(handSelector)
    const discard = useSelector(discardSelector)
    const draw = useSelector(drawSelector)
    const currentPhase = useSelector(currentPhaseSelector)
    const drawAmount = useSelector(drawAmountSelector)
    const upgradeQueue = useSelector(upgradeQueueSelector)

    const [cardsPlayed, setCardsPlayed] = useState(0)
    const [beingPlayed, setBeingPlayed] = useState()
    const [selected, setSelected] = useState()
    const [buttonText, setButtonText] = useState()
    const [onButtonClick, setOnButtonClick] = useState()
    const [isSelecting, setIsSelecting] = useState(false)


    const setCardSelected = (id) => {
        if (selected === id) {
            setSelected()
        } else {
            setSelected(id)
        }
    }



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
                    dispatch(hand[cardsPlayed].effect)



                } else {
                    setBeingPlayed()
                    dispatch(newCycle())

                }
            }
        }, 500)

        return () => clearInterval(timeout);
    }, [drawAmount, cardsPlayed, currentPhase, hand, dispatch])




    useEffect(() => {
        if (!upgradeQueue.length) {

        } else if ( upgradeQueue[0].method === 'random') {
            let validCards = hand.filter(card => card.params[upgradeQueue[0].type])
            if (!validCards.length) {
                return
            } else {
                let cardToUpgrade = validCards[Math.floor(Math.random() * validCards.length)];
                dispatch(upgradeCard(cardToUpgrade.id, upgradeQueue[0]))
            }
        } else  if ( upgradeQueue[0].method === 'id') {
            console.log(upgradeQueue)
            let card = hand.filter(card => card.id === upgradeQueue[0].id)[0]
            dispatch(upgradeCard(card.id, upgradeQueue[0]))
        } else if ( upgradeQueue[0].method === 'choose') {
            setButtonText('Upgrade')
            setIsSelecting(true)
            setOnButtonClick(() => (id) => {
                setIsSelecting(false)
                setButtonText()
                setOnButtonClick()
                dispatch(upgradeCard(id, upgradeQueue[0]))
            })
        } else if (upgradeQueue[0].method === 'remove') {
            setButtonText('Remove')
            setIsSelecting(true)
            setOnButtonClick(() => (id) => {
                setIsSelecting(false)
                setButtonText()
                setOnButtonClick()
                dispatch(removeCard(id))
            })
        } else if (upgradeQueue[0].method === 'all') {
         
            let validCards = hand.filter(card => card.params[upgradeQueue[0].type])
            if (!validCards.length) {
                return
            } else {
                dispatch(upgradeCards(validCards, upgradeQueue[0]))
            }
        }
    }, [dispatch, hand, upgradeQueue])



    useEffect(() => {
        setCardsPlayed(0)
    }, [currentPhase])


    let cards = hand.map((card) => {
        let allCards = []
        if (card) {
            allCards.push(
                <li
                    className="hand_list"
                    key={card.id}
                    style={{
                        listStyle: "none"
                    }}
                >

                    <Card title={card.title} isLarge={(card.id === selected).toString()} onClick={() => setCardSelected(card.id)} description={card.description} id={card.id} beingPlayed={beingPlayed} buttonText={buttonText} onButtonClick={() => onButtonClick(card.id)}></Card>
                </li>)
        }
        return allCards
    })


    return (
        <div className="hand" selecting={isSelecting.toString()}>


            <div className="draw">
                <h1>{draw.length}</h1>
            </div>
            <ul className="cards">{cards}</ul>
            <div className="discard">
                <h1>{discard.length}</h1>
            </div>
        </div>
    );
}

