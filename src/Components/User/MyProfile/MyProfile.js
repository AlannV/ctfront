import React from "react";
import { Link } from "react-router-dom";

export const MyProfile = () => {
  return (
    <div className="admin-menu-sub-container">
      <div className="admin-menu-options ">
        <Link to="/myfavorites">
          <button className="admin-buttons">My Favorites</button>
        </Link>
        <Link to="/cart">
          <button className="admin-buttons">My Cart</button>
        </Link>
        <Link to="/mypurchases">
          <button className="admin-buttons">My Purchases</button>
        </Link>
        <Link to="/resetpass">
          <button className="admin-buttons">Change Password</button>
        </Link>
      </div>
    </div>
  );
};
