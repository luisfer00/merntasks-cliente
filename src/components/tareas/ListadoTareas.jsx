import React, { useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import Tarea from './Tarea'

const ListadoTareas = () => {
    const tareasContext = useContext(tareaContext)
    const { tareasProyecto, eliminarTareas } = tareasContext
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext

    if(Object.keys(proyecto).length === 0) return <h2>Selecciona un Proyecto</h2>
    
    const removeProyect = async (id) => {
        await eliminarTareas(id)
        await eliminarProyecto(id)
    }
    return (
        <>
        <h2>Proyecto: {proyecto.nombre}</h2>
        <ul className="listado-tareas">
            {tareasProyecto.length !== 0 ?
            <TransitionGroup>
                {tareasProyecto.map((tarea) => (
                    <CSSTransition
                    key={tarea._id}
                    timeout={200}
                    classNames="tarea">
                        <Tarea tarea={tarea}/>
                    </CSSTransition>
                ))}
            </TransitionGroup> :
            <li className="tarea">No Hay Tareas</li>}
        </ul>
        <button type="button" className="btn btn-eliminar" onClick={() => removeProyect(proyecto._id)}>Eliminar Proyecto &times;</button>
        </>
    )
}

export default ListadoTareas