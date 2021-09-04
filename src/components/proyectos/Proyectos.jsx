import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import authContext from '../../context/auth/authContext'
import Barra from '../layout/Barra'
import Sidebar from '../layout/Sidebar'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

const Proyectos = () => {
    const { autenticado, cargando, obtenerUsuarioAutenticado } = useContext(authContext)
    useEffect(() => {
        obtenerUsuarioAutenticado()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="contenedor-app">
            {!autenticado && !cargando ? <Redirect to='/'/> : 
            (<><Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div></>)}
            
        </div>
    )
}

export default Proyectos