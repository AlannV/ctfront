import { ContactSupportOutlined } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

import "../LoginCart/LoginCart.css";

export default function LoginCart({ state }) {
  const [user, setUser] = useState({
    name: "",
    Lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const navigate = useNavigate();

  const { logIn, loginGoogle } = useAuth();

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
      const isAdmin = await axios.post("http://localhost:3001/users/isAdmin", {
        token: credentials,
      });
      navigate("/cart");

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
    navigate("/cart");
  };
  return (
    <div className={state + " login--container"}>
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
          <Link className="login--user--button" to="/">
            FORGOT YOUR PASSWORD?
          </Link>
        </div>
      </form>
      {error && <p className="errorLogin">{error}</p>}
    </div>
  );
}
