import { useState } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import { newUser } from "../../Redux/Actions/user";
import { useDispatch } from "react-redux";

import "../../Styles/Register.css";
import { passwordValidator } from "../helpers/PasswordValidator";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState();

  const navigate = useNavigate();
  const { signUp } = useAuth();
  const dispatch = useDispatch();

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
      if (passwordValidator(user.password, user.confirmPassword)) {
        let register = await signUp(user.email, user.password, user.name);
        console.log(register);
        dispatch(newUser({ name: user.name, email: user.email }));
        //ToDo: Validar credencials y admin en esta instancia
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      if (error.code === "auth/invalid-email") {
        setError("Correo inválido");
      }
      if (error.code === "auth/weak-password") {
        setError("Contraseña inválida");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Usuario ya registrado");
      }
    }
  };
  return (
    <div className="login--container">
      <h1 className="login--title">REGISTER</h1>
      <form className="login--form" onSubmit={(e) => handleSubmit(e)}>
        <div className="login--container--email">
          <label name="Name">USERNAME</label>
          <input
            id="Register-name"
            name="name"
            type="text"
            className="login--input"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="login--container--email">
          <label name="Email">EMAIL</label>
          <input
            id="Register-email"
            name="email"
            type="email"
            className="login--input"
            placeholder="email@email.com"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <label>
          Here is your clue for password: - At least 6 characters <br />
          - At least 1 uppercase
          <br />
          - At least 1 lowercase
          <br />
          - At least 1 number
          <br />- At least 1 special character (#?!@$%^&*-)
        </label>
        <div className="login--container--password">
          <label name="Password">PASSWORD</label>
          <input
            id="Register-password"
            name="password"
            type="password"
            className="login--input"
            placeholder="6 to 15 characters"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="login--container--password">
          <label name="Password">CONFIRM PASSWORD</label>
          <input
            id="Register-password"
            name="confirmPassword"
            type="password"
            className="login--input"
            placeholder="6 to 15 characters"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="login--button" type="submit">
          REGISTER NOW
        </button>
      </form>
      {error && <p className="errorLogin">{error}</p>}
    </div>
  );
}
