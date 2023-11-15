import React from "react";
import "../styles/shoppingCartActivity.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function ActivityCart({
  visibility,
  activities,
  onActivityRemove,
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
      <div className="shoppingCartActivity">
        <div className="header">
          <h2>Activity Booking Cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-activities">
          {activities.length === 0 && (
            <span className="empty-text">Your cart is currently empty</span>
          )}

          {activities.map((activity) => (
            <div className="cart-activity" key={activity._id}>
              <img src={activity.image_path} alt={activity.title} />
              <div className="activity-info">
                <h3>{activity.title}</h3>
                <span className="activity-price">
                  $ {activity.price * activity.count}
                </span>
              </div>
              <select
                className="count"
                value={activity.count}
                onChange={(event) => {
                  onQuantityChange(activity._id, event.target.value);
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
                onClick={() => onActivityRemove(activity)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
          {activities.length > 0 && (
            <Link to="/activity-booking" className="button checkout-btn">
              Proceed to checkout
            </Link>

          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityCart;
