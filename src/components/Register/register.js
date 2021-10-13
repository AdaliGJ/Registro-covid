import React, {useState, useRef, useContext} from 'react';
import {LoginContext} from "../../Context/LoginContext.js";
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';
import './register.scss'
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuBar from "./../AppBar/appBar.js";


function Register(){

    const { setUsername, setTipoUsuario }=useContext(LoginContext);
    const[error, setError]=useState(false);
    const[admin, setAdmin]=useState(false);
    const[mensaje, setMensaje]=useState(''); 
    const[userType, setUserType]=useState(null);
    const[password_admin, setPassword_admin]=useState('');


    const usuarioRef = useRef(null);
    const contRef = useRef(null);
    const cont2Ref = useRef(null);
    const adminpassword = useRef('');


    const history = useHistory();
     

    const mySubmit=(event)=>{
        const url = 'http://localhost/scripts/signup.php';


        console.log('this is the submit ' + usuarioRef.current.value);
        console.log('this is the submit ' + contRef.current.value);
        console.log('this is the submit ' + cont2Ref.current.value);
        console.log('this is the submit ' + userType);

        let formData = new FormData();
        formData.append('dpi_usuario', usuarioRef.current.value);
        formData.append('clave', contRef.current.value);
        formData.append('tipo_usuario', userType);
        if(userType==3){
            formData.append('pass', adminpassword.current.value);
        }

        if(contRef.current.value===cont2Ref.current.value){
        axios.post(url, formData)
        .then(function (response) {
            console.log(response)
            setUsername(usuarioRef.current.value);
            history.push('/register-data');
        })
        .catch(function (response) {
            console.log(response);
            setError(true);
            setMensaje('Error: No se puede ingresar este usuario');
        });
        
        }else{
            setError(true);
            console.log("Error: Contraseñas no coinciden");
            setMensaje("Error: Contraseñas no coinciden");
        }

        

        console.log(error);
    }

    
        return(
            <div className="register">
            <MenuBar/>
                <Card className="register_form" mt={5}>
                <CardContent className="content">
                <div className="content-register">
                    <h1>Registro</h1>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <TextField className="standard-basic" label="Nombre de usuario" type="number" placeholder="DPI" InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon/>
                                </InputAdornment>
                                ),
                            }} inputRef={usuarioRef}/>
                        </Grid>
                        <Grid item>
                            <TextField className="standard-basic" label="Contraseña" type="password"  InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                                ),
                            }} inputRef={contRef}/>
                        </Grid>
                        <Grid item>
                            <TextField className="standard-basic" label="Repetir Contraseña" type="password"  InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                                ),
                            }} inputRef={cont2Ref}/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl id="tipo_usuario">
                            <InputLabel id="demo-simple-select-helper-label">Tipo de usuario</InputLabel>
                            <Select  id="demo-simple-select-helper" label="Tipo de usuario" displayEmpty onChange={e=>setUserType(e.target.value)}>
                                <MenuItem value={3}>Administrador</MenuItem>
                                <MenuItem value={2}>Empleado</MenuItem>
                                <MenuItem value={1}>Usuario</MenuItem>
                            </Select>
                        </FormControl>
                  </Grid>
                  <Grid item id="standard-admin">
                        {userType == 3 ?
                            <TextField className="standard-basic" label="Contraseña Administrador" type="password"  InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                                ),
                            }} inputRef={adminpassword}/>
                                :<Alert severity="info" id={userType==2? "mensaje_emp": "no_mensaje_emp"}>Será registrado como usuario hasta que el administrador revise su solicitud</Alert>
                            }
                  </Grid>
                  </div>
                </CardContent>
                <CardActions>
                    <Grid container direction={"column"} spacing={1}>
                        <Grid item id={error ? "error": "noerror"}>
                            <Alert severity="error">{mensaje}</Alert>
                        </Grid>
                        <Grid item>
                            <Button id="enviar" variant="contained" onClick={mySubmit}>Registrarse</Button>
                        </Grid>
                        <Grid item>
                            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
                        </Grid>
                    </Grid>
                </CardActions>
                </Card>
            </div>
        );
    
}

export default Register;