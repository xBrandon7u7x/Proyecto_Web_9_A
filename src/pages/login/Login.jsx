import axios from "axios";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 7000);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Iniciar Sesión</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Nombre de Usuario</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Ingresa tu usuario"
          ref={userRef}
        />
        <label>Contraseña</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Ingresar tu contraseña"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Iniciar Sesión
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </form>
      
    </div>
  );
}
