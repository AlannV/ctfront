import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./ResetUserPassword.css";
import { useAuth } from "../../../Auth/Context/authContext";

function ResetUserPassword() {
  const resetPassword = useAuth();

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await resetPassword(e.target.value);
      alert(
        "Hemos enviado un mail, revisa tu bandeja de entrada o en su defecto la de spam"
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="admin-reset-main-container">
      <div className="admin-reset-sub-container">
        <h1>Reset User Password</h1>

        <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
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
          <div className="admin-buttons-container">
            <button type="submit" className="admin-buttons">
              Reset Password
            </button>
          </div>
        </form>
        <Link to="/adminmenu">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default ResetUserPassword;
