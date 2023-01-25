import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyRole } from "../../../../Redux/Actions/user";

import "./UpgradeUser.css";

function UpgradeUser() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    role: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    e.preventDefault();
    if (e.target.value === "admin") {
      setInput({
        ...input,
        role: "A",
      });
    } else if (e.target.value === "user") {
      setInput({
        ...input,
        role: "C",
      });
    }
  }

  function handleValidationEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailValidation = emailRegExp.test(email);
    if (!emailValidation) {
      return alert("Invalid email format");
    }
  }

  function handleSubmit(e) {
    handleValidationEmail(input.email);

    if (input.email === "" || input.role === "") {
      return alert("Please fill all the fields");
    }

    e.preventDefault();
    dispatch(modifyRole(input));
    setInput({
      email: "",
      role: "",
    });
    e.target.reset();
  }

  return (
    <div className="upgrade-user-main-container">
      <div className="upgrade-user-sub-container">
        <h1>Change User Role</h1>
        <div className="upgrade-user">
          <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
            <>
              <label className="admin-form-titles" htmlFor="email">
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
            <>
              <label className="admin-form-titles" htmlFor="role">
                Role:
              </label>
              <select
                onChange={(e) => handleSelect(e)}
                className="admin-input"
                name="role"
                id="role"
                value={input.value}
              >
                <option value={""}>Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </>
            <div className="admin-buttons-container">
              <div className="another-container">
                <button className="admin-buttons" type="submit">
                  Change Role
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

export default UpgradeUser;
