import React from 'react';
import MenuBar from "./../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { LoginContext } from '../../Context/LoginContext.js';
import { Alert } from '@material-ui/lab';
import './dataregister.scss'
import { Link } from 'react-router-dom';


class DataRegister extends React.Component{
    static contextType = LoginContext;
    
    constructor(props){
        super(props);
        this.state={
            dPI: null,
            full_name: '',
            nacionalidad:'',
            email1: '',
            email2: '',
            tel1: '',
            tel2: '',
            fecha_nacimiento: '',
            sexo: '',
            enfermedad: false,
            trabajo: '',
            centro_vacunacion: null,
            centros: [],
            userinfo: [], 
            exito: false
        }

        this.mySubmit=this.mySubmit.bind(this);
        this.register=this.register.bind(this);
    }


    mySubmit(event){
        console.log('this is the submit ' + this.state.dPI);
        console.log('this is the submit ' + this.state.full_name);
        console.log('this is the submit ' + this.state.email1);
        console.log('this is the submit ' + this.state.tel1);
    }

    register(){
        const url = 'http://localhost/scripts/registrar_datos.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dPI);
        formData.append('tel1', this.state.tel1);
        formData.append('tel2', this.state.tel2);
        formData.append('email1', this.state.email1);
        formData.append('email2', this.state.email2);
        formData.append('centro', this.state.centro_vacunacion);

        axios.post(url, formData)
        .then((response)=> {
            this.setState({
                exito: true
            });
            this.setState({
                dpi: null,
                full_name: '',
                nacionalidad: '',
                email1: '',
                email2: '',
                tel1: '',
                tel2: '',
                fecha_nacimiento: '',
                sexo: '',
                enfermedad: '',
                trabajo: '',
                centro_vacunacion: null,
            });
            console.log(response);
        })
        .catch((response)=>{
            console.log(response);
            this.setState({
                exito: false
            });
        });
        console.log(this.state.centro_vacunacion);
    }

    
    componentDidMount(){

        const context = this.context;
        this.setState({dPI: context.username});
        console.log(this.state.dPI);

        const url = 'http://localhost/scripts/centros.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({centros: data});
                console.log(this.state.centros);
        });

        const url2 = 'http://localhost/scripts/datos_persona.php';
        axios.get(url2, {params: {dpi: context.username}}).then(response => response.data)
         .then((data) => {
            this.setState({userinfo: data[0]});
            this.setState({
                full_name: this.state.userinfo.nombre_completo,
                nacionalidad: this.state.userinfo.nacionalidad,
                email1: this.state.userinfo.email1,
                email2: this.state.userinfo.email2,
                tel1: this.state.userinfo.tel1,
                tel2: this.state.userinfo.tel2,
                fecha_nacimiento: this.state.userinfo.fecha_nacimiento,
                sexo: this.state.userinfo.genero,
                enfermedad: this.state.userinfo.enfermedad,
                trabajo: this.state.userinfo.profesion,
            });
            context.setTipoUsuario(this.state.userinfo.tipo_usuario);
            if(this.state.userinfo.tel1==this.state.userinfo.tel2){
                this.setState({
                    tel2: ''
                });
            }
            if(this.state.userinfo.email1==this.state.userinfo.email2){
                this.setState({
                    email2: ''
                });
            }
            console.log(this.state.userinfo);
    });

        
    }
    
    render(){
        return(
            <div className="data">
                <MenuBar/>
                <Card className="data_form" mt={5}>
                <CardContent className="content">
                    <div className="register-data">
                    <h2>Regístrese para vacunarse</h2>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="text-together">
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} inputProps={{ readOnly: true, }} defaultValue={this.context.username}/>
                            <hr/>
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})} inputProps={{ readOnly: true}} value={this.state.full_name}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <TextField className="outlined-short" label="Email" /*type="email"*/ variant="outlined" onInput={e=>this.setState({email1: e.target.value})}  value={this.state.email1}/>
                            <hr/>
                            <TextField className="outlined-short" label="Email 2 (opcional)" /*type="email"*/ variant="outlined" onInput={e=>this.setState({email2: e.target.value})} value={this.state.email2}/>
                        </Grid>
                            <Grid item className="text-together">
                            <TextField className="outlined-required" label="Teléfono" type="number" variant="outlined" onInput={e=>this.setState({tel1: e.target.value})} inputProps={{ shrink: true}} value={this.state.tel1}/>
                            <hr/>
                            <TextField className="outlined-short" label="Teléfono 2 (opcional)" type="number" variant="outlined" onInput={e=>this.setState({tel2: e.target.value})} value={this.state.tel2}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <TextField className="outlined-required" label="Nacionalidad" type="text" variant="outlined" onInput={e=>this.setState({nacionalidad: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.nacionalidad}/>    
                            <hr/>
                            <TextField className="outlined-required" label="Fecha de Nacimiento"  variant="outlined" onInput={e=>this.setState({fecha_nacimiento: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.fecha_nacimiento}/>
                        </Grid>
                        <Grid item className="text-together">
                            <FormControl id="genero" variant ="outlined">
                                <InputLabel>Sexo</InputLabel>
                                <Select label="Sexo" displayEmpty onSelect={e=>this.setState({sexo: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.sexo}>
                                    <MenuItem value="M">M</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </FormControl>       
                            <hr/>
                            <TextField className="outlined-required3" label="Enfermedad Crónica"  variant="outlined" onInput={e=>this.setState({enfermedad: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.enfermedad}/>
                            <hr/>
                            <TextField className="outlined-required3" label="Trabajo"  variant="outlined" onInput={e=>this.setState({trabajo: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.trabajo}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <FormControl id="centro" variant ="outlined">
                                <InputLabel>Centro de Vacunación</InputLabel>
                                <Select  label="Centro de Vacunación" displayEmpty onChange={e=>this.setState({centro_vacunacion: e.target.value})} type="number">
                                    {this.state.centros.map((centro)=>(
                                        <MenuItem key={centro.id_puesto} value={centro.id_puesto}>{centro.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>      
                        </Grid>
                         
                        <Alert severity="success" id={this.state.exito ? "data_success": "no_data_success"}>Usuario Ingresado Exitosamente ir a <Link to="/home">Inicio</Link></Alert>
                       
                    </Grid>
                    </div>
                </CardContent>
                <CardActions className="action">
                    <Button id={this.state.exito?"nosend":"send"} variant="contained" onClick={this.register}>Registrar mis datos</Button>
                </CardActions>
                </Card>
            </div>
        );
    }
}

export default DataRegister;