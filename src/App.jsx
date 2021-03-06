import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import AlertaState from './context/alertas/alertaState';
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/tareaState';
import AuthState from './context/auth/authState'
import tokenAuth from './config/tokenAuth';

const token = localStorage.getItem('token')

if(token) tokenAuth(token)

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/nueva-cuenta">
                  <NuevaCuenta />
                </Route>
                <Route exact path="/proyectos">
                  <Proyectos />
                </Route>
                <Route path="/">
                  <Redirect to="/login"/>
                </Route>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
