import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

// LOGOS - ICONOS
import PersonIcon from "@mui/icons-material/Person";
import logos from "../../Images/Images";

import { useAuth } from "../Context/authContext";

import "./Header.css";

import Sidebar from "./MenuDrop/Sidebar";
import Toggle from "./MenuDrop/Menubtn/Menubtn";
import axios from "axios";

const logoCinema = logos[0].image;
function Header() {
  const { authUser, logOut, setAuthUser } = useAuth();
  let token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  const [sideOpen, setSideOpen] = useState(false);
  const openHandler = () => {
    if (!sideOpen) {
      setSideOpen(true);
    } else {
      setSideOpen(false);
    }
  };
  const sidebarCloseHandler = () => {
    setSideOpen(false);
  };
  let sidebar;
  if (sideOpen) {
    sidebar = <Sidebar close={sidebarCloseHandler} sidebar={"sidebar"} />;
  }

  const checkLogedIn = () => {
    if (authUser !== null) return true;
    if (token) {
      const isActive = axios
        .get(`http://localhost:3001/users/isActive?token=${token}`)
        .then((res) => {
          if (res.status === 200) {
            const loggedUser = {
              email: res.data.email,
              name: res.data.name,
            };
            setAuthUser(loggedUser);
            return true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (!isActive) {
        window.localStorage.removeItem("token");
      } else {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="header--sticky--container">
      <div className="header--container">
        <div className="header-menu-dropdown">
          {sidebar ? (
            <>
              {sidebar}
              <Toggle click={() => openHandler()} className="hidden" />
            </>
          ) : (
            <Toggle
              click={() => openHandler()}
              className="header--menu--icon"
            />
          )}
        </div>

        <div className="header--logo--menu">
          <Link to={"/"}>
            <img src={logoCinema} alt={logoCinema.alt} />
          </Link>
        </div>

        <div className="header--user--menu">
          {authUser ? (
            <div className="header--user">
              <p className="user--name">{authUser.email}</p>
              <button
                className="user--buttons"
                onClick={(e) => handleLogOut(e)}
              >
                LOG OUT
              </button>
            </div>
          ) : (
            <div className="header--user--icon">
              <Link to="/login">
                <PersonIcon fontSize="large" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
