import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteUser } from "../../../../Redux/Actions";

import "./DeleteUser.css";

function DeleteUser() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      email: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteUser(input));
    setInput({
      email: "",
    });
    e.target.reset();
  }

  return (
    <div className="ban-user-main-container">
      <div className="ban-user-sub-container">
        <h1>Delete User</h1>
        <div className="ban-user">
          <form onSubmit={(e) => handleSubmit(e)} className="admin-form">
            <>
              <label htmlFor="email" className="admin-form-titles">
                Email:
              </label>
              <input
                className="admin-input"
                onChange={(e) => handleChange(e)}
                type="email"
                value={input.value}
                name="email"
                placeholder="Enter email"
              />
            </>
            <div className="admin-buttons-container">
              <div className="another-container">
                <button type="submit" className="admin-buttons">
                  Delete User
                </button>
              </div>
            </div>
          </form>
        </div>
        <Link to="/adminmenu">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default DeleteUser;
