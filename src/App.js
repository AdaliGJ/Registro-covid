import Login from "./components/Login/login";
import DataRegister from "./components/DataRegister/dataregister";
import UsersTable from "./components/Users/users";
import Register from "./components/Register/register";
import Home from "./components/Information/home";
import Contact from "./components/Information/contact";
import Information from "./components/Information/information";
import News from "./components/Information/news";
import {Route, BrowserRouter as Router, Switch, Link, Redirect} from "react-router-dom";
import {LoginContext} from "./Context/LoginContext.js";
import UserData from "./components/EmpleadosSalud/empleado-salud";
import React, {useState} from 'react';

function App() {

  const[username, setUsername] = useState(null);
  const[tipoUsuario, setTipoUsuario]=useState(null);

  return (
    
    <Router>
      <div className="App">
        <LoginContext.Provider value={{username, setUsername, setTipoUsuario, tipoUsuario}}> 
        {username ?  <Switch> 
            <Route exact path="/register-data" component={DataRegister}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/information" component={Information}/>
            <Route exact path="/news" component={News}/>
            <Route exact path="/health-employees" component={UserData}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>:
          <Switch> 
            <Route exact path="/register" component={Register}/>
            <Route exact path="/register-data" component={DataRegister}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/information" component={Information}/>
            <Route exact path="/news" component={News}/>
            <Route exact path="/health-employees" component={UserData}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>}
        </LoginContext.Provider>  
    </div>
    </Router>

  );
}

export default App;
