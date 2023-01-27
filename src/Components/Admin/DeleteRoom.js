import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loading from "../Common/Loading";
import "../../Styles/AdminRooms.css";
import allActions from "../../Redux/Actions";
const { getRooms, deleteRoom, activateRoom } = allActions;

function DeleteRoom() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const rooms = useSelector((state) => state.rooms);

  function handleActivate(id) {
    dispatch(activateRoom(id));
    setTimeout(() => {
      dispatch(getRooms());
    }, 1000);
  }

  function handleDelete(id) {
    dispatch(deleteRoom(id));
    setTimeout(() => {
      dispatch(getRooms());
    }, 1000);
  }

  return (
    <div className="edit-product-main-container">
      <h1>Delete Rooms</h1>
      <div className="edit-product-sub-container">
        <div className="edit-product">
          {rooms ? (
            <div className="admin-products-container">
              {rooms.map((room) => (
                <div className="admin-product admin-room" key={room.room_id}>
                  <div className="product-info">
                    <h3>Name : {room.name}</h3>
                    <p>Display : {room.display_type}</p>
                    <p>Active : {room.active ? "Yes" : "No"}</p>

                    <img
                      className="admin-product-image"
                      key=""
                      src="https://t3.ftcdn.net/jpg/01/12/45/24/360_F_112452485_RoSXj7VlrOx5KwZt2kRUfOyDnJrqOELf.jpg"
                      alt="product"
                    />
                  </div>

                  <div className="admin-buttons-container">
                    <div className="another-container">
                      <button
                        className="delete-product-button"
                        onClick={() => handleActivate(room.room_id)}
                      >
                        Activate
                      </button>
                      <button
                        className="delete-product-button"
                        onClick={() => handleDelete(room.room_id)}
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>

        <Link to="/adminmenu">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default DeleteRoom;
