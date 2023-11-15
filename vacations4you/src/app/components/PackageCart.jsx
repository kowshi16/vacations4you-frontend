import React from "react";
import "../styles/shoppingCartPackage.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function PackageCart({
    visibility,
    packages,
    onPackageRemove,
    onClose,
    onQuantityChange,
  }) {
    return (
      <div
        className="modal"
        style={{
          display: visibility ? "block" : "none",
        }}
      >
        <div className="shoppingCartPackage">
          <div className="header">
            <h2>Package Booking Cart</h2>
            <button className="btn close-btn" onClick={onClose}>
              <AiFillCloseCircle size={30} />
            </button>
          </div>
          <div className="cart-packages">
            {packages.length === 0 && (
              <span className="empty-text">Your cart is currently empty</span>
            )}
  
            {packages.map((packagee) => (
              <div className="cart-package" key={packagee._id}>
                <img src={packagee.image_path} alt={packagee.title} />
                <div className="package-info">
                  <h3>{packagee.title}</h3>
                  <span className="package-price">
                    $ {packagee.price * packagee.count}
                  </span>
                </div>
                <select
                  className="count"
                  value={packagee.count}
                  onChange={(event) => {
                    onQuantityChange(packagee._id, event.target.value);
                  }}
                >
                  {[...Array(10).keys()].map((number) => {
                    const num = number + 1;
                    return (
                      <option value={num} key={num}>
                        {num}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn remove-btn"
                  onClick={() => onPackageRemove(packagee)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))}
            {packages.length > 0 && (
              <Link to="/package-booking" className="button checkout-btn">
                Proceed to checkout
              </Link>
  
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default PackageCart;
  