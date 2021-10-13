import React, { Component } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import { LoginContext } from '../../Context/LoginContext.js';
import './agregarP.scss';


class AgregarP extends React.Component{
    static contextType = LoginContext;
    
    
    constructor(props){
        super(props);
        this.state={
            dPI: null,
            full_name: '',
            nacionalidad:'',
            fecha_nacimiento: null,
            sexo: null,
            enfermedad: 0,
            trabajo: 0,
            userinfo: [],
            trabajos: [],
            telefono: '',
            correo: '',
            enfermedades: [],
            es_usuario: 0,
            extito: false,
            error: false
        }

        this.register=this.register.bind(this);
    }


    register=()=>{
        const url = 'http://localhost/scripts/poblacion.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dPI);
        formData.append('nombre', this.state.full_name);
        formData.append('nacionalidad', this.state.nacionalidad);
        formData.append('fecha_nacimiento', this.state.fecha_nacimiento);
        formData.append('sexo', this.state.sexo);
        formData.append('trabajo', this.state.trabajo);
        formData.append('enfermedad', this.state.enfermedad);
        formData.append('telefono', this.state.telefono);
        formData.append('correo', this.state.correo);

        axios.post(url, formData)
        .then((response)=>{
            console.log(response);
            this.setState({exito: true,
            error: false});
        })
        .catch( (response)=> {
            console.log(response);
            this.setState({exito: false,
            error: true})
        });
        
        this.setState({
            dPI: '',
            full_name: '',
            nacionalidad:'',
            fecha_nacimiento: '',
            sexo: '',
            enfermedad: 0,
            trabajo: 0,
            telefono: '',
            correo: '',
        })
    }

    

    
    componentDidMount(){

        const context = this.context;

        const url = 'http://localhost/scripts/trabajos.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({trabajos: data});
               
                console.log(this.state.trabajos);
        });

        const url2 = 'http://localhost/scripts/enfermedades.php';

        axios.get(url2).then(response => response.data)
             .then((data) => {
                this.setState({enfermedades: data});
               
                console.log(this.state.enfermedades);
        });
   
    }
    
    render(){
        return(
            <div className="new">
                <Card className="data_form" mt={5}>
                <CardContent className="content">
                    <div className="register-data">
                    <h2>Ingreso Manual de personas</h2>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="text-together">
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} InputLabelProps={{shrink: true }} value={this.state.dPI}/>
                            <hr/>
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})}  value={this.state.full_name}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <TextField className="outlined-required" label="Nacionalidad" type="text" variant="outlined" onInput={e=>this.setState({nacionalidad: e.target.value})}  value={this.state.nacionalidad}/>    
                            <hr/>
                            <TextField className="outlined-required" label="Fecha de Nacimiento" type="date" variant="outlined" onChange={e=>this.setState({fecha_nacimiento: e.target.value})} value={this.state.fecha_nacimiento} InputLabelProps={{shrink: true }}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <TextField className="outlined-required" label="Correo" type="email" variant="outlined" onInput={e=>this.setState({correo: e.target.value})}  value={this.state.correo}/>    
                            <hr/>
                            <TextField className="outlined-required" label="Teléfono" type="number" variant="outlined" onChange={e=>this.setState({telefono: e.target.value})} value={this.state.telefono}/>
                        </Grid>
                        <Grid item className="text-together">
                            <FormControl id="genero2" variant ="outlined">
                                <InputLabel>Sexo</InputLabel>
                                <Select label="Sexo" displayEmpty onChange={e=>this.setState({sexo: e.target.value})} value={this.state.sexo}>
                                    <MenuItem value="M">M</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </FormControl>       
                            <hr/>
                            <FormControl className="outlined-required3" variant ="outlined" >
                                <InputLabel InputLabelProps={{shrink: true }}>Enfermedad</InputLabel>
                                <Select label="Enfermedad" displayEmpty onChange={e=>this.setState({enfermedad: e.target.value})} value={this.state.enfermedad} >
                                    {this.state.enfermedades.map((enf)=>(
                                        <MenuItem key={enf.id_enfermedad} value={enf.id_enfermedad}  /*type="number"*/>{enf.nombre_descripcion}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> 
                            <hr/>
                            <FormControl className="outlined-required3" variant ="outlined" >
                                <InputLabel InputLabelProps={{shrink: true }}>Profesión</InputLabel>
                                <Select label="Profesión" displayEmpty onChange={e=>this.setState({trabajo: e.target.value})} value={this.state.trabajo} >
                                    {this.state.trabajos.map((trab)=>(
                                        <MenuItem key={trab.id_profesion} value={trab.id_profesion}  type="number">{trab.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> 
                        </Grid>
                        <Alert severity="success" id={this.state.exito? "exito_p": "no_exito_p"}>Persona Ingresada correctamente</Alert>
                        <Alert severity="error" id={this.state.error? "error_p": "no_error_p"}>Error: no se pudo ingresar a la persona</Alert>
                    </Grid>
                    
                    </div>
                </CardContent>
                <CardActions className="action">
                   
                    <Button id="add1" variant="contained" onClick={this.register}>Añadir Persona</Button>
                </CardActions>
                </Card>
            </div>
        );
    }
}

export default AgregarP;