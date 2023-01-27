import axios from "axios";

import {
  GET_MOVIES,
  GET_MOVIE_DETAIL,
  GET_MOVIE_NAME,
  DEL_MOVIE_DETAIL,
  DEL_MOVIES_FILTERED,
  FILTER_MOVIES,
  COMING_SOON,
  GET_ALL_MOVIES,
  RESET_SEARCH,
  GET_REVIEWS,
} from "../action-types";

const {
  REACT_APP_POST_CREATE_MOVIE,
  REACT_APP_PUT_UPDATE_MOVIE,
  REACT_APP_DELETE_MOVIE,
  REACT_APP_PUT_ACTIVATE_MOVIE,
  REACT_APP_GET_ALL_MOVIES,
  REACT_APP_GET_MOVIE_BY_NAME,
  REACT_APP_GET_MOVIE_REVIEW_BY_ID,
  REACT_APP_POST_CREATE_REVIEW,
  REACT_APP_PUT_ADD_FAVORITE,
} = process.env;

export function getMovies() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_MOVIES);
      return dispatch({ type: GET_MOVIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getMovieDetail(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${REACT_APP_GET_ALL_MOVIES}${id}`);
      return dispatch({ type: GET_MOVIE_DETAIL, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getMovieName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${REACT_APP_GET_MOVIE_BY_NAME}${name}`);
      return dispatch({ type: GET_MOVIE_NAME, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function delMovieDetail() {
  return {
    type: DEL_MOVIE_DETAIL,
  };
}

export function delMoviesFiltered() {
  return {
    type: DEL_MOVIES_FILTERED,
  };
}

export function filterMovies(filtro) {
  return {
    type: FILTER_MOVIES,
    payload: filtro,
  };
}

export function getComingSoon() {
  return {
    type: COMING_SOON,
  };
}

export function resetSearch() {
  return {
    type: RESET_SEARCH,
  };
}

export function getAllMovies() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_MOVIES);
      dispatch({ type: GET_ALL_MOVIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createMovie(payload) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_CREATE_MOVIE, payload);
      alert("Movie created!");
    } catch (error) {
      alert("Error creating movie!");
      console.error(error);
    }
  };
}

export function editMovie(id, payload) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_PUT_UPDATE_MOVIE}${id}`, payload);
      alert("Movie edited!");
    } catch (error) {
      alert("Error editing movie!");
      console.error(error);
    }
  };
}

export const deleteMovie = (id) => async () => {
  try {
    await axios.delete(`${REACT_APP_DELETE_MOVIE}${id}`);
    alert("Movie deactivated!");
  } catch (error) {
    alert("Error deactivating movie!");
    console.error(error);
  }
};

export const activateMovie = (id) => async () => {
  try {
    await axios.put(`${REACT_APP_PUT_ACTIVATE_MOVIE}${id}`);
    alert("Movie activated!");
  } catch (error) {
    alert("Error activating movie!");
    console.error(error);
  }
};

// REVIEWS

export function getMovieReviews(id_movie) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${REACT_APP_GET_MOVIE_REVIEW_BY_ID}${id_movie}`
      );
      return dispatch({ type: GET_REVIEWS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createReview(review) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_CREATE_REVIEW, review);
    } catch (error) {
      alert("Error submiting the review, try it again later");
      console.error(error);
    }
  };
}

//!Favoritos
export function setFav(update, user_id) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_PUT_ADD_FAVORITE}${user_id}`, update);
    } catch (error) {
      alert("Error adding to favorites!");
      console.error(error);
    }
  };
}
