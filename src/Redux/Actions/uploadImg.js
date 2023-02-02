import { GET_CLOUDINARY_IMG } from "../action-types";
import axios from "axios";
const { REACT_APP_CLOUDINARY_URL } = process.env;

export async function fileUpload(file) {
  console.log("uploading file");
  if (!file) return alert("No files to upload");

  const formData = new FormData();
  formData.append("upload_preset", "cinema");
  formData.append("file", file);
  try {
    const cloudResponse = await axios.post(REACT_APP_CLOUDINARY_URL, formData);
    console.log("file upload success");
    return cloudResponse.data.secure_url;
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
