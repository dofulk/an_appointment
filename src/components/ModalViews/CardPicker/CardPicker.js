import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../Card/Card";
import { addCardFromPicker } from "../../../redux/actions/action";
import { generateCard } from "../../../lib/cardEffects";





export const CardPicker = ({ setModalIsOpen, listOfCards, building }) => {

  const dispatch = useDispatch()

  const addCard = (building,card) => {
    console.log(generateCard(card))
    dispatch(addCardFromPicker(building, generateCard(card.title)))
    setModalIsOpen(false)
  }

  let cards = listOfCards.map((card) => 
    <li key={card.id}>
      <Card id={card.id} title={card.title} description={card.description} onClick={() => addCard(building, card)}></Card>
    </li>
  )
  return (
    <div className="component-Player">
      {cards}
      <button onClick={() => setModalIsOpen(false)}>EXIT</button>
    </div>
  );
}
