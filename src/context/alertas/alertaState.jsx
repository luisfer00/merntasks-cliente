import { useReducer } from "react"
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types"
import alertaContext from "./alertaContext"
import alertaReducer from "./alertaReducer"


const AlertaState = (props) => {
    const initialState = {
        alerta: null
    }
    const [state, dispatch] = useReducer(alertaReducer, initialState)

    const mostrarAlerta = (msj, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msj,
                categoria
            }
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }
    return (
        <alertaContext.Provider
        value={{
            alerta: state.alerta,
            mostrarAlerta
        }}>
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState