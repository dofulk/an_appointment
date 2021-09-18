import React, { useEffect } from "react";






export const Exit = ({ setModalIsOpen }) => {


  return (
    <div className="component-Player">
      <button onClick={() => setModalIsOpen(false)}>EXIT</button>
    </div>
  );
}
