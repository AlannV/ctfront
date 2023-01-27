import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

import "../../Styles/Login.css";

const { REACT_APP_IS_ADMIN } = process.env;

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    Lastname: "",
    email: "",
    password: "",
  });

  const [emailPassword, setEmailPassword] = useState(false);

  const [error, setError] = useState();

  const navigate = useNavigate();

  const { logIn, loginGoogle, resetPassword } = useAuth();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(user.email, user.password);
      const credentials = window.localStorage.getItem("token");
      const isAdmin = await axios.post(REACT_APP_IS_ADMIN, {
        token: credentials,
      });
      isAdmin.data ? navigate("/adminMenu") : navigate("/");

      //navigate("/adminmenu");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("El correo es inexistente");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña inválida");
      }
      // setError(error.message)
    }
  };
  const handleGoogleSignIn = async () => {
    await loginGoogle();
    navigate("/");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setEmailPassword(!emailPassword);
  };
  const handleSendResetPassword = async (e) => {
    if (!user.email) return setError("Porfavor ingrese un email");
    try {
      await resetPassword(user.email);
      setEmailPassword(!emailPassword);
      alert(
        "Hemos enviado un mail, revisa tu bandeja de entrada o en su defecto la de spam"
      );
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <div className="login--container">
      {emailPassword ? (
        <div className="Reset--Contaner">
          <input
            id="Login-email"
            className="login--input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <div className="login--buttons-container">
            <button
              className="login--button"
              onClick={(e) => handleSendResetPassword(e)}
            >
              SEND EMAIL
            </button>
            <button className="login--button" onClick={handleResetPassword}>
              CANCEL
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="login--title">LOGIN</h1>
          <form className="login--form" onSubmit={(e) => handleSubmit(e)}>
            <div className="login--container--email">
              <label name="Email">EMAIL</label>
              <input
                id="Login-email"
                className="login--input"
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="login--container--password">
              <label name="Password">PASSWORD</label>
              <input
                id="Login-password"
                className="login--input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="login--buttons-container">
              <button className="login--button" type="submit">
                LOGIN
              </button>
              <button
                className="login--button"
                onClick={(e) => handleGoogleSignIn(e)}
              >
                LOGIN WITH GOOGLE
              </button>
            </div>

            <div className="login--user--buttons">
              <Link className="login--user--button" to="/register">
                SIGN UP
              </Link>
              <button
                className="login--user--button"
                onClick={handleResetPassword}
              >
                FORGOT YOUR PASSWORD
              </button>
            </div>
          </form>
          {error && <p className="errorLogin">{error}</p>}
        </div>
      )}
    </div>
  );
}
