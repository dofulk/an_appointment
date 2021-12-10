import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeControl } from "../../redux/actions/action";
import { controlsSelector } from "../../redux/selectors";
import { Button } from "../Button/Button";
import { ControlsInput } from "../ControlsInput/ControlsInput";
import './Menu.css'


export const Menu = ({ setMenuOpen }) => {
    const controls = useSelector(controlsSelector)
    const [subMenu, setSubMenu] = useState("Main")

    const dispatch = useDispatch()

    return (
        <div className="menu">
            {subMenu === "Main" &&
                <div className="menu_main">
                    <Button className="menu_main_options" text="Controls" onClick={() => setSubMenu("Controls")}></Button>

                    <Button className="menu_main_options" text="Exit" onClick={() => setMenuOpen(false)}></Button>
                </div>
            }
            {subMenu === "Controls" &&
                <div className="menu_controls">
                    End Turn: <ControlsInput onKeyDown={(e) => dispatch(changeControl('endTurn', 'main', e.key))} value={controls.endTurn.main}></ControlsInput> or <ControlsInput onKeyDown={(e) => dispatch(changeControl('endTurn', 'alt', e.key))}value={controls.endTurn.alt}></ControlsInput>
                    Exit Building: <ControlsInput onKeyDown={(e) => dispatch(changeControl('exitBuilding', 'main', e.key))} value={controls.exitBuilding.main}></ControlsInput> or <ControlsInput onKeyDown={(e) => dispatch(changeControl('exitBuilding', 'alt', e.key))}value={controls.exitBuilding.alt}></ControlsInput>
                    Move Up: <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveUp', 'main', e.key))}value={controls.moveUp.main}></ControlsInput> or <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveUp', 'alt', e.key))} value={controls.moveUp.alt}></ControlsInput>
                    Move Right: <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveRight', 'main', e.key))}value={controls.moveRight.main}></ControlsInput> or <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveRight', 'alt', e.key))} value={controls.moveRight.alt}></ControlsInput>
                    Move Down: <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveDown', 'main', e.key))} value={controls.moveDown.main}></ControlsInput> or <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveDown', 'alt', e.key))} value={controls.moveDown.alt}></ControlsInput>
                    Move Left: <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveLeft', 'main', e.key))} value={controls.moveLeft.main}></ControlsInput> or <ControlsInput onKeyDown={(e) => dispatch(changeControl('moveLeft', 'alt', e.key))} value={controls.moveLeft.alt}></ControlsInput>

                    <Button className="menu_controls_back" onClick={() => setSubMenu("Main")} text="Back"></Button>
                </div>}
        </div>
    );
}
