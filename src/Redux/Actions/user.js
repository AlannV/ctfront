import axios from "axios";
import { GET_ALL_USERS } from "../action-types";
const {
  REACT_APP_POST_CREATE_USER_ADMIN,
  REACT_APP_PUT_MODIFY_USER_ROLE,
  REACT_APP_GET_ALL_USERS,
  REACT_APP_PUT_BAN_USER,
  REACT_APP_PUT_UNBAN_USER,
  REACT_APP_POST_RESET_USER_PASSWORD,
  REACT_APP_DELETE_USER,
  REACT_APP_POST_NEW_USER,
  REACT_APP_PUT_CHANGE_PASSWORD,
} = process.env;

export function newUser(input) {
  console.log(input);
  return async function () {
    try {
      await axios.post(REACT_APP_POST_NEW_USER, input);
    } catch (error) {
      console.error(error);
    }
  };
}

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
