import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Actions";

//import "../Admin/Users/ResetUserPassword/ResetUserPassword.css";
import "./PasswordChange.css";
import { useAuth } from "../Context/authContext";

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
  function handleValidationPassword(pass) {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{6,}/;
    const passwordLength = pass.length;
    const uppercasePassword = uppercaseRegExp.test(pass);
    const lowercasePassword = lowercaseRegExp.test(pass);
    const digitsPassword = digitsRegExp.test(pass);
    const specialCharPassword = specialCharRegExp.test(pass);
    const minLengthPassword = minLengthRegExp.test(pass);

    if (passwordLength === 0) {
      return alert("Password is empty");
    } else if (input.password !== input.confirmPassword) {
      return alert("Passwords do not match");
    } else if (!uppercasePassword) {
      return alert("The password must have at least one Uppercase");
    } else if (!lowercasePassword) {
      return alert("The password must have at least one Lowercase");
    } else if (!digitsPassword) {
      return alert("The password must have at least one digit");
    } else if (!specialCharPassword) {
      return alert("The password must have at least one Special Characters");
    } else if (!minLengthPassword) {
      return alert("The password must have at least minumum 6 characters");
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let update = { email, password: input.password };
    if (handleValidationPassword(input.password)) {
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
