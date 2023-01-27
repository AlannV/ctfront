import { GET_CLOUDINARY_IMG } from "../action-types";

import axios from "axios";

const { REACT_APP_CLOUDINARY_URL } = process.env;
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
