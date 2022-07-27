import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";

const Login = (props) => {
  const history = useHistory();
  const [cargando, setCargando] = useState(false);
  const { alerta, mostrarAlerta } = useContext(alertaContext);
  const { mensaje, autenticado, iniciarSesion } = useContext(authContext);
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const { email, password } = usuario;

  useEffect(() => {
    setCargando(false);
    if (autenticado) {
      history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msj, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado]);

  const onChangeForm = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    setCargando(true);
    if (!email.trim() || !password.trim())
      return mostrarAlerta(
        "Todos los campos deben estar llenos",
        "alerta-error"
      );
    iniciarSesion(usuario);
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesion</h1>
        <form onSubmit={onSubmitForm}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              placeholder="Tu Email"
              onChange={onChangeForm}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              placeholder="Tu Password"
              onChange={onChangeForm}
            />
          </div>
          <div className="campo-form">
            <input
              style={{
                opacity: cargando ? "0.6" : "1",
                cursor: cargando ? "not-allowed" : "pointer",
              }}
              type="submit"
              value={cargando ? "Cargando..." : "Iniciar Sesion"}
              className="btn btn-primario btn-block"
              disabled={cargando}
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
