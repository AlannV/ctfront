import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Auth/Context/authContext";
import {
  getMovieReviews,
  createReview,
  setFav,
} from "./../../../Redux/Actions/index";
import { getAllUsers } from "../../../Redux/Actions/user";
import { getMovieDetail, delMovieDetail } from "../../../Redux/Actions/movies";
import Review from "./../Review/Review.js";
import Loading from "../../Common/Loading/Loading";
import "./MovieDetails.css";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import StarIcon from "@mui/icons-material/Star";

function MovieDetails({
  movieDetail,
  movieReviews,
  getMovieDetail,
  delMovieDetail,
  getMovieReviews,
  createReview,
}) {
  const { authUser } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();

  // ESTADO PARA CHECKEAR SI LLENO LOS CAMPOS DE LA REVIEW
  const [checkReview, setCheckReview] = useState(true);
  // ESTADO PARA MOSTRAR O NO EL FORMULARIO DE AGREGAR REVIEW
  const [addReviewActive, setAddReviewActive] = useState(false);
  // ESTADO PARA ACTUALIZAR EL PROMEDIO TOTAL DE LAS REVIEWS
  const [reviewsAverage, setReviewsAverage] = useState(0);
  // ESTADO PARA RE RENDERIZAR CUANDO SE SUBA UNA REVIEW NUEVA
  const [reviewChange, setReviewChange] = useState(false);

  const totalReviews = movieReviews.reduce((acc, movieReviews) => {
    return acc + movieReviews.rate;
  }, 0);

  useEffect(() => {
    dispatch(getAllUsers());
    getMovieReviews(id);
    getMovieDetail(id);
    setReviewsAverage(totalReviews / movieReviews.length);
    setReviewChange(false);
    return () => {
      delMovieDetail();
    };
  }, [
    dispatch,
    delMovieDetail,
    id,
    getMovieDetail,
    movieReviews.length,
    getMovieReviews,
    totalReviews,
    reviewChange,
    getAllUsers,
  ]);
  const users = useSelector((state) => state.users);
  // FUNCION PARA POSTEAR UNA NUEVA REVIEW
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.rating.value === "default" || e.target.review.value === "") {
      setAddReviewActive(!addReviewActive);
      setCheckReview(false);
    } else {
      const review = {
        ...reviewChange,
        movie_id: id,
        email: authUser.email,
        rate: parseInt(e.target.rating.value),
        review: e.target.review.value,
      };
      createReview(review);
      setAddReviewActive(!addReviewActive);
      setCheckReview(true);
      setReviewChange(true);
    }
  }

  //! Clic para agregar a favoritos--------------
  const movie_id = Number(id);
  const [val, setVal] = useState(false);

  var user;
  const uid = authUser?.uid;
  for (let i = 0; i < users?.length; i++) {
    if (users[i]?.user_id === uid) user = users[i];
  }
  useEffect(() => {
    if (user?.favMovieId.includes(movie_id)) return setVal(val);
    if (!user?.favMovieId.includes(movie_id)) return setVal(!val);
  }, [setVal]);
  const handleClick = () => {
    const update = { movie_id, val };
    let opuesto = !val;
    setVal(opuesto);
    const user_id = authUser.uid;
    dispatch(setFav(update, user_id));
  };
  //!--------------------------------------------

  return (
    <>
      {Object.keys(movieDetail).length > 1 ? (
        <div className="movie--detail--container">
          {/* FIRST ROW */}
          <div className="movie--detail--firstrow">
            <div className="movie--detail--title--container">
              <h2 className="movie--detail--title">
                {movieDetail.title.toUpperCase()}
              </h2>
              {movieDetail.comingSoon && (
                <p className="movie--detail--comingsoon">COMING SOON</p>
              )}
              {/* Botón para favoritos */}
              {authUser?.uid ? (
                <button
                  className="movie--detail--favbutton"
                  onClick={handleClick}
                  style={val === false ? { color: "rgb(180, 46, 46)" } : null}
                >
                  <FavoriteSharpIcon></FavoriteSharpIcon>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="movie--detail--button--container">
              <Link
                className="movie--detail--button"
                to={`/movie/buy/${movieDetail.movie_id}`}
              >
                BUY TICKET
                <ArrowCircleRightIcon fontSize="large" />
              </Link>
            </div>
          </div>

          {/* SECOND ROW - RATING - GENRE - DURATION */}
          <div className="movie--detail--rating--container">
            {movieReviews.length === 0 ? (
              <p className="review--notfound">No reviews so far</p>
            ) : (
              <>
                <p>
                  <span className="average--rating">
                    {reviewsAverage.toString().substring(0, 3)}
                  </span>
                  /5
                </p>
                <StarIcon className="average--star" />
              </>
            )}
          </div>

          {/* THIRD ROW */}
          <div className="movie--detail--info--container">
            <img
              className="movie--detail--poster"
              src={movieDetail.poster}
              alt={`poster of ${movieDetail.title}`}
            />
            <div className="movie--detail--info">
              <ul className="movie--detail--genre--list">
                {movieDetail &&
                  movieDetail.genre.map((genre, i) => (
                    <li key={i} className="movie--detail--list--item">
                      {genre}
                    </li>
                  ))}
              </ul>
              <p className="movie--detail--description">
                {movieDetail.description}
              </p>
              <p className="movie--detail--director">
                <span className="movie--detail--span">Director: </span>{" "}
                {movieDetail.director}
              </p>
              <p className="movie--detail--cast">
                <span className="movie--detail--span">Cast: </span>
                {movieDetail.cast.map((actor, i) =>
                  i + 1 !== movieDetail.cast.length
                    ? ` ${actor}, `
                    : ` ${actor} `
                )}
              </p>
              <p className="movie--detail--classification">
                <span className="movie--detail--span">Classification: </span>
                {movieDetail.classification}
              </p>
              <ul className="movie--detail--display--list">
                {movieDetail.display.map((display, i) => (
                  <li className="movie--detail--list--item" key={i}>
                    {display}
                  </li>
                ))}
              </ul>
              <p className="movie--detail--duration">
                <span className="movie--detail--span">Duration: </span>
                {/* IN MINUTES */}
                {/* {movieDetail.duration} min. */}
                {/* IN HOURS */}
                {movieDetail.duration.toString().length === 2
                  ? `1h ${movieDetail.duration % 60}min`
                  : `2h ${movieDetail.duration % 60}min`}
              </p>
            </div>
          </div>

          {/* FOURTH ROW */}
          <div className="movie--detail--teaser--container">
            <iframe
              className="movie--detail--teaser"
              src={`https://www.youtube.com/embed/${
                movieDetail.teaser.split("/")[
                  movieDetail.teaser.split("/").length - 1
                ]
              }`}
              title={`Trailer of ${movieDetail.title}`}
              allowFullScreen
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          <Review
            movie_id={id}
            movieReviews={movieReviews}
            handleSubmit={handleSubmit}
            addReviewActive={addReviewActive}
            setAddReviewActive={setAddReviewActive}
            checkReview={checkReview}
          />

          {/* BUTTON GO BACK */}
          <div className="movie--detail--button--container movie--detail--button__goback">
            <Link className="movie--detail--button" to={"/"}>
              <ArrowCircleLeftIcon fontSize="large" />
              GO BACK
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movieDetail: state.movieDetail,
    movieReviews: state.movieReviews,
  };
};

export default connect(mapStateToProps, {
  getMovieDetail,
  delMovieDetail,
  getMovieReviews,
  createReview,
})(MovieDetails);
