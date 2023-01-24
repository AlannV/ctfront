import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as randomId } from "uuid";

import { getSeats, createRoom, getDisplays } from "../../../../Redux/Actions";

import Loading from "../../../Loading/Loading";

import "./CreateRoom.css";

function CreateRoom() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    room_seats: [],
    display_type: [],
  });

  const display = useSelector((state) => state.displays);
  const seats = useSelector((state) => state.seats);

  input.room_seats = seats;

  useEffect(() => {
    dispatch(getSeats());
    dispatch(getDisplays());
  }, [dispatch]);

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

  function handleSubmit(e) {
    e.preventDefault();
    input.display_type = input.display_type.toString();
    dispatch(createRoom(input));
    setInput({
      name: "",
      room_seats: "",
      display_type: [],
    });
    e.target.reset();
  }

  return (
    <div className="ban-user-main-container">
      {display === undefined || display === null || display.length < 1 ? (
        <Loading />
      ) : (
        <div className="ban-user-sub-container">
          <h1>Create Room</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="admin-form">
            <>
              <label
                htmlFor="name"
                className="admin-form-titles"
                key={randomId}
              >
                Room Name :
              </label>
              <input
                key="name"
                className="admin-input"
                type="text"
                value={input.value}
                name="name"
                // required
                placeholder={`Insert room name here...`}
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
                        <option className="admin-input" key={dis} value={dis}>
                          {dis}
                        </option>
                      ) : null;
                    })}
              </select>
              <div>
                <ul>
                  {input.display_type.map((el) => (
                    <div className="admin-select-selected" key={el}>
                      <li
                        onClick={() => handleDeleteDisplay(el)}
                        className="admin-selected-options"
                      >
                        {el}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </>
            <div className="admin-buttons-container">
              <div className="another-container">
                <button type="submit" className="admin-buttons">
                  Create Room
                </button>
              </div>
            </div>
          </form>
          <Link to="/adminmenu">
            <button className="admin-buttons">Go Back</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CreateRoom;
