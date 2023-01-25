import axios from "axios";

import { GET_PRODUCTS } from "../action-types";

const {
  REACT_APP_GET_ALL_PRODUCTS,
  REACT_APP_POST_CREATE_PRODUCT,
  REACT_APP_DELETE_PRODUCT,
  REACT_APP_PUT_ACTIVATE_PRODUCT,
  REACT_APP_PUT_EDIT_PRODUCT,
} = process.env;

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
