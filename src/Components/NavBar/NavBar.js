import React from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar.js";
import "../../Styles/NavBar.css";

function NavBar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };
  return (
    <div className="NavBar-container">
      <div className="NavBar-username">
        {user && (
          <div className="User-Id">
            <p className="User-optionesname">Bienvenido {user.email}</p>
            <button
              className="User-optionsbtn"
              onClick={(e) => handleLogOut(e)}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
      <div className="NavBar-items">
        <SearchBar />
      </div>
    </div>
  );
}

export default NavBar;
