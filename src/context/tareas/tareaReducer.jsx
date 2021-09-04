import { MOSTRAR_TAREAS, ELIMINAR_TAREAS, ELIMINAR_TAREA, EDITAR_TAREA, AGREGAR_TAREA, VALIDAR_FORMULARIO, ESTADO_TAREA, TAREA_ACTUAL, EDITAR_TEXTO } from "../../types";


export default function tareaReducer (state, action) {
    switch(action.type){
        case MOSTRAR_TAREAS:
            return {
                ...state,
                tareasProyecto: action.payload
            }
        case ELIMINAR_TAREAS:
            return {
                ...state,
                tareasProyecto: []
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
            }
        case EDITAR_TAREA:
            return {
                ...state,
                tareaSeleccionada: {}
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto: [...state.tareasProyecto, action.payload]
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorNombre: action.payload
            }
        case ESTADO_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => {
                    if(tarea._id !== action.payload) return tarea
                    return {
                        ...tarea,
                        completada: tarea.completada ? false : true
                    }
                })
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case EDITAR_TEXTO:
            return {
                ...state,
                tareaSeleccionada: {
                    ...state.tareaSeleccionada,
                    nombre: action.payload
                }
            }
        default:
            return state
    }
}