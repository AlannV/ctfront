import {
  GET_MOVIES,
  GET_MOVIE_DETAIL,
  GET_MOVIE_NAME,
  DEL_MOVIE_DETAIL,
  DEL_MOVIES_FILTERED,
  FILTER_MOVIES,
  COMING_SOON,
  GET_ALL_MOVIES,
} from "../action-types";
import axios from "axios";
const {
  REACT_APP_POST_CREATE_MOVIE,
  REACT_APP_PUT_UPDATE_MOVIE,
  REACT_APP_DELETE_MOVIE,
  REACT_APP_PUT_ACTIVATE_MOVIE,
  REACT_APP_GET_ALL_MOVIES,
  REACT_APP_GET_MOVIE_BY_NAME,
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
