import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({tarea}) => {
    const [cambiarEstado, setCambiarEstado] = useState(false)
    const tareasContext = useContext(tareaContext)
    const {eliminarTarea, tareaActual, tareaSeleccionada, editarTexto, editarTarea, mostrarTareas } = tareasContext
    const { proyecto } = useContext(proyectoContext)
    
    const seleccionarTarea = (tarea) => {
        if(tareaSeleccionada._id === tarea._id) {
            guardarTarea()
            return
        }
        tareaActual(tarea)
    }
    const cambiarNombre = (e) => {
        editarTexto(e.target.value)
    }
    const guardarTarea = async () => {
        if (isEmpty()) return
        await editarTarea(tarea, tareaSeleccionada)
        await mostrarTareas(proyecto._id)
    }
    const handleEnter = (e) => {
        if(e.key !== 'Enter') return
        guardarTarea()
    }
    const isEmpty = () => {
        if(!tareaSeleccionada.nombre.trim()) return true
        return false
    }
    const removeTarea = async (id) => {
        await eliminarTarea(proyecto._id, id)
        await mostrarTareas(proyecto._id)
    }
    const handleEstadoTarea = async () => {
        setCambiarEstado(true)
        tarea.estado = tarea.estado ? false : true
        await editarTarea(tarea, tarea)
        setCambiarEstado(false)
        await mostrarTareas(proyecto._id)
    }
    return (
        <li className="tarea sombra">
            {((tareaSeleccionada._id === tarea._id) && (!cambiarEstado)) ?
            <input style={{width: '100%', maxWidth: '338px', margin: '16px 20px 16px 0'}} type="text" name="nombre" id="nombre" value={tareaSeleccionada.nombre} onChange={cambiarNombre} onKeyDown={handleEnter} autoFocus/> :
            <p>{tarea.nombre}</p>}
            <div className="estado">
                {tarea.estado ?
                <button type="button" className="completo" onClick={() => handleEstadoTarea()}>Completo</button> :
                <button type="button" className="incompleto" onClick={() => handleEstadoTarea()}>Incompleto</button>
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => {seleccionarTarea(tarea)}}>Editar</button>
                <button type="button" className="btn btn-secundario" onClick={() => removeTarea(tarea._id)}>Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea