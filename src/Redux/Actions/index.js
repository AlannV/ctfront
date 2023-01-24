import {
  GET_MOVIES,
  GET_MOVIE_DETAIL,
  GET_MOVIE_NAME,
  DEL_MOVIE_DETAIL,
  DEL_MOVIES_FILTERED,
  FILTER_MOVIES,
  COMING_SOON,
  GET_ALL_SCHEDULE,
  GET_SCHEDULE_BY_MOVIE,
  GET_SCHEDULE_BY_ID,
  GET_ALL_PURCHASES,
  FILTER_BY_STATUS,
  FILTER_BY_MAIL,
  GET_ALL_MOVIES,
  GET_GENRES,
  GET_LANGUAGES,
  GET_DISPLAYS,
  RESET_SEARCH,
  GET_PRODUCTS,
  GET_ALL_USERS,
  GET_ROOMS,
  GET_SEATS,
  GET_SCHEDULES,
  RESET_SCHEDULE_BY_MOVIE,
  DEL_SCHEDULE,
  GET_CLOUDINARY_IMG,
  GET_REVIEWS,
  GET_HISTORY_BY_EMAIL,
} from "../action-types";

import axios from "axios";

const {
  REACT_APP_GET_ALL_MOVIES,
  REACT_APP_GET_MOVIE_BY_NAME,
  REACT_APP_GET_SCHEDULES_BY_MOVIE,
  REACT_APP_GET_SCHEDULE_BY_ID,
  REACT_APP_GET_ALL_PURCHASES,
  REACT_APP_PUT_PURCHASE,
  REACT_APP_GET_ALL_GENRES,
  REACT_APP_GET_ALL_LANGUAGES,
  REACT_APP_GET_ALL_DISPLAYS,
  REACT_APP_POST_CREATE_MOVIE,
  REACT_APP_PUT_UPDATE_MOVIE,
  REACT_APP_DELETE_MOVIE,
  REACT_APP_PUT_ACTIVATE_MOVIE,
  REACT_APP_GET_ALL_PRODUCTS,
  REACT_APP_POST_CREATE_PRODUCT,
  REACT_APP_DELETE_PRODUCT,
  REACT_APP_PUT_ACTIVATE_PRODUCT,
  REACT_APP_PUT_EDIT_PRODUCT,
  REACT_APP_POST_CREATE_USER_ADMIN,
  REACT_APP_PUT_MODIFY_USER_ROLE,
  REACT_APP_GET_ALL_USERS,
  REACT_APP_PUT_BAN_USER,
  REACT_APP_PUT_UNBAN_USER,
  REACT_APP_POST_RESET_USER_PASSWORD,
  REACT_APP_DELETE_USER,
  REACT_APP_POST_CREATE_ROOM,
  REACT_APP_PUT_EDIT_ROOM,
  REACT_APP_DELETE_ROOM,
  REACT_APP_ACTIVATE_ROOM,
  REACT_APP_GET_ALL_ROOMS,
  REACT_APP_GET_ALL_SEATS,
  REACT_APP_GET_ALL_SCHEDULES,
  REACT_APP_POST_CREATE_SCHEDULE,
  REACT_APP_DELETE_SCHEDULE,
  REACT_APP_ACTIVATE_SCHEDULE,
  REACT_APP_CLOUDINARY_URL,
  REACT_APP_GET_MOVIE_REVIEW_BY_ID,
  REACT_APP_POST_CREATE_REVIEW,
  REACT_APP_POST_RECIEVED_CONTACT,
  REACT_APP_POST_SENT_CONTACT,
  REACT_APP_POST_NEW_USER,
  REACT_APP_PUT_ADD_FAVORITE,
  REACT_APP_PUT_CHANGE_PASSWORD,
  REACT_APP_POST_PAYMENT,
  REACT_APP_GET_PURCHASE_BY_MAIL,
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

//SCHEDULES ACTIONS

export function getAllSchedule() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_SCHEDULES);
      return dispatch({ type: GET_ALL_SCHEDULE, payload: response.data[0] });
    } catch (error) {
      console.error(error);
    }
    return;
  };
}

export function getScheduleByMovie(movieId) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `${REACT_APP_GET_SCHEDULES_BY_MOVIE}${movieId}`
      );
      return dispatch({
        type: GET_SCHEDULE_BY_MOVIE,
        payload: response.data[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getScheduleById(Id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${REACT_APP_GET_SCHEDULE_BY_ID}${Id}`);

      return dispatch({ type: GET_SCHEDULE_BY_ID, payload: response.data });
    } catch (error) {
      console.error(error);
    }
    return;
  };
}

// PURCHASES ADMIN ACTIONS

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

// MOVIES ADMIN ACTIONS

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

// REACT_APP_GET_ALL_GENRES;

export function getGenres() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_GENRES);
      return dispatch({ type: GET_GENRES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getLanguages() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_LANGUAGES);
      return dispatch({ type: GET_LANGUAGES, payload: response.data });
    } catch (error) {}
  };
}

export function getDisplays() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_DISPLAYS);
      return dispatch({ type: GET_DISPLAYS, payload: response.data });
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

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
  };
};

// PRODUCT ADMIN ACTIONS

export function getProducts() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_PRODUCTS);
      return dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createProduct(payload) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_CREATE_PRODUCT, payload);
      alert("Product created!");
    } catch (error) {
      alert("Error creating the product");
      console.error(error);
    }
  };
}

export function deleteProduct(id) {
  return async function () {
    try {
      await axios.delete(`${REACT_APP_DELETE_PRODUCT}${id}`);
      alert("Product deactivated!");
    } catch (error) {
      alert("Error deactivating the product");
      console.error(error);
    }
  };
}

export function activateProduct(id) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_PUT_ACTIVATE_PRODUCT}${id}`);
      alert("Product activated!");
    } catch (error) {
      alert("Error deactivating the product");
      console.error(error);
    }
  };
}

export function editProduct(id, payload) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_PUT_EDIT_PRODUCT}${id}`, payload);
      alert("Product edited!");
    } catch (error) {
      alert("Product not found!");
      console.error(error);
    }
  };
}

// USER ADMIN ACTIONS

export function createUser(payload) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_CREATE_USER_ADMIN, payload);
      alert("User created!");
    } catch (error) {
      alert("Error creating user");
      console.error(error);
    }
  };
}

export function modifyRole(payload) {
  return async function () {
    try {
      await axios.put(REACT_APP_PUT_MODIFY_USER_ROLE, payload);
      alert("Role modified!");
    } catch (error) {
      alert("Error modifiying the role of the user");
      console.error(error);
    }
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_USERS);
      return dispatch({ type: GET_ALL_USERS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

export function banUser(email) {
  return async function () {
    try {
      await axios.put(REACT_APP_PUT_BAN_USER, email);
      alert("User banned");
    } catch (error) {
      alert("Error banning user");
      console.error(error);
    }
  };
}

export function unBanUser(email) {
  return async function () {
    try {
      await axios.put(REACT_APP_PUT_UNBAN_USER, email);
      alert("The user is now active");
    } catch (error) {
      alert("User Not Found!");
      console.error(error);
    }
  };
}

export function resetUserPassword(payload) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_RESET_USER_PASSWORD, payload);
      alert("Password reseted!");
    } catch (error) {
      alert("Error reseting password");
      console.error(error);
    }
  };
}

export function deleteUser(payload) {
  return async function () {
    try {
      await axios.delete(REACT_APP_DELETE_USER, payload);
      alert("User deleted");
    } catch (error) {
      alert("Error deleting user");
      console.error(error);
    }
  };
}

// ROOMS ACTIONS

export function createRoom(payload) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_CREATE_ROOM, payload);
      alert("Room Created");
    } catch (error) {
      alert("Error creating the room");
      console.error(error);
    }
  };
}

export function editRoom(id, payload) {
  return async function () {
    try {
      await axios.put(`${REACT_APP_PUT_EDIT_ROOM}${id}`, payload);
      alert("Room edited!");
    } catch (error) {
      alert("Error editing the room");
      console.error(error);
    }
  };
}

export function deleteRoom(id) {
  return async function () {
    try {
      await axios.delete(`${REACT_APP_DELETE_ROOM}${id}`);
      alert("Room eliminated");
    } catch (error) {
      alert("Error deleting the room");
      console.error(error);
    }
  };
}

export function activateRoom(id) {
  return async function () {
    try {
      await axios.delete(`${REACT_APP_ACTIVATE_ROOM}${id}`);
      alert("Room activated");
    } catch (error) {
      alert("Room Not Activated");
      console.error(error);
    }
  };
}

export function getRooms() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_ROOMS);
      return dispatch({ type: GET_ROOMS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
}

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

// SCHEDULES ADMIN ACTIONS

export function getSchedules() {
  return async function (dispatch) {
    try {
      let response = await axios.get(REACT_APP_GET_ALL_SCHEDULES);
      return dispatch({ type: GET_SCHEDULES, payload: response.data[0] });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createSchedule(payload) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_CREATE_SCHEDULE, payload);
      alert("Schedule Created");
    } catch (error) {
      alert("Error creating the schedule");
      console.error(error);
    }
  };
}

export function deleteSchedule(payload) {
  return async function () {
    try {
      await axios.delete(
        `${REACT_APP_DELETE_SCHEDULE}${payload.schedule_id}`,
        payload
      );
      alert("Schedule Deleted");
    } catch (error) {
      alert("Error deleting the schedule");
      console.error(error);
    }
  };
}

export function activateSchedule(payload) {
  payload = { ...payload, active: true };
  return async function () {
    try {
      await axios.put(REACT_APP_ACTIVATE_SCHEDULE, payload);
      alert("Schedule Updated");
    } catch (error) {
      alert("Error activating the schedule");
      console.error(error);
    }
  };
}

export function resetSchedule() {
  return {
    type: RESET_SCHEDULE_BY_MOVIE,
  };
}

export function delSchedule() {
  return {
    type: DEL_SCHEDULE,
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

export function newUser(input) {
  return async function () {
    try {
      await axios.post(REACT_APP_POST_NEW_USER, input);
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
