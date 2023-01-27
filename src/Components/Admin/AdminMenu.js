import React from "react";
import "../../Styles/AdminMenu.css";
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="admin-menu-main-container">
      <div className="admin-menu-sub-container">
        <div className="admin-menu-options-container">
          <div className="admin-menu-left-container">
            <h2>User Options</h2>
            <div className="admin-menu-options admin-menu-options-users">
              <Link to="/adminmenu/createuser">
                <button className="admin-buttons">Create User</button>
              </Link>
              <Link to="/adminmenu/resetuserpassword">
                <button className="admin-buttons">Reset Password</button>
              </Link>
              <Link to="/adminmenu/upgradedemoteusers">
                <button className="admin-buttons">Change Roles</button>
              </Link>
              <Link to="/adminmenu/banuser">
                <button className="admin-buttons">Deactivate User</button>
              </Link>
              <Link to="/adminmenu/activateuser">
                <button className="admin-buttons">Activate User</button>
              </Link>
              <Link to="/adminmenu/purchases">
                <button className="admin-buttons">Purchase history</button>
              </Link>
            </div>

            <h2>Products</h2>
            <div className="admin-menu-options admin-menu-options-products">
              <Link to="/adminmenu/createproduct">
                <button className="admin-buttons">Create Product</button>
              </Link>
              <Link to="/adminmenu/editproduct">
                <button className="admin-buttons">Edit Product</button>
              </Link>
              <Link to="/adminmenu/deleteproduct">
                <button className="admin-buttons">Delete/Activate</button>
              </Link>
            </div>
          </div>
          <div className="admin-menu-right-container">
            <h2>Movies</h2>
            <div className="admin-menu-options admin-menu-options-movies">
              <Link to="/adminmenu/createmovie">
                <button className="admin-buttons">Create Movie</button>
              </Link>
              <Link to="/adminmenu/editmovie">
                <button className="admin-buttons">Edit Movie</button>
              </Link>
              <Link to="/adminmenu/deletemovie">
                <button className="admin-buttons">Delete/Activate</button>
              </Link>
            </div>

            <h2>Rooms</h2>
            <div className="admin-menu-options admin-menu-options-rooms">
              <Link to="/adminmenu/createroom">
                <button className="admin-buttons">Create Room</button>
              </Link>
              <Link to="/adminmenu/editroom">
                <button className="admin-buttons">Edit Room</button>
              </Link>
              <Link to="/adminmenu/deleteroom">
                <button className="admin-buttons">Delete/Activate</button>
              </Link>
            </div>

            <h2>Schedules</h2>
            <div className="admin-menu-options admin-menu-options-schedules">
              <Link to="/adminmenu/createschedule">
                <button className="admin-buttons">Create Schedule</button>
              </Link>
              <Link to="/adminmenu/deleteschedule">
                <button className="admin-buttons">Delete/Activate</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
