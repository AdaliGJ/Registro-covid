import Login from "./components/Login/login";
import DataRegister from "./components/DataRegister/dataregister";
import UserTable from "./components/UserTable/userTable";
import Register from "./components/Register/register";
import Home from "./components/Information/home";
import Contact from "./components/Information/contact";
import Information from "./components/Information/information";
import News from "./components/Information/news";
import {Route, BrowserRouter as Router, Switch, Link, Redirect} from "react-router-dom";
import {LoginContext} from "./Context/LoginContext.js";
import UserData from "./components/EmpleadosSalud/empleado-salud";
import React, {useState,useEffect} from 'react';
import InsertVacunas from "./components/Vacunas/vacunas";
import ImportUsers from "./components/ImportUsers/importUsers";
import Profile from "./components/Profile/profile";
import Habilitar from "./components/Habilitar/habilitar";
import Solicitudes from "./components/SolicitudesEmp/solicitudesemp";
import Options from "./components/Options/options";
import Reportes from "./components/Reportes/reportes";
import Actualizar from "./components/Actualizar/actualizar";
import EstadoProceso from "./components/EstadoVacunacion/estado-vacunacion";

function App() {

  const getUsername=()=>{
    const localUsername = localStorage.getItem('username');
    return localUsername ? JSON.parse(localUsername) : null;
  }

  const getTipoUsuario=()=>{
    const localTipoUsuario = localStorage.getItem('tipoUsuario');
    return localTipoUsuario ? JSON.parse(localTipoUsuario) : null;
  }


  const[username, setUsername] = useState(getUsername);
  const[tipoUsuario, setTipoUsuario]=useState(getTipoUsuario);

  useEffect(()=>{
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('tipoUsuario', JSON.stringify(tipoUsuario));
  })
  

  return (
    
    <Router>
      <div className="App">
        <LoginContext.Provider value={{username, setUsername, setTipoUsuario, tipoUsuario}}> 
        {tipoUsuario == 3 ?  <Switch> 
            <Route  path="/register-data" component={DataRegister}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/information" component={Information}/>
            <Route exact path="/news" component={News}/>
            <Route exact path="/vacunas" component={InsertVacunas}/>
            <Route exact path="/admin" component={UserTable}/>
            <Route exact path="/import-users" component={ImportUsers}/>
            <Route exact path='/mi-cuenta' component={Profile}/>
            <Route exact path='/habilitar-poblacion' component={Habilitar}/>
            <Route exact path='/solicitudes' component={Solicitudes}/>
            <Route exact path="/information-options" component={Options}/>
            <Route exact path="/reportes" component={Reportes}/>
            <Route exact path="/primera-dosis" component={Actualizar}/>
            <Route exact path="/mi-proceso" component={EstadoProceso}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>:
          tipoUsuario == 2 ? <Switch> 
            <Route  path="/register-data" component={DataRegister}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/information" component={Information}/>
            <Route exact path="/news" component={News}/>
            <Route exact path="/health-employees" component={UserData}/>
            <Route exact path='/mi-cuenta' component={Profile}/>
            <Route exact path="/mi-proceso" component={EstadoProceso}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>
          :
          tipoUsuario == 1 ? <Switch> 
            <Route  path="/register-data" component={DataRegister}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/information" component={Information}/>
            <Route exact path="/news" component={News}/>
            <Route exact path='/mi-cuenta' component={Profile}/>
            <Route exact path="/mi-proceso" component={EstadoProceso}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>
          :
          <Switch> 
            <Route exact path="/register" component={Register}/>
            <Route exact path="/register-data" component={DataRegister}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/information" component={Information}/>
            <Route exact path="/news" component={News}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>}
        </LoginContext.Provider>  
    </div>
    </Router>

  );
}

export default App;
