import axios from "axios";

import {
  FILTER_BY_STATUS,
  FILTER_BY_MAIL,
  GET_HISTORY_BY_EMAIL,
  GET_ALL_PURCHASES,
} from "../action-types";

const {
  REACT_APP_GET_ALL_PURCHASES,
  REACT_APP_PUT_PURCHASE,
  REACT_APP_POST_PAYMENT,
  REACT_APP_GET_PURCHASE_BY_MAIL,
} = process.env;

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
