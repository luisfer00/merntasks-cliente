import { useReducer } from "react"
import axiosClient from "../../config/axios"
import { FORMULARIO_PROYECTO, OBTENER_PROYECTO, AGREGAR_PROYECTO, PROYECTO_ERROR, MOSTRAR_ERROR, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from "../../types"
import proyectoContext from "./proyectoContext"
import proyectoReducer from "./proyectoReducer"

const ProyectoState = (props) => {
    const initialState = {
        formulario: false,
        proyectos: [],
        errorFormulario: false,
        proyecto: {},
        mensaje: null
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    const showForm = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const getProjects = async () => {
        try {
            const data = (await axiosClient.get('/api/proyectos')).data
            dispatch({
                type: OBTENER_PROYECTO,
                payload: data
            })
        } catch (e) {
            const alerta = {
                msj: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const addProject = async (proyecto) => {
        try {
            const data = (await axiosClient.post('/api/proyectos', proyecto)).data
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: data
            })
        } catch (e) {
            const alerta = {
                msj: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    const mostrarError = () => {
        dispatch({
            type: MOSTRAR_ERROR
        })
    }

    const selectProyecto = (id) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: id
        })
    }
    const eliminarProyecto = async (id) => {
        try {
            await axiosClient.delete(`/api/proyectos/${id}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: id
            })
        } catch (e) {
            const alerta = {
                msj: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    
    return (
        <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorFormulario: state.errorFormulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,
            showForm,
            getProjects,
            addProject,
            mostrarError,
            selectProyecto,
            eliminarProyecto
        }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState