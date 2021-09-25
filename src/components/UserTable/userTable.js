import React, { Component } from 'react';
import MenuBar from "./../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { LoginContext } from '../../Context/LoginContext.js';
import './userTable.css';


class UserTable extends React.Component{
    static contextType = LoginContext;
    
    
    constructor(props){
        super(props);
        this.state={
            dPI: null,
            full_name: '',
            nacionalidad:'',
            fecha_nacimiento: null,
            sexo: null,
            enfermedad: false,
            trabajo: null,
            userinfo: [],
            trabajos: [],
            es_usuario: 0
        }

        this.register=this.register.bind(this);
        this.getData=this.getData.bind(this);
        this.deleteData=this.deleteData.bind(this);
    }


    register(){
        const url = 'http://localhost/scripts/admin.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dPI);
        formData.append('nombre', this.state.full_name);
        formData.append('nacionalidad', this.state.nacionalidad);
        formData.append('fecha_nacimiento', this.state.fecha_nacimiento);
        formData.append('sexo', this.state.sexo);
        formData.append('trabajo', this.state.trabajo);

        axios.post(url, formData)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
        console.log(this.state.dPI);
        console.log(this.state.full_name);
        console.log(this.state.nacionalidad);
        console.log(this.state.fecha_nacimiento);
        console.log(this.state.sexo);
        console.log(this.state.trabajo);
    }

    getData(){
        const url = 'http://localhost/scripts/admin.php';

        axios.get(url, {params: {dpi: this.state.dPI}}).then(response => response.data)
        .then((data) => {
           this.setState({userInfo: data[0]});
           this.setState({
            dPI: this.state.userInfo.dpi,
            full_name: this.state.userInfo.nombre_completo,
            nacionalidad:this.state.userInfo.nacionalidad,
            fecha_nacimiento: this.state.userInfo.fecha_nacimiento,
            sexo: this.state.userInfo.genero,
            enfermedad: false,
            trabajo: this.state.userInfo.trabajo,
            es_usuario: this.state.userInfo.es_usuario
        })
           console.log(this.state.userInfo);
           console.log(this.state.es_usuario);
        }).catch(function (response) {
            console.log(response);
        });
    }

    deleteData(){
        const url = 'http://localhost/scripts/admin2.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dPI);

        axios.post(url, formData)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
    }
    
    componentDidMount(){

        const context = this.context;

        const url = 'http://localhost/scripts/trabajos.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({trabajos: data});
               
                console.log(this.state.trabajos);
        });
   
    }
    
    render(){
        return(
            <div className="data">
                <MenuBar/>
                <Card className="data_form" mt={5}>
                <CardContent className="content">
                    <div className="register-data">
                    <h2>Búsqueda de Usuarios</h2>
                    <div className="searchbar">
                        <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} name="dpi"/>
                        <Button id="search1" onClick={this.getData}><SearchIcon/></Button>
                    </div>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="text-together">
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} inputProps={{ readOnly: true,  }} InputLabelProps={{shrink: true }} value={this.state.dPI}/>
                            <hr/>
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})}  value={this.state.full_name}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <TextField className="outlined-required" label="Nacionalidad" type="text" variant="outlined" onInput={e=>this.setState({nacionalidad: e.target.value})}  value={this.state.nacionalidad}/>    
                            <hr/>
                            <TextField className="outlined-required" label="Fecha de Nacimiento" type="date" variant="outlined" onChange={e=>this.setState({fecha_nacimiento: e.target.value})} value={this.state.fecha_nacimiento} InputLabelProps={{shrink: true }}/>
                        </Grid>
                        <Grid item className="text-together">
                            <FormControl id="genero1" variant ="outlined">
                                <InputLabel>Sexo</InputLabel>
                                <Select label="Sexo" displayEmpty onChange={e=>this.setState({sexo: e.target.value})} value={this.state.sexo}>
                                    <MenuItem value="M">M</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </FormControl>       
                            <hr/>
                            <TextField className="outlined-required3" label="Enfermedad Crónica"  variant="outlined" onInput={e=>this.setState({enfermedad: e.target.value})}  value={this.state.enfermedad}/>
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
                    </Grid>
                    </div>
                </CardContent>
                <CardActions className="action">
                    <Button id="send1" variant="contained" onClick={this.register}>Actualizar los datos</Button>
                    <Button id={this.state.es_usuario==1? "send2" : "nosend"} variant="contained" onClick={this.deleteData}>Eliminar Usuario</Button>
                </CardActions>
                </Card>
            </div>
        );
    }
}

export default UserTable;