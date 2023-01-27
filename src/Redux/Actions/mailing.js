import axios from "axios";

const { REACT_APP_POST_RECIEVED_CONTACT, REACT_APP_POST_SENT_CONTACT } =
  process.env;

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
