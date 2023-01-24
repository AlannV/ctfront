import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logomain.png";

function Error() {
  return (
    <div className="buy-process-main-container">
      <div className="buy-process-sub-container">
        <div className="buy-process-card">
          <h1 className="buy-process-title">Error 404!</h1>
          <h2 className="buy-process-text">
            Sorry, the page you are looking for does not exist.
          </h2>
          <h2 className="buy-process-text">
            Please check the URL in the address bar and try again.
          </h2>
          <h2 className="buy-process-text">
            If you continue to have problems, please contact us.
          </h2>
          <img src={Logo} alt="Logo" className="logo" />
          <Link to="/adminmenu">
            <button className="admin-buttons">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
