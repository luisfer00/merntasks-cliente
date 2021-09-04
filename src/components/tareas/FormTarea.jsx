import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    const [ nombre, setNombre ] = useState('')

    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(tareaContext)
    const {proyecto} = proyectosContext
    const {agregarTarea, errorFormulario, errorNombre, mostrarTareas} = tareasContext
    if(Object.keys(proyecto).length === 0) return null

    const crearTarea = async (e) => {
        e.preventDefault()
        if(!nombre.trim()) {
            errorFormulario(true)
            return
        }
        errorFormulario(false)
        await agregarTarea({
            nombre,
            proyecto: proyecto._id
        })
        await mostrarTareas(proyecto._id)
        setNombre('')
    }
    return (
        <div className="formulario">
            <form onSubmit={crearTarea}>
                <div className="contenedor-input">
                    <input type="text" className="input-text" value={nombre} onChange={(e) => setNombre(e.target.value)} name="nombre" placeholder="Nombre Tarea"/>
                </div>
                <div className="contenedor-input">
                    <input type="submit" className="btn btn-primario btn-submit btn-block" value="Crear Tarea"/>
                </div>
            </form>
            {errorNombre ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTarea