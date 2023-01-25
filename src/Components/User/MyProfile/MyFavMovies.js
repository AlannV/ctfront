import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMovies } from "../../../Redux/Actions/movies";
import { getAllUsers } from "../../../Redux/Actions/user";
import { useAuth } from "../../Auth/Context/authContext";
import Loading from "../../Common/Loading/Loading";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import "./MyFavMovies.css";

export const MyFavMovies = () => {
  const { authUser } = useAuth();
  const dispatch = useDispatch();
  const uid = authUser?.uid;
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getAllUsers());
  }, [dispatch, getMovies, getAllUsers]);

  const movies = useSelector((state) => state.movies);
  const users = useSelector((state) => state.users);

  const user = users ? users.filter((e) => e.user_id === uid) : "";
  const favMoviesIds = user[0]?.favMovieId;
  const favMovies = [];
  for (let i = 0; i < movies?.length; i++) {
    if (favMoviesIds?.includes(movies[i].movie_id)) favMovies.push(movies[i]);
  }
  return favMovies.length === 0 ? (
    <Loading />
  ) : (
    <div className="movie--favorite--container">
      {favMovies ? (
        <div>
          {favMovies?.map((movie) => {
            return (
              <Link key={movie?.movie_id} to={`/movie/${movie?.movie_id}`}>
                <div className="movie--favorite--sub-container">
                  <div
                    className="movie--favorite--info--container"
                    key={movie?.movie_id}
                  >
                    <div>
                      <img
                        className="movie--favorite--poster"
                        src={movie?.poster}
                        alt={`poster of ${movie?.title}`}
                      />
                    </div>
                    <div className="movie--favorite--title-description">
                      <h2 className="movie--favorite--title">{movie?.title}</h2>
                      <p className="movie--favorite--description">
                        {movie?.description}
                      </p>
                    </div>
                    <div className="movie--favorite--lang-genre">
                      <span className="movie--favorite--span">
                        {movie?.language}
                      </span>
                      <div className="movie--favorite--genre">
                        <ul className="movie--favorite--genre--list">
                          {movie?.genre.map((genre, i) => (
                            <li key={i} className="movie--favorite--list--item">
                              {genre}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p>
                        {favMovies?.comingSoon && (
                          <p className="movie--favorite--comingsoon">
                            COMING SOON
                          </p>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
      <div className="movie--detail--button--container movie--detail--button__goback">
        <Link className="movie--detail--button" to={"/myprofile"}>
          <ArrowCircleLeftIcon fontSize="large" />
          GO BACK
        </Link>
      </div>
    </div>
  );
};
