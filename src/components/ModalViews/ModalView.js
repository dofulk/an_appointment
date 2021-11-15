import React, { useEffect } from "react";
import { CardPicker } from "./CardPicker/CardPicker";
import { Exit } from "./Exit/Exit";
import { Shop } from "./Shop/Shop";
import { Arcade } from "./Arcade/Arcade";

import './ModalView.css'
import { Key } from "./Key/Key";
import { Medic } from "./Medic/Medic";
import { GoldPile } from "./GoldPile/GoldPile";





export const ModalView = ({ setModalIsOpen, building }) => {

    const handleKeydown = (e) => {
        switch (e.key) {
            case 'Escape':
                setModalIsOpen(false)
                break;
            default:
                break;

        };
    }

    useEffect(() => {


        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        }

    });

    const content = (building) => {
        switch (building.buildingType) {
            case 'Chest':
                return (
                    <div className="modalview-container">
                        <CardPicker
                            setModalIsOpen={setModalIsOpen}
                            listOfCards={building.content}
                            building={building} />
                            </div>
                        )

                        case 'Exit':
                        return (
                        <div className="modalview-container">
                        <Exit
                            setModalIsOpen={setModalIsOpen}
                            building={building}
                        // player={player}
                        // level={game.level}
                        ></Exit>
                    </div>

                )
            case 'Shop':
                return (
                    <div className="modalview-container">
                        <Shop setModalIsOpen={setModalIsOpen}
                            shopItems={building.content}
                            building={building}></Shop>
                    </div>
                )
            case 'Arcade':
                return (
                    <div className="modalview-container">
                        <Arcade setModalIsOpen={setModalIsOpen} />
                    </div>
                )
            case 'Key':
                return (
                    <div className="modalview-container">
                        <Key setModalIsOpen={setModalIsOpen} building={building} />
                    </div>
                )

            case 'Medic':
                return (
                    <div className="modalview-container">
                        <Medic setModalIsOpen={setModalIsOpen}></Medic>
                    </div>
                )
            case 'GoldPile':
                return (
                    <div className="modalview-container">
                        <GoldPile setModalIsOpen={setModalIsOpen} building={building}></GoldPile>
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