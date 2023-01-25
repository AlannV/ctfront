import {
  GET_ALL_SCHEDULE,
  GET_SCHEDULE_BY_MOVIE,
  GET_SCHEDULE_BY_ID,
  GET_SCHEDULES,
  RESET_SCHEDULE_BY_MOVIE,
  DEL_SCHEDULE,
} from "../action-types";

import axios from "axios";

const {
  REACT_APP_GET_SCHEDULES_BY_MOVIE,
  REACT_APP_GET_SCHEDULE_BY_ID,
  REACT_APP_GET_ALL_SCHEDULES,
  REACT_APP_POST_CREATE_SCHEDULE,
  REACT_APP_DELETE_SCHEDULE,
  REACT_APP_ACTIVATE_SCHEDULE,
} = process.env;

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
