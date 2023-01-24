import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovieName } from "../../../Redux/Actions/index.js";

import "./AdminSearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      if (name === "") {
        return alert("Please enter a movie name");
      }
      if (name.includes("  ")) {
        return alert("Please enter a valid movie name");
      }
      dispatch(getMovieName(name));
      setName("");
    }
  }

  function handleSubmit(e) {
    if (name === "") {
      return alert("Please enter a movie name");
    }
    e.preventDefault();
    dispatch(getMovieName(name));
    setName("");
  }
  return (
    <div className="searchbar-container">
      <input
        className="admin-input"
        type="text"
        placeholder="Search..."
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleInputChange(e)}
      />
      <button className="admin-search-buttons" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
