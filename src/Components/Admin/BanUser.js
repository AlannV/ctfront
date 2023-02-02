import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../Styles/AdminUsers.css";
import allActions from "../../Redux/Actions";
const { banUser } = allActions;

function BanUser({ setIsOpenDeactivateUser }) {
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
    dispatch(banUser(input));
    setInput({
      email: "",
    });
    e.target.reset();
  }

  return (
    <div className="ban-user-main-container">
      <div className="ban-user-sub-container">
        <h1>Deactivate User</h1>
        <div className="ban-user">
          <div>
            <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
              <>
                <label className="admin-form-titles" htmlFor="email">
                  Email:
                </label>
                <input
                  className="admin-input"
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
              </>
              <div className="admin-buttons-container">
                <div className="another-container">
                  <button type="submit" className="admin-buttons">
                    Deactivate User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <button
          className="admin-buttons"
          onClick={() => setIsOpenDeactivateUser(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default BanUser;
