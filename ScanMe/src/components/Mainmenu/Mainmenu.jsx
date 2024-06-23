import React from "react";
import './Mainmenu.css';
import { useNavigate } from "react-router-dom";
import MenuDisplay from "../MenuDisplay/MenuDisplay";

function Mainmenu({ items }) {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="app">
      <div className="menu-list">
        {items.map((item) => (
          <MenuDisplay
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Mainmenu;
