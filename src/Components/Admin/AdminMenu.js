import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "../../Styles/AdminMenu.css";
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";
import ResetUserPassword from "./ResetUserPassword";
import UpgradeUser from "./UpgradeUser";
import BanUser from "./BanUser";
import ActivateUser from "./ActivateUser";
import DeleteUser from "./DeleteUser";
import CreateProduct from "./CreateProduct";
import CreateRoom from "./CreateRoom";
import CreateSchedule from "./CreateSchedule";

function AdminMenu() {
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);
  const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);
  const [isOpenChangeRole, setIsOpenChangeRole] = useState(false);
  const [isOpenDeactivateUser, setIsOpenDeactivateUser] = useState(false);
  const [isOpenActivateUser, setIsOpenActivateUser] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false);
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenCreateSchedule, setIsOpenCreateSchedule] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <div className="admin-menu-main-container" id="admin-menu">
      <div className="admin-menu-sub-container">
        <div className="admin-menu-options-container">
          <div className="admin-menu-left-container">
            <h2>User Options</h2>
            <div className="admin-menu-options admin-menu-options-users">
              <button
                className="admin-buttons"
                onClick={() => setIsOpenCreateUser(true)}
              >
                Create User
              </button>

              <button
                className="admin-buttons"
                onClick={() => setIsOpenResetPassword(true)}
              >
                Reset Password
              </button>
              <button
                className="admin-buttons"
                onClick={() => setIsOpenChangeRole(true)}
              >
                Change Roles
              </button>
              <button
                className="admin-buttons"
                onClick={() => setIsOpenDeactivateUser(true)}
              >
                Deactivate User
              </button>
              <button
                className="admin-buttons"
                onClick={() => setIsOpenActivateUser(true)}
              >
                Activate User
              </button>
              <button
                className="admin-buttons"
                onClick={() => setIsOpenDeleteUser(true)}
              >
                Delete User
              </button>

              <Link to="/adminmenu/purchases">
                <button className="admin-buttons">Purchase history</button>
              </Link>
            </div>

            <h2>Products</h2>
            <div className="admin-menu-options admin-menu-options-products">
              <button
                className="admin-buttons"
                onClick={() => setIsOpenCreateProduct(true)}
              >
                Create Product
              </button>
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
              <button
                className="admin-buttons"
                onClick={() => setIsOpenCreateRoom(true)}
              >
                Create Room
              </button>
              <Link to="/adminmenu/editroom">
                <button className="admin-buttons">Edit Room</button>
              </Link>
              <Link to="/adminmenu/deleteroom">
                <button className="admin-buttons">Delete/Activate</button>
              </Link>
            </div>

            <h2>Schedules</h2>
            <div className="admin-menu-options admin-menu-options-schedules">
              <button
                className="admin-buttons"
                onClick={() => setIsOpenCreateSchedule(true)}
              >
                Create Schedule
              </button>
              <Link to="/adminmenu/deleteschedule">
                <button className="admin-buttons">Delete/Activate</button>
              </Link>
            </div>

            {/* MODALS */}

            <Modal
              isOpen={isOpenCreateUser}
              onRequestClose={() => setIsOpenCreateUser(false)}
            >
              <CreateUser setIsOpenCreateUser={setIsOpenCreateUser} />
            </Modal>
            <Modal
              isOpen={isOpenResetPassword}
              onRequestClose={() => setIsOpenResetPassword(false)}
            >
              <ResetUserPassword
                setIsOpenResetPassword={setIsOpenResetPassword}
              />
            </Modal>
            <Modal
              isOpen={isOpenChangeRole}
              onRequestClose={() => setIsOpenChangeRole(false)}
            >
              <UpgradeUser setIsOpenChangeRole={setIsOpenChangeRole} />
            </Modal>
            <Modal
              isOpen={isOpenDeactivateUser}
              onRequestClose={() => setIsOpenDeactivateUser(false)}
            >
              <BanUser setIsOpenDeactivateUser={setIsOpenDeactivateUser} />
            </Modal>
            <Modal
              isOpen={isOpenActivateUser}
              onRequestClose={() => setIsOpenActivateUser(false)}
            >
              <ActivateUser setIsOpenActivateUser={setIsOpenActivateUser} />
            </Modal>
            <Modal
              isOpen={isOpenDeleteUser}
              onRequestClose={() => setIsOpenDeleteUser(false)}
            >
              <DeleteUser setIsOpenDeleteUser={setIsOpenDeleteUser} />
            </Modal>
            <Modal
              isOpen={isOpenCreateProduct}
              onRequestClose={() => setIsOpenCreateProduct(false)}
            >
              <CreateProduct setIsOpenCreateProduct={setIsOpenCreateProduct} />
            </Modal>
            <Modal
              isOpen={isOpenCreateRoom}
              onRequestClose={() => setIsOpenCreateRoom(false)}
            >
              <CreateRoom setIsOpenCreateRoom={setIsOpenCreateRoom} />
            </Modal>
            <Modal
              isOpen={isOpenCreateSchedule}
              onRequestClose={() => setIsOpenCreateSchedule(false)}
            >
              <CreateSchedule
                setIsOpenCreateSchedule={setIsOpenCreateSchedule}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
