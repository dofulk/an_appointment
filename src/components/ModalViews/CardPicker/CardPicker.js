import React from "react";
import { useDispatch} from "react-redux";
import { Card } from "../../Card/Card";
import { addCardFromPicker } from "../../../redux/actions/action";
import './CardPicker.css'
import { Button } from "../../Button/Button";




export const CardPicker = ({ listOfCards, building }) => {

  const dispatch = useDispatch()

  const addCard = (building,card) => {
    dispatch(addCardFromPicker(building, card))
  }



  let cards = listOfCards.map((card) => 
    <li key={card.title} style={{
      listStyle: "none",
    }}>
      <Card id={card.id} title={card.title} description={card.description} onClick={() => addCard(building, card)} isBig={true}></Card>
    </li>
  )
  return (
    <div className="cardpicker">
      <div className="cardpicker_title">PICK ONE</div>
      <ul style={{
        display: "flex",
        flexDirection: "row"
      }}>
      {cards}
      </ul>
    </div>
  );
}
