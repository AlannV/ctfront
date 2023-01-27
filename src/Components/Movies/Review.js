import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import "../../Styles/Review.css";

import ShowReviews from "../ShowReviews/ShowReviews.js";

// ICONS
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import StarIcon from "@mui/icons-material/Star";

export default function Review({
  movieReviews,
  handleSubmit,
  addReviewActive,
  setAddReviewActive,
  checkReview,
}) {
  const { authUser } = useAuth();

  // ESTADO PARA MOSTRAR O NO TODAS LAS REVIEWS
  const [showAllReviews, setShowAllReviews] = useState(false);

  // GUARDANDO LA CANTIDAD DE ESTRELLAS QUE TIENE LA PRIMER REVIEW
  let rateStars = [];
  if (movieReviews.length > 0) {
    for (let i = 0; i < movieReviews[0].rate; i++) {
      rateStars.push(
        <StarIcon key={i} className="first--review--star" fontSize="medium" />
      );
    }
  }

  return (
    <>
      {authUser ? (
        <div className="create--review--container">
          {addReviewActive &&
          movieReviews.filter((r) => r.user.email === authUser.email).length ===
            0 ? (
            <form
              className="create--review--form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <select
                className="create--review--input create--review--rating"
                name="rating"
              >
                <option value="default">Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <textarea
                className="create--review--input create--review--textarea"
                type="text"
                name="review"
                placeholder="Write a review for this movie"
              />
              <input
                className="create--review--input create--review--submit"
                type="submit"
                value="ADD REVIEW"
              />
            </form>
          ) : (
            <>
              <button
                onClick={() => {
                  setAddReviewActive(true);
                }}
                className="create--review--button"
              >
                <p>ADD A REVIEW</p>
                <LibraryAddIcon fontSize="large" />
              </button>
              {!checkReview && (
                <p className="review--notfound">
                  Your review was not posted, you have to write something
                </p>
              )}
              {addReviewActive &&
                movieReviews.filter((r) => r.user.email === authUser.email)
                  .length > 0 && (
                  <p className="review--notfound">
                    You already write a review for this movie
                  </p>
                )}
            </>
          )}
        </div>
      ) : (
        <p className="review--notfound">
          You have to <Link to="/login">log in</Link> to add a review
        </p>
      )}
      <div className="review--container">
        <button
          className="see--reviews--button"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          <p className="review--title">Reviews</p>
          {showAllReviews ? (
            <ExpandLessIcon fontSize="large" />
          ) : (
            <ExpandMoreIcon fontSize="large" />
          )}
        </button>
        {movieReviews.length !== 0 && (
          <div className="first--review--container">
            <p className="first--review--user">{movieReviews[0].user.name}</p>
            <div className="first--review--rate">
              <div className="first--review--stars--container">{rateStars}</div>
              <p className="first--review--rate--text">
                {movieReviews[0].review}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* SHOWING ALL THE REVIEWS */}
      {showAllReviews && <ShowReviews movieReviews={movieReviews} />}
    </>
  );
}
