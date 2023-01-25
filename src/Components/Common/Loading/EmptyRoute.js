import React from "react";
import { Link } from "react-router-dom";
import Logo from "../BuyProcess/logomain.png";

import "../BuyProcess/buyProcessStyles.css";

function Success() {
  return (
    <div className="buy-process-main-container">
      <div className="buy-process-sub-container">
        <div className="buy-process-card">
          <h1 className="buy-process-title">There's nothing for you here yet.</h1>
          <h2 className="buy-process-text">Please go back</h2>
          <h2 className="buy-process-text">
            You can come back here to check it whenever you want.
          </h2>
          <h2 className="buy-process-text">See you later!</h2>
          <img src={Logo} alt="Logo" className="logo" />
          <Link to="/">
            <button className="admin-buttons">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
