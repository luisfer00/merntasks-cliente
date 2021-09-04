import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) => {
    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(tareaContext)
    const { selectProyecto } = proyectosContext
    const { mostrarTareas } = tareasContext

    const showItems = (id) => {
        selectProyecto(id)
        mostrarTareas(id)
    }
    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={() => showItems(proyecto._id)}>
                {proyecto.nombre}
            </button>
        </li>
    )
}

export default Proyecto