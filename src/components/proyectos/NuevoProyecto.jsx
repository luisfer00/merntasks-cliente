import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {
    const proyectosContext = useContext(proyectoContext)
    const {formulario, showForm, addProject, errorFormulario, mostrarError} = proyectosContext

    const [proyecto, setProyecto] = useState({
        nombre: ''
    })
    const {nombre} = proyecto
    const onChangeProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitProyecto = (e) => {
        e.preventDefault()
        if(!nombre) {
            mostrarError()
            return
        }
        addProject(proyecto)
        setProyecto({
            nombre: ''
        })
    }

    return (
        <>
        <button type="button" onClick={(e) => showForm()} className="btn btn-block btn-primario">Nuevo Proyecto</button>
        {
            formulario ?
            (<form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
            <input type="text" onChange={onChangeProyecto} value={nombre} name="nombre" id="nombre" placeholder="Nombre Proyecto" className="input-text" autoFocus/>
            <input type="submit" value="Agregar Proyecto" className="btn btn-primario btn-block"/>
            </form>) :
            null
        }
        {errorFormulario ?
        <p className="mensaje error">El nombre del proyecto es obligatorio</p> :
        null}
        </>
    )
}

export default NuevoProyecto