import React from "react";
import { CardPicker } from "./CardPicker/CardPicker";
import { Exit } from "./Exit/Exit";
import Modal from 'react-modal';
import { Shop } from "./Shop/Shop";
import { Arcade } from "./Arcade/Arcade";

import './ModalView.css'
import { Key } from "./Key/Key";
import { Medic } from "./Medic/Medic";
import { GoldPile } from "./GoldPile/GoldPile";





export const ModalView = ({ setModalIsOpen, building }) => {


    const content = (building) => {
        switch (building.buildingType) {
            case 'Chest':
                return (
                    <CardPicker
                        setModalIsOpen={setModalIsOpen}
                        listOfCards={building.content}
                        building={building} />
                )

            case 'Exit':
                return (
                    <Exit
                        setModalIsOpen={setModalIsOpen}
                        building={building}
                    // player={player}
                    // level={game.level}
                    ></Exit>

                )
            case 'Shop':
                return (
                    <Shop setModalIsOpen={setModalIsOpen}
                        shopItems={building.content}
                        building={building}></Shop>
                )
            case 'Arcade':
                return (
                    <Arcade setModalIsOpen={setModalIsOpen} />
                )
            case 'Key':
                return <Key setModalIsOpen={setModalIsOpen} building={building} />
            case 'Medic':
                return <Medic setModalIsOpen={setModalIsOpen}></Medic>
            case 'GoldPile':
                return <GoldPile setModalIsOpen={setModalIsOpen} building={building}></GoldPile>

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