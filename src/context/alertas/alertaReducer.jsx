import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types"

export default function alertaReducer (state, action) {
    switch(action.type){
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        default:
            return state
    }
}