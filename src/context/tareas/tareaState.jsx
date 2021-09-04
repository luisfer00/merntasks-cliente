import React, { useReducer } from 'react'
import { MOSTRAR_TAREAS, ELIMINAR_TAREAS, ELIMINAR_TAREA, EDITAR_TAREA, AGREGAR_TAREA, VALIDAR_FORMULARIO, ESTADO_TAREA, TAREA_ACTUAL, EDITAR_TEXTO } from '../../types'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import axiosClient from '../../config/axios'

const TareaState = (props) => {
    const initialState = {
        tareasProyecto: [],
        tareaSeleccionada: {},
        errorNombre: false
    }
    const [state, dispatch] = useReducer(tareaReducer, initialState)
    const mostrarTareas = async (proyectoId) => {
        try {
            const data = (await axiosClient.get(`/api/tareas/${proyectoId}`)).data
            dispatch({
                type: MOSTRAR_TAREAS,
                payload: data
            })
        } catch (e) {
            console.log(e)
        }
    }
    const eliminarTareas = async (proyectoId) => {
        try {
            await axiosClient.delete(`/api/tareas/${proyectoId}`)
            dispatch({
                type: ELIMINAR_TAREAS
            })
        } catch (e) {
            console.log(e)
        }
    }
    const agregarTarea = async (tarea) => {
        try {
            const data = (await axiosClient.post('/api/tareas', tarea)).data
            dispatch({
                type: AGREGAR_TAREA,
                payload: data
            })
        } catch (e) {
            console.log(e)
        }
    }
    const eliminarTarea = async (proyectoId, tareaId) => {
        try {
            await axiosClient.delete(`/api/tareas/${proyectoId}/${tareaId}`)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            })
        } catch (e) {
            console.log(e)
        }
    }
    const errorFormulario = (valido) => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: valido
        })
    }
    const estadoTarea = (id) => {
        dispatch({
            type: ESTADO_TAREA,
            payload: id
        })
    }
    const tareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    const editarTexto = (texto) => {
        dispatch({
            type: EDITAR_TEXTO,
            payload: texto
        })
    }
    const editarTarea = async (tarea, data) => {
        try {
            await axiosClient.put(`/api/tareas/${tarea._id}`, data)
            dispatch({
                type: EDITAR_TAREA
            })
        } catch (e) {
            
        }
    }
    return (
        <tareaContext.Provider
        value={{
            tareas: state.tareas,
            tareasProyecto: state.tareasProyecto,
            errorNombre: state.errorNombre,
            tareaSeleccionada: state.tareaSeleccionada,
            mostrarTareas,
            eliminarTareas,
            eliminarTarea,
            agregarTarea,
            errorFormulario,
            estadoTarea,
            tareaActual,
            editarTexto,
            editarTarea,
        }}>
            {props.children}
        </tareaContext.Provider>
    )
}
export default TareaState