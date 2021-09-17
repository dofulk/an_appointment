import React from "react";

import './App.css';
import { Main } from "./components/Main/Main";
import { CardPicker } from "./components/CardPicker/CardPicker";
import { Card } from "./components/Card/Card";

class App extends React.Component {



  render() {

    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
