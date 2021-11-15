import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../Card/Card";
import { addCardFromPicker } from "../../../redux/actions/action";






export const CardPicker = ({ setModalIsOpen, listOfCards, building }) => {

  const dispatch = useDispatch()

  const addCard = (building,card) => {
    dispatch(addCardFromPicker(building, card))
    setModalIsOpen(false)
  }



  let cards = listOfCards.map((card) => 
    <li key={card.title} style={{
      listStyle: "none",
    }}>
      <Card id={card.id} title={card.title} description={card.description} onClick={() => addCard(building, card)} isBig={true}></Card>
    </li>
  )
  return (
    <div className="component-Player" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <ul style={{
        display: "flex",
        flexDirection: "row"
      }}>
      {cards}
      </ul>
      <button onClick={() => setModalIsOpen(false)}>EXIT</button>
    </div>
  );
}
