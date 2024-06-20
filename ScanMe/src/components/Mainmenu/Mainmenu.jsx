import React from "react";
import './Mainmenu.css'
// import '../../components/style.css';
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../assets/pictures/pictures";
import MenuDisplay from "../MenuDisplay/MenuDisplay";

function Mainmenu() {
    
    const navigate = useNavigate();

    

    return (
        <div className="app">
            <div className="menu-list">
                {menuItems.map((item) => (
                    <MenuDisplay
                        key={item.id}
                        item={item}
                        
                    />
                ))}
            </div>
        </div>
    );
}

export default Mainmenu;
