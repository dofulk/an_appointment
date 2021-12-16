import React, { useEffect } from "react";
import { CardPicker } from "./CardPicker/CardPicker";
import { Exit } from "./Exit/Exit";
import { Shop } from "./Shop/Shop";
import { Arcade } from "./Arcade/Arcade";

import './ModalView.css'
import { Key } from "./Key/Key";
import { Medic } from "./Medic/Medic";
import { GoldPile } from "./GoldPile/GoldPile";
import { Button } from "../Button/Button";




export const ModalView = ({ setModalContent, building }) => {


    const content = (building) => {
        switch (building.buildingType) {
            case 'Chest':
                return (
                    <div className="modalview-container">
                        <div onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }}>X</div>                        <CardPicker
                            setModalContent={setModalContent}
                            listOfCards={building.content}
                            building={building} />
                    </div>
                )

            case 'Exit':
                return (
                    <div className="modalview-container">
                        <div onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }}>X</div>                        <Exit
                            setModalContent={setModalContent}
                            building={building}
                        ></Exit>
                    </div>

                )
            case 'Shop':
                return (
                    <div className="modalview-container">
                        <div onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }}>X</div>      
                        <Shop setModalContent={setModalContent}
                            shopItems={building.content}
                            building={building}></Shop>
                    </div>
                )
            case 'Arcade':
                return (
                    <div className="modalview-container">
                        <div onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }}>X</div>                        <Arcade setModalContent={setModalContent} />
                    </div>
                )
            case 'Key':
                return (
                    <div className="modalview-container">
                        <div onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }}>X</div>                        <Key setModalContent={setModalContent} building={building} />
                    </div>
                )

            case 'Medic':
                return (
                    <div className="modalview-container">
                        <Button onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }} text="X"></Button>                        <Medic setModalContent={setModalContent}></Medic>
                    </div>
                )
            case 'GoldPile':
                return (
                    <div className="modalview-container">
                        <div onClick={() => setModalContent()} style={{
                            padding: "10px",
                            left: "10px",
                            position: "absolute"
                        }}>X</div>
                        <GoldPile setModalContent={setModalContent} building={building}></GoldPile>
                    </div>
                )

            default:
                return
        }

    }

    const view = (building) => {
        if (building) {
            return content(building)
        } else {
            return
        }
    }
    return (
        <div className="modalview">


            {view(building)}
        </div>
    );
}