import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../../../Redux/Actions";
import { useDispatch } from "react-redux";
import { newUser } from "../../../../Redux/Actions";

import "./CreateUser.css";
import { passwordValidator } from "../../../helpers/PasswordValidator";
import { emailValidator } from "../../../helpers/EmailValidator";

function CreateUser() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passShow, setPassShow] = useState(false);

  /* function handleValidationPassword(pass) {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = pass.length;
    const uppercasePassword = uppercaseRegExp.test(pass);
    const lowercasePassword = lowercaseRegExp.test(pass);
    const digitsPassword = digitsRegExp.test(pass);
    const specialCharPassword = specialCharRegExp.test(pass);
    const minLengthPassword = minLengthRegExp.test(pass);

    if (passwordLength === 0) {
      return alert("Password is empty");
    } else if (!uppercasePassword) {
      return alert("The password must have at least one Uppercase");
    } else if (!lowercasePassword) {
      return alert("The password must have at least one Lowercase");
    } else if (!digitsPassword) {
      return alert("The password must have at least one digit");
    } else if (!specialCharPassword) {
      return alert("The password must have at least one Special Characters");
    } else if (!minLengthPassword) {
      return alert("The password must have at least minumum 8 characters");
    } else if (input.password !== input.confirmPassword) {
      return alert("Passwords do not match");
    }
  }

  function handleValidationEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailValidation = emailRegExp.test(email);
    if (!emailValidation) {
      return alert("Invalid email format");
    }
  } */

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

    passwordValidator(input.password, input.confirmPassword)
    emailValidator(input.email)
    /* handleValidationPassword(input.password);
    handleValidationEmail(input.email); */

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
