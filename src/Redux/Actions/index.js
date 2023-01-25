import axios from "axios";
import {
  FILTER_BY_STATUS,
  FILTER_BY_MAIL,
  GET_GENRES,
  GET_LANGUAGES,
  GET_DISPLAYS,
  RESET_SEARCH,
  GET_SEATS,
  GET_CLOUDINARY_IMG,
  GET_REVIEWS,
  GET_HISTORY_BY_EMAIL,
  GET_ALL_PURCHASES,
} from "../action-types";

const {
  REACT_APP_GET_ALL_PURCHASES,
  REACT_APP_PUT_PURCHASE,
  REACT_APP_GET_ALL_GENRES,
  REACT_APP_GET_ALL_LANGUAGES,
  REACT_APP_GET_ALL_DISPLAYS,
  REACT_APP_GET_ALL_SEATS,
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_GET_MOVIE_REVIEW_BY_ID,
  REACT_APP_POST_CREATE_REVIEW,
  REACT_APP_POST_RECIEVED_CONTACT,
  REACT_APP_POST_SENT_CONTACT,
  REACT_APP_PUT_ADD_FAVORITE,
  REACT_APP_PUT_CHANGE_PASSWORD,
  REACT_APP_POST_PAYMENT,
  REACT_APP_GET_PURCHASE_BY_MAIL,
} = process.env;

export function getAllPurchases(email) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${REACT_APP_GET_ALL_PURCHASES}${email}`);
      return dispatch({ type: GET_ALL_PURCHASES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function filterByStatus(payload) {
  return {
    type: FILTER_BY_STATUS,
    payload,
  };
}

export function filterByMail(payload) {
  return {
    type: FILTER_BY_MAIL,
    payload,
  };
}

export function updatePurchase(id, status) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_PUT_PURCHASE}${id}`, {
        status: status,
      });
      alert("Status modified");
    } catch (error) {
      alert("Error");
      console.error(error);
    }
  };
}

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

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
  };
};

export function getSeats() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_SEATS);
      return dispatch({ type: GET_SEATS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

// CLOUDINARY ACTIONS

export async function fileUpload(file) {
  if (!file) throw new Error("No files to upload");
  const formData = new FormData();
  formData.append("upload_preset", "cinema");
  formData.append("file", file);

  try {
    const resp = await fetch(REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("Cannot upload file");
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.error(error);
  }
}

export function startUploadingFiles(payload) {
  return async function (dispatch) {
    try {
      let response = await fileUpload(payload[0]);
      dispatch({
        type: GET_CLOUDINARY_IMG,
        payload: response,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

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

// MAILS CONTACT
export function recievedContact(input) {
  return async function () {
    try {
      return await axios.post(REACT_APP_POST_SENT_CONTACT, input);
    } catch (error) {
      console.error(error);
    }
  };
}

export function sentContact(input) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_RECIEVED_CONTACT, input);
    } catch (error) {
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

//! Change password
export function changePassword(update) {
  return async function () {
    try {
      await axios.put(REACT_APP_PUT_CHANGE_PASSWORD, update);
    } catch (error) {
      console.error(error);
    }
  };
}

//!payment
export function postPayment(input) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_PAYMENT, input);
    } catch (error) {
      alert("Error procesing the payment");
      console.error(error);
    }
  };
}

// PURCHASES HISTORY

export function getPurchasesByEmail(email) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${REACT_APP_GET_PURCHASE_BY_MAIL}${email}`
      );
      return dispatch({ type: GET_HISTORY_BY_EMAIL, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}
