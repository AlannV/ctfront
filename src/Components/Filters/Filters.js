import SearchBar from "../SearchBar/SearchBar.js";
import FilterBy from "../FilterBy/FilterBy.js";
import ShowFilters from "../ShowFilters/ShowFilters.js";

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { filterMovies } from "../../Redux/Actions/index";

import "./Filters.css";

export default function Filters() {

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    title: 'default',
    genre: "default",
    comingSoon: "default",
    display: 'default'
  });

  useEffect(() => {
    dispatch(filterMovies(filters));
  }, [dispatch, filters]);

  return (
    <>
      <div className="filters--container">
        <SearchBar filters={filters} setFilters={setFilters}/>
        <FilterBy filters={filters} setFilters={setFilters}/>
      </div>
      <ShowFilters filters={filters} setFilters={setFilters}/>
    </>
  );
}
