import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "../../Styles/AdminSearchBar.css";
import allActions from "../../Redux/Actions";
const { getMovieName } = allActions;

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
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
