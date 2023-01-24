import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as randomId } from "uuid";

import { getAllMovies } from "../../../../Redux/Actions/index.js";
import { deleteMovie, activateMovie } from "../../../../Redux/Actions/index.js";

import Loading from "../../../Loading/Loading.js";

import "./DeleteMovie.css";
import Paging from "../../Paging/Paging.js";

function DeleteMovie() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const allMovies = useSelector((state) => state.allMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = allMovies?.slice(indexOfFirstMovie, indexOfLastMovie);

  function paging(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePagesChange(e) {
    setMoviesPerPage(e.target.value);
  }

  function handleDelete(e) {
    dispatch(deleteMovie(e));
    setTimeout(() => {
      dispatch(getAllMovies());
    }, 1000);
  }

  function handleActivate(e) {
    dispatch(activateMovie(e));
    setTimeout(() => {
      dispatch(getAllMovies());
    }, 1000);
  }

  return (
    <div className="edit-product-main-container">
      <div className="edit-product-sub-container">
        <h1>Activate or Deactivate Movie</h1>
        <Paging
          itemsPerPage={moviesPerPage}
          allItems={allMovies?.length}
          paging={setCurrentPage}
        />
        <div className="delete-movies">
          {currentMovies ? (
            <div key={randomId()} className="movie-cards-container">
              {currentMovies?.map((movie) => {
                return (
                  <div key={randomId()} className="admin-product">
                    <div
                      key={randomId()}
                      className={
                        movie.active
                          ? "movie-card-active"
                          : "movie-card-inactive"
                      }
                    >
                      <img
                        className="admin-movie-img"
                        alt={movie.poster}
                        key={randomId()}
                        src={movie.poster}
                      />
                      <div key={randomId()} className="admin-movie-info">
                        <h3 key={randomId()}>{movie.title}</h3>
                        {movie.active === true ? (
                          <p key={randomId()}>Movie active</p>
                        ) : (
                          <p key={randomId()}>Movie inactive</p>
                        )}
                      </div>

                      <div key={randomId()} className="admin-buttons-container">
                        <div key={randomId()} className="another-container">
                          <button
                            key={randomId()}
                            className="delete-product-button"
                            onClick={() => handleActivate(movie.movie_id)}
                          >
                            Activate
                          </button>
                          <button
                            key={randomId()}
                            className="delete-product-button"
                            onClick={() => handleDelete(movie.movie_id)}
                          >
                            Deactivate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Loading />
          )}
        </div>

        <Link to="/adminmenu" className="go--back--button">
          <button className="admin-buttons">Go Back</button>
        </Link>
      </div>
    </div>
  );
}

export default DeleteMovie;
