import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";

const NuevaCuenta = (props) => {
  const [cargando, setCargando] = useState(false);
  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const authsContext = useContext(authContext);
  const { registrarUsuario, mensaje, autenticado } = authsContext;

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { nombre, email, password, repeatPassword } = usuario;

  useEffect(() => {
    setCargando(false);
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msj, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const onChangeForm = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      !nombre.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }
    if (password !== repeatPassword) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }
    setCargando(true);
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>
        <form onSubmit={onSubmitForm}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              value={nombre}
              name="nombre"
              id="nombre"
              placeholder="Tu nombre"
              onChange={onChangeForm}
            />
          </div>
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
            <label htmlFor="repeatPassword">Repite Contraseña</label>
            <input
              type="password"
              value={repeatPassword}
              name="repeatPassword"
              id="repeatPassword"
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
              value={cargando ? "Cargando..." : "Registrarse"}
              className="btn btn-primario btn-block"
              disabled={cargando}
            />
          </div>
        </form>
        <Link to="/login" className="enlace-cuenta">
          Volver a Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
