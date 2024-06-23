import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuItems } from "../../assets/pictures/pictures";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemIndex = menuItems.findIndex((item) => item.id === parseInt(id));
  const item = menuItems[itemIndex];
  const [videoLoaded, setVideoLoaded] = useState(false);

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleNext = () => {
    if (itemIndex < menuItems.length - 1) {
      navigate(`/menu/${menuItems[itemIndex + 1].id}`);
    }
  };

  const handlePrevious = () => {
    if (itemIndex > 0) {
      navigate(`/menu/${menuItems[itemIndex - 1].id}`);
    }
  };

  useEffect(() => {
    const loadVideo = async () => {
      if (item.video) {
        const video = document.createElement("video");
        video.src = item.video;
        video.preload = "auto";
        try {
          await video.load();
          setVideoLoaded(true);
        } catch (error) {
          console.error("Error loading video:", error);
        }
      }
    };

    loadVideo();
  }, [item.video]);

  return (
    <div className="menu-details">
      <button
        className="navigation-button left-button"
        onClick={handlePrevious}
        disabled={itemIndex === 0}
      >
        &lt;
      </button>
      <div className="menu-details-content">
        <h2 className="menu-details-name">{item.name}</h2>
        <div className="menu-details-content-info">
          <p className="menu-details-calories">{item.calories}</p>
          <p className="menu-details-bsp"> &nbsp; | &nbsp; </p>
          <p className="menu-details-price">{item.price}</p>
        </div>

        <div className="menu-details-image-container">
          {item.video && videoLoaded && (
            <video
              src={item.video}
              autoPlay
              muted
              loop
              className="menu-details-video"
            />
          )}

          {!item.video && (
            <img
              src={item.image}
              alt={item.name}
              className="menu-details-image"
            />
          )}
        </div>

        <p className="menu-details-desc">{item.desc}</p>
        <button className="menu-details-button">Add to Cart</button>
      </div>
      <button
        className="navigation-button right-button"
        onClick={handleNext}
        disabled={itemIndex === menuItems.length - 1}
      >
        &gt;
      </button>
    </div>
  );
};

export default ItemDetails;
