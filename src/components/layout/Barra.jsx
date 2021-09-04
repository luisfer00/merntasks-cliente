import React, { useContext } from 'react'
import authContext from '../../context/auth/authContext'

const Barra = () => {
    const {usuario, cerrarSesion} = useContext(authContext)
    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button style={{color: 'white'}} className="btn btn-blank cerrar-sesion" onClick={() => cerrarSesion()}>Cerrar Sesion</button>
            </nav>
        </header>
    )
}

export default Barra