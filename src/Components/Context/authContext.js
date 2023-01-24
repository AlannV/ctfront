import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../Firebase/FirebaseAuth";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  // const user = {
  // login: true
  // }
  const [authUser, setAuthUser] = useState(null);
  // const [accessToken, setAccessToken]= useState("")

  const signUp = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
        user
          .getIdToken()
          .then((idToken) => {
            window.localStorage.setItem("token", idToken);
            const newUser = {
              email: email,
              token: idToken,
              username: name,
              role: "B",
            };
            axios
              .post("http://localhost:3001/users/createUser", newUser)
              .then((res) => {
                setAuthUser({
                  email: newUser.email,
                  name: newUser.name,
                  token: idToken,
                });
                if (res.status === 201) {
                  console.log("Usuario creado");
                } else if (res.status === 400 || res.status === 500) {
                  console.log("Usuario no creado, verificar");
                  console.log(res.data.message);
                }
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }
    );
  };
  const logIn = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then(({ user }) => user.accessToken);
    if (window.localStorage.getItem("token")) {
      window.localStorage.removeItem("token");
    }
    window.localStorage.setItem("token", credentials);
  };
  const logOut = () => {
    signOut(auth);
    window.localStorage.clear();
  };

  const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then(({ user }) => {
      axios.get("http://localhost:3001/users/getAll").then((res) => {
        const emailRef = res.data.filter(
          (fbUser) => fbUser.email === user.email
        );
        if (emailRef.length === 0) {
          const newUser = {
            email: user.email,
            token: user.accessToken,
            username: user.displayName,
            role: "B",
          };
          axios
            .post("http://localhost:3001/users/createUser", newUser)
            .then((res) => {
              if (res.status === 201) {
                setAuthUser({
                  email: newUser.email,
                  name: newUser.username,
                  token: newUser.token,
                });
                window.localStorage.setItem("token", newUser.token);
              } else {
                logOut();
              }
            });
        } else {
          setAuthUser({
            email: user.email,
            token: user.accessToken,
            name: user.displayName,
          });
          window.localStorage.setItem("token", user.accessToken);
        }
      });
    });
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (currentUser) => {
        setAuthUser(currentUser);
      },
      []
    );
  });
  return (
    <authContext.Provider
      value={{
        signUp,
        logIn,
        authUser,
        logOut,
        loginGoogle,
        setAuthUser,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
