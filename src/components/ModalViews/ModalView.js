import React from "react";
import { CardPicker } from "./CardPicker/CardPicker";
import { Exit } from "./Exit/Exit";
import Modal from 'react-modal';
import { Shop } from "./Shop/Shop";
import { Arcade } from "./Arcade/Arcade";





export const ModalView = ({ setModalIsOpen, modalIsOpen, building, setModalContent }) => {


    const content = (building) => {
        switch (building.buildingType) {
            case 'Chest':
                return (
                    <CardPicker
                        setModalIsOpen={setModalIsOpen}
                        listOfCards={building.content} 
                        building={building}/>
                )

            case 'Exit':
                return (
                    <Exit
                        setModalIsOpen={setModalIsOpen}
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
                    <Arcade setModalIsOpen={setModalIsOpen}/>
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
        <div className="component-Player">
            <Modal isOpen={modalIsOpen}
                ariaHideApp={false}>
                {view(building)}
            </Modal>
        </div>
    );
}