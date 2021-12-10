import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './App.css';
import { Button } from "./components/Button/Button";
import { Main } from "./components/Main/Main";
import { Menu } from "./components/Menu/Menu";
import { newGame } from "./redux/actions/action";
import { levelSelector, playerSelector } from "./redux/selectors";


const App = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const player = useSelector(playerSelector)
  const level = useSelector(levelSelector)

  const dispatch = useDispatch()

  const handleKeydown = (e) => {
    switch (e.key) {
      case 'Escape':
        setMenuOpen(!menuOpen)
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


  return (
    <div className="App">
      {menuOpen && 
      <div className="app_menu">
      <Menu setMenuOpen={setMenuOpen}></Menu>
      </div>
}
     {player.hp <= 0 &&
  <div className="app_gameover">
    GAME OVER. You made it to floor {level}
    <Button text="play again" onClick={() => dispatch(newGame())}/>
    </div>
     }

      <Main menuOpen={menuOpen}/>
    </div>
  );
}

export default App;
