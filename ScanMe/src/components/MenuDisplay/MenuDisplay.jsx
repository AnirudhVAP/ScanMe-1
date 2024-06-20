import React from "react";
import "./MenuDisplay.css";

function MenuDisplay({ item }) {
  return (
    <>
      <div className="menu-item">
        <img src={item.image} alt={item.name} className="menu-item-image" />
        <div className="menu-item-info">
          <h3 className="menu-item-name">{item.name}</h3>
          <div className="menu-item-otherinfo">
            <p>{item.calories}</p>
            <p> &nbsp; | &nbsp;</p>
            <p className="menu-item-otherinfo-price">{item.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuDisplay;
