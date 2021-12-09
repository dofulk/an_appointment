import React, { useEffect, useState } from "react";

import './App.css';
import { Main } from "./components/Main/Main";
import { Menu } from "./components/Menu/Menu";


const App = () => {

  const [menuOpen, setMenuOpen] = useState(false)


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
      <Menu ></Menu>
      </div>
}
      <Main menuOpen={menuOpen}/>
    </div>
  );
}

export default App;
