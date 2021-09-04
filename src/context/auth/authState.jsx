import { useReducer } from "react"
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types"
import authContext from "./authContext"
import authReducer from "./authReducer"

const AuthState = (props) => {
    const initialArgs = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }
    const [state, dispatch] = useReducer(authReducer, initialArgs)
    
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = (await axiosClient.post('/api/usuarios', datos)).data

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta
            })
            await obtenerUsuarioAutenticado()
        } catch (e) {
            const alerta = {
                msj: e.response.data.msj,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const obtenerUsuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        tokenAuth(token)
        try {
            const data = (await axiosClient.get('/api/auth')).data.usuario
            dispatch({
                type: OBTENER_USUARIO,
                payload: data
            })
        } catch (e) {
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }
    const iniciarSesion = async (datos) => {
        try {
            const data = (await axiosClient.post('/api/auth', datos)).data
            dispatch({
                type: LOGIN_EXITOSO,
                payload: data
            })
            obtenerUsuarioAutenticado()
        } catch (e) {
            const alerta = {
                msj: e.response.data.msj,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
        value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            obtenerUsuarioAutenticado,
            iniciarSesion,
            cerrarSesion
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState