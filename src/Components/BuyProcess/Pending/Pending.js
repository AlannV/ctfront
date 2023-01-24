import React, { useEffect } from "react";
import "../buyProcessStyles.css";
import { Link } from "react-router-dom";
import cleanLocalStorage from "../cleanLocalStorage.js";

import Logo from "../logomain.png";

function Pending() {
  useEffect(() => {
    cleanLocalStorage();
  }, []);

  return (
    <div className="buy-process-main-container">
      <div className="buy-process-sub-container">
        <div className="buy-process-card">
          <h1 className="buy-process-title">Payment Pending</h1>
          <h2 className="buy-process-text">Your payment is in process</h2>
          <h2 className="buy-process-text">
            Wait for confirmation or denial mail before try to
          </h2>
          <h2 className="buy-process-text">make a new order</h2>
          <img src={Logo} alt="Logo" className="logo" />
          <Link to="/adminmenu">
            <button className="admin-buttons">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pending;
