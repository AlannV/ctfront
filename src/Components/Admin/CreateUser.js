import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../../Styles/AdminUsers.css";
import { passwordValidator } from "../helpers/PasswordValidator";
import { emailValidator } from "../helpers/EmailValidator";
import allActions from "../../Redux/Actions";
const { createUser, newUser } = allActions;

function CreateUser() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passShow, setPassShow] = useState(false);

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

  function togglePassword() {
    setPassShow(!passShow);
  }

  function handleSubmit(e) {
    passwordValidator(input.password, input.confirmPassword);
    emailValidator(input.email);

    e.preventDefault();
    dispatch(createUser(input));
    let mail = { name: input.username, email: input.email };
    dispatch(newUser(mail));
    setInput({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    e.target.reset();
  }
  return (
    <div className="create-user-main-container">
      <h1>Create User</h1>
      <div className="create-user-sub-container">
        <div className="create-user">
          <form onSubmit={(e) => handleSubmit(e)} className="admin-form">
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
              <label className="admin-form-titles" htmlFor="username">
                UserName:
              </label>
              <input
                className="admin-input"
                onChange={(e) => handleChange(e)}
                type="text"
                value={input.value}
                name="username"
                placeholder="Enter User Name"
              />
            </>

            <>
              <label className="admin-form-titles" htmlFor="password">
                Password:
              </label>
              <input
                className="admin-input"
                onChange={(e) => handleChange(e)}
                type={passShow ? "text" : "password"}
                value={input.value}
                name="password"
                placeholder="Enter Password"
              />
            </>

            <>
              <label className="admin-form-titles" htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <input
                className="admin-input"
                onChange={(e) => handleChange(e)}
                type={passShow ? "text" : "password"}
                value={input.value}
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </>
            <p className="admin-selected-options" onClick={togglePassword}>
              Toggle Password Visibility
            </p>

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
                <button type="submit" className="admin-buttons">
                  Create User
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

export default CreateUser;
