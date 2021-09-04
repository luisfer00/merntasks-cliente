import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import proyectoContext from '../../context/proyectos/proyectoContext'
import alertaContext from '../../context/alertas/alertaContext'
import Proyecto from './Proyecto'

const ListadoProyectos = () => {
    const {proyectos, mensaje} = useContext(proyectoContext)
    const {alerta, mostrarAlerta} = useContext(alertaContext)

    useEffect(() => {
        if(mensaje) mostrarAlerta(mensaje.msj, mensaje.categoria)
        // eslint-disable-next-line
    }, [mensaje])

    if(proyectos.lenght === 0) return null

    return (
        <ul className="listado-proyectos">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div> : null}
            <TransitionGroup>
                {proyectos.map((proyecto) => (
                <CSSTransition
                key={proyecto._id}
                timeout={200}
                classNames="proyecto">
                    <Proyecto proyecto={proyecto} />
                </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos