import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../Card/Card";




export const Shop = ({ setModalIsOpen, shopItems }) => {

    const dispatch = useDispatch()

    let items = shopItems.map((item) => 
        <li key={item.id} style={{
            listStyle: "none",
        }}>
            <Card id={item.content.id} title={item.content.title} description={item.content.description} onClick={() => console.log(item)} isBig={true}></Card>
            {item.price}
        </li>
    )
    return (
        <div className="component-Player">
            <ul>
                {items}
            </ul>
            <button onClick={() => setModalIsOpen(false)}>EXIT</button>
        </div>
    );
}
