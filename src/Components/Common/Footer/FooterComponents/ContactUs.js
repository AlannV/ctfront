import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { recievedContact, sentContact } from "../../../../Redux/Actions/index";

function validateForm(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (input.name.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$") == null) {
    errors.name = "only can use letters and spaces for name";
  } else if (input.name.match(/(\s{2,})/g) !== null) {
    errors.name = "you can't use two spaces in a row in the name";
  } else if (input.name.length > 25 || input.name.length < 3) {
    errors.name = "the name must be between 3 and 25 characters";
  } else if (input.name.match("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]") == null) {
    errors.name = "the name must be begin with a letter";
  }
  if (!input.lastname) {
    errors.lastname = "lastname is required";
  } else if (input.lastname.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$") == null) {
    errors.lastname = "only can use letters and spaces for lastname";
  } else if (input.lastname.match(/(\s{2,})/g) !== null) {
    errors.lastname = "you can't use two spaces in a row in the lastname";
  } else if (input.lastname.length > 25 || input.name.length < 3) {
    errors.lastname = "the lastname must be between 3 and 25 characters";
  } else if (input.lastname.match("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]") == null) {
    errors.lastname = "the lastname must be begin with a letter";
  }
  if (!input.email) {
    errors.email = "email is required";
  } else if (
    input.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) == null
  ) {
    errors.email = "it's not a valid email adress";
  }

  return errors;
}

export const ContactUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
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
    let errors = validateForm(input);
    let listErrors = Object.values(errors);
    if (listErrors.length === 0) {
      dispatch(recievedContact(input));
      dispatch(sentContact(input));
      alert("Message Sent!");
      setInput({
        name: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
      });
      navigate("/");
    } else {
      alert(listErrors.join("\n"));
    }
  }

  return (
    <div className="contact-us-main-container">
      <div className="contact-us-sub-container">
        <form
          className="admin-form"
          name="contact"
          onSubmit={(e) => handleSubmit(e)}
        >
          <>
            <label className="admin-form-titles">Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Type your name"
              className="admin-input"
              onChange={(e) => handleChange(e)}
              value={input.name}
            />
          </>
          <>
            <label className="admin-form-titles">Lastname: </label>
            <input
              type="text"
              name="lastname"
              placeholder="Type your lastname"
              className="admin-input"
              onChange={(e) => handleChange(e)}
              value={input.lastname}
            />
          </>
          <>
            <label className="admin-form-titles">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              className="admin-input"
              onChange={(e) => handleChange(e)}
              value={input.email}
            />
          </>
          <>
            <label className="admin-form-titles">Subject: </label>
            <input
              type="text"
              name="subject"
              placeholder="Type a topic"
              className="admin-input"
              onChange={(e) => handleChange(e)}
              value={input.subject}
            />
          </>
          <>
            <label className="admin-form-titles">Message: </label>
            <textarea
              name="message"
              cols="40"
              rows="4"
              placeholder="Type your comment"
              className="admin-textarea"
              onChange={(e) => handleChange(e)}
              value={input.message}
            />
          </>
          <div className="admin-buttons-container">
            <div className="another-container">
              <button className="admin-buttons" type="reset" name="reset">
                Clear
              </button>
              <button className="admin-buttons" type="submit" name="submit">
                Send
              </button>
            </div>
            <Link to="/">
              <button className="admin-buttons">Go Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
