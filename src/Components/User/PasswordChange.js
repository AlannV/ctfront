import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../../Styles/PasswordChange.css";
import { useAuth } from "../Auth/authContext";
import { passwordValidator } from "../helpers/PasswordValidator";
import allActions from "../../Redux/Actions";
const { changePassword } = allActions;

function PasswordChange() {
  const dispatch = useDispatch();
  const { authUser } = useAuth();
  const email = authUser?.email;

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let update = { email, password: input.password };
    if (passwordValidator(input.password, input.confirmPassword)) {
      dispatch(changePassword(update));
      e.target.reset();
    }
  }

  return (
    <div className="admin-reset-main-container">
      <div className="admin-reset-sub-container">
        <h1>Change your password</h1>

        <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
          <label className="user-text-required">
            - At least 6 characters <br />
            - At least 1 uppercase
            <br />
            - At least 1 lowercase
            <br />
            - At least 1 number
            <br />- At least 1 special character (#?!@$%^&*-)
          </label>
          <input
            className="admin-input"
            onChange={(e) => handleChange(e)}
            type="password"
            value={input.value}
            name="password"
            placeholder="Enter new password"
          />
          <input
            className="admin-input"
            onChange={(e) => handleChange(e)}
            type="password"
            value={input.value}
            name="confirmPassword"
            placeholder="Confirm new password"
          />
          <div className="admin-buttons-container">
            <button type="submit" className="admin-buttons">
              Change
            </button>
          </div>
        </form>
        <Link to={"/myprofile"}>
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default PasswordChange;
