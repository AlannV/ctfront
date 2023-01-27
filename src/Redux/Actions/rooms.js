import axios from "axios";
import { GET_ROOMS } from "../action-types";

const {
  REACT_APP_POST_CREATE_ROOM,
  REACT_APP_PUT_EDIT_ROOM,
  REACT_APP_DELETE_ROOM,
  REACT_APP_ACTIVATE_ROOM,
  REACT_APP_GET_ALL_ROOMS,
} = process.env;

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
