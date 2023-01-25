import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../../Redux/Actions/user";
import { useAuth } from "../../../Auth/Context/authContext";
import "./Sidebar.css";
const Sidebar = (props) => {
  const [sidebarClass, setSidebarClass] = useState(props.sidebar);

  const closeHandler = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar--close");
    setTimeout(() => {
      props.close();
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, getAllUsers]);
  const users = useSelector((state) => state.users);
  const { authUser } = useAuth();
  const uid = authUser?.uid;
  const user = users ? users.filter((e) => e.user_id === uid) : "";
  const isAdmin = user ? user[0]?.role_id === "A" : "";

  return (
    <div className={sidebarClass}>
      <button id="close" onClick={closeHandler}>
        <p className="closebtn-text">&times;</p>
      </button>
      <ul className="sidebar--options">
        {authUser?.uid ? (
          <li className="sidebar--items" onClick={closeHandler}>
            <Link to="/myprofile">
              <p>MY PROFILE</p>
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="sidebar--items" onClick={closeHandler}>
          <Link to="/products">
            <p>PRODUCTS</p>
          </Link>
        </li>
        <li className="sidebar--items" onClick={closeHandler}>
          <Link to="/schedule">
            <p>SCHEDULES</p>
          </Link>
        </li>
        <li className="sidebar--items" onClick={closeHandler}>
          <Link to="/contact">
            <p>CONTACT</p>
          </Link>
        </li>
        <li className="sidebar--items" onClick={closeHandler}>
          <Link to="/about">
            <p>ABOUT US</p>
          </Link>
        </li>
        {isAdmin ? (
          <li className="sidebar--items" onClick={closeHandler}>
            <Link to="/adminmenu">
              <p>ADMIN MENU</p>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
