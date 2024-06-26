import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuItems } from "../../assets/pictures/pictures";
import { useAddedItems } from "../context/AddedItemsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ItemDetails.css";
import PopupComponent from "../PopupComponent/PopupComponent";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemIndex = menuItems.findIndex((item) => item.id === parseInt(id));
  const item = menuItems[itemIndex];
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { addItem, isItemAdded } = useAddedItems();

  const [popUp, setPopup] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

  const handleAddItem = () => {
    if (isItemAdded(item.id)) {
      toast.info(`${item.name} is already in the cart!`);
      return;
    }
    addItem(item);
    toast.success(`${item.name} added to the cart!`);
  };

  const handleNavigate = () => {
    navigate('/added-items');
  };

  const handleCombinationClick = (combination) => {
    const combinationItem = menuItems.find(
      (menuItem) => menuItem.name === combination
    );
    if (combinationItem) {
      setSelectedCombination(combinationItem);
      setPopup(true);
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <div className={`menu-details ${loaded ? "loaded" : ""}`}>
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
            {item.video && (
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
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
          <div className="menu-details-buttons">
            <button className="menu-details-button" onClick={handleAddItem}>
              Add
            </button>
            <button className="menu-details-button" onClick={handleNavigate}>
              Go to cart
            </button>
          </div>
        </div>
        <button
          className="navigation-button right-button"
          onClick={handleNext}
          disabled={itemIndex === menuItems.length - 1}
        >
          &gt;
        </button>
      </div>

      {item.combinations && (
        <div className="item-combinations">
          <h1>Best Combinations</h1>
          <p>These are some best combinations with your {item.name}</p>
          <div className="combinations-list">
            {item.combinations.map((combination, index) => {
              const combinationItem = menuItems.find(
                (menuItem) => menuItem.name === combination
              );
              return (
                <div
                  key={index}
                  className="combination-item"
                  onClick={() => handleCombinationClick(combination)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={combinationItem.image}
                    alt={combinationItem.name}
                    className="combination-item-image"
                  />
                  <h3 className="combination-item-name">
                    {combinationItem.name}
                  </h3>
                  <h4 className="combination-item-price">
                    {combinationItem.price}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {popUp && selectedCombination && (
        <PopupComponent
          setPopup={setPopup}
          combinationItem={selectedCombination}
        />
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
};

export default ItemDetails;
