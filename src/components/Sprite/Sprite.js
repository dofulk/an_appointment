import React from "react";




export const Sprite = ({ entity }) => {


  return (
    <div className="component-Player">
      <h2 style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>{entity}</h2>
    </div>
  );
}

