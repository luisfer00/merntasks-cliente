import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import ListadoProyectos from '../proyectos/ListadoProyectos'
import NuevoProyecto from '../proyectos/NuevoProyecto'

const Sidebar = () => {
    const proyectosContext = useContext(proyectoContext)
    const { proyectos, getProjects } = proyectosContext
    useEffect(() => {
        getProjects()
        // eslint-disable-next-line
    }, [])
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NuevoProyecto />
            
            <div className="proyectos">
                {proyectos.length !== 0 ?
                <h2>Tus Proyectos</h2> :
                <h2>No hay Proyectos</h2>}
                <ListadoProyectos />
            </div>
        </aside>
    )
}

export default Sidebar