import { React } from "react";

import "../../Styles/SearchBar.css";

export default function SearchBar({ filters, setFilters }) {
  function handleInputChange(e) {
    e.preventDefault();
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="filters--searchbar--container">
      <input
        className="searchbar--input"
        type="text"
        placeholder="Search a movie"
        name="title"
        onChange={(e) => handleInputChange(e)}
        value={filters.title === "default" ? "" : filters.title}
      ></input>
    </div>
  );
}
