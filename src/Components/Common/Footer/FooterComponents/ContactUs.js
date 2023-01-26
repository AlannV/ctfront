import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { recievedContact, sentContact } from "../../../../Redux/Actions/index";

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
