import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const { REACT_APP_IS_ADMIN } = process.env;

export default function ProtectedRoute({ children }) {
  const [refresh, setRefresh] = useState(undefined);
  const { authUser } = useAuth();
  let token;
  authUser !== null
    ? (token = authUser.accessToken)
    : (token = window.localStorage.getItem("token"));

  if (token === null) {
    return <Navigate to="/" />;
  }

  const checkRoles = () => {
    axios
      .post(REACT_APP_IS_ADMIN, {
        token: token,
      })
      .then((res) => {
        setRefresh(res.data);
      });
  };

  if (refresh === undefined) {
    checkRoles();
  }

  if (refresh !== undefined) {
    if (refresh) {
      return <>{children}</>;
    } else {
      return <Navigate to="/" />;
    }
  }
}
