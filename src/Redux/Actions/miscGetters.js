import axios from "axios";

import {
  GET_GENRES,
  GET_LANGUAGES,
  GET_SEATS,
  GET_DISPLAYS,
} from "../action-types";

const {
  REACT_APP_GET_ALL_GENRES,
  REACT_APP_GET_ALL_LANGUAGES,
  REACT_APP_GET_ALL_DISPLAYS,
  REACT_APP_GET_ALL_SEATS,
} = process.env;

export function getGenres() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_GENRES);
      response = response.data.map((g) => g.name);
      return dispatch({ type: GET_GENRES, payload: response });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getLanguages() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_LANGUAGES);
      response = response.data.map((l) => l.name);

      return dispatch({ type: GET_LANGUAGES, payload: response });
    } catch (error) {}
  };
}

export function getDisplays() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_DISPLAYS);
      response = response.data.map((d) => d.name);
      return dispatch({ type: GET_DISPLAYS, payload: response });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getSeats() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_SEATS);
      response = response.data.map((s) => s.name);
      return dispatch({ type: GET_SEATS, payload: response });
    } catch (error) {
      console.error(error);
    }
  };
}
