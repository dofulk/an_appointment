import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCard } from "../../../redux/actions/action";
import { goldSelector } from "../../../redux/selectors";
import { Card } from "../../Card/Card";
import './Shop.css'



export const Shop = ({ setModalIsOpen, shopItems, building }) => {

    const dispatch = useDispatch()

    const gold = useSelector(goldSelector)

    const purchase = (building, item) => {
        if (gold >= item.price) {
        dispatch(buyCard(building, item))
        } else {
            return
        }
      }
    

    let items = shopItems.map((item) => 
        <li key={item.id} style={{
            listStyle: "none",
        }}>
            <Card id={item.content.id} title={item.content.title} description={item.content.description} onClick={() => purchase(building, item)} isBig={true}></Card>
            {item.price}
        </li>
    )
    return (
        <div className="component-Player" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <ul className="cards">
                {items}
            </ul>
            <button onClick={() => setModalIsOpen(false)}>EXIT</button>
        </div>
    );
}
