import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as randomId } from "uuid";

import { editRoom, getRooms } from "../../../../Redux/Actions/rooms";
import { getDisplays, getSeats } from "../../../../Redux/Actions";
import Loading from "../../../Common/Loading/Loading";

import "./EditRoom.css";

function EditRoom() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    // room_seats: [],
    display_type: [],
  });

  const [roomId, setRoomId] = useState(0);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getDisplays());
  }, [dispatch]);

  const display = useSelector((state) => state.displays);
  const rooms = useSelector((state) => state.rooms);

  function handleSelectDisplay(e) {
    e.preventDefault();
    setInput({
      ...input,
      display_type: [...input.display_type, e.target.value],
    });
  }

  function handleDeleteDisplay(el) {
    setInput({
      ...input,
      display_type: input.display_type.filter((disp) => disp !== el),
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      name: e.target.value,
    });
  }

  function handleReset() {
    setInput({
      name: "",
      display_type: [],
    });
    setRoomId(0);
  }

  function handleFill(index, roomid) {
    setRoomId(roomid);
    rooms[index].display_type = rooms[index].display_type.split(",");
    setInput({
      ...input,
      name: rooms[index].name,
      display_type: rooms[index].display_type,
    });
  }

  function handleSubmit(e) {
    input.display_type = input.display_type.toString();
    e.preventDefault();
    dispatch(editRoom(roomId, input));
    // setTimeout(() => {
    //   dispatch(getRooms());
    // }, 1000);
  }

  return (
    <div className="edit-room-main-container">
      <h1>Edit Rooms</h1>
      <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
        <>
          <label htmlFor="name" className="admin-form-titles" key={randomId}>
            Name :
          </label>
          <input
            key="name"
            className="admin-input"
            type="text"
            name="name"
            value={input.name}
            required
            placeholder={`Insert room...`}
            onChange={(e) => handleChange(e)}
          />
        </>
        <>
          <label htmlFor="display" className="admin-form-titles">
            Display :
          </label>
          <select
            className="admin-input"
            onChange={(e) => handleSelectDisplay(e)}
          >
            <option key={0} value="">
              Select
            </option>
            {display !== undefined &&
              display.length > 0 &&
              display
                .sort(function (a, b) {
                  if (a < b) return -1;
                  if (a > b) return 1;
                  return 0;
                })
                .map((dis) => {
                  return !input.display_type.includes(dis) ? (
                    <option key={dis} value={dis}>
                      {dis}
                    </option>
                  ) : null;
                })}
          </select>
          <div className="delete-container">
            <ul>
              {input.display_type.map((el) => (
                <div key={randomId()} className="admin-select-selected">
                  <li
                    className="admin-selected-options"
                    onClick={() => handleDeleteDisplay(el)}
                  >
                    <p className="selected--options">{el}</p>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </>
        <div className="admin-buttons-container">
          <div className="another-container">
            <button type="submit" className="admin-buttons">
              Submit Changes
            </button>
          </div>
        </div>
      </form>
      <button className="admin-buttons" onClick={() => handleReset()}>
        Clear Fields
      </button>

      {rooms ? (
        <div className="admin-products-container">
          {rooms.map((room, index) => (
            <div
              key={randomId()}
              className="admin-product"
              onClick={(_index) => handleFill(index, room.room_id)}
            >
              <h3>Name : {room.name}</h3>
              <p>Display : {room.display_type}</p>

              <img
                className="admin-product-image"
                key={randomId()}
                src="https://t3.ftcdn.net/jpg/01/12/45/24/360_F_112452485_RoSXj7VlrOx5KwZt2kRUfOyDnJrqOELf.jpg"
                alt="product"
              />
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <Link to="/adminmenu">
        <button className="admin-buttons">Go Back</button>
      </Link>
    </div>
  );
}

export default EditRoom;
