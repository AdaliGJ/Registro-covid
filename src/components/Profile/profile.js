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
import Alert from '@material-ui/lab/Alert';
import { LoginContext } from '../../Context/LoginContext.js';
import Checkbox  from '@material-ui/core/Checkbox';
import { FormControlLabel} from '@material-ui/core';
import './profile.scss'


class Profile extends React.Component{
    static contextType = LoginContext;
    
    constructor(props){
        super(props);
        this.state={
            dPI: null,
            tipo_usuario: null,
            full_name: '',
            nacionalidad:'',
            email1: '',
            email2: '',
            tel1: '',
            tel2: '',
            fecha_nacimiento: '',
            sexo: '',
            vacuna:'',
            primera_dosis: '',
            primera_aplicada: '',
            segunda_dosis: '',
            segunda_aplicada: '',
            tercera_dosis: '',
            tercera_aplicada: '',
            centro_vacunacion: '',
            enfermedad: '',
            trabajo: '',
            centro_vacunacion: '',
            userinfo: [],
            solicitud: null,
            enviada: false
        }

        this.solicitarPermiso=this.solicitarPermiso.bind(this);
        this.register=this.register.bind(this);
    
    }

    register=()=>{
        const url = 'http://localhost/scripts/perfil.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dPI);
        formData.append('tel1', this.state.tel1);
        formData.append('tel2', this.state.tel2);
        formData.append('email1', this.state.email1);
        formData.append('email2', this.state.email2);
        //formData.append('centro', null);

        axios.post(url, formData)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
        console.log(this.state.centro_vacunacion);
    }



    

    solicitarPermiso=()=>{
        const url = 'http://localhost/scripts/enviar_solicitud.php';

        let formData = new FormData();

        formData.append('dpi', this.state.dPI);
        formData.append('nombre', this.state.full_name);


        axios.post(url, formData)
        .then((response) => {
            console.log(response);
            this.setState({enviada: true, 
            solicitud: 1});
        })
        .catch( (response) =>{
            console.log(response);
            this.setState({enviada: false});
        });
    }

    
    componentDidMount(){

        const context = this.context;
        this.setState({dPI: context.username, 
        tipo_usuario: context.tipoUsuario});
        console.log(this.state.dPI);
        
        const url2 = 'http://localhost/scripts/eliminar_solicitudes.php';

        axios.get(url2, {params: {dpi: context.username}}).then(response => response.data)
            .then((data) => {
                this.setState({solicitud: data})
                console.log(data);
        });
        

        const url = 'http://localhost/scripts/perfil.php';
        axios.get(url, {params: {dpi: context.username}}).then(response => response.data)
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
                trabajo: this.state.userinfo.profesion,
                enfermedad: this.state.userinfo.enfermedad,
                primera_dosis: this.state.userinfo.fecha_primera_dosis,
                segunda_dosis: this.state.userinfo.fecha_segunda_dosis,
                tercera_dosis: this.state.userinfo.fecha_tercera_dosis,
                primera_aplicada: this.state.userinfo.primera_dosis,
                segunda_aplicada: this.state.userinfo.segunda_dosis,
                tercera_aplicada: this.state.userinfo.tercera_dosis,
                centro_vacunacion: this.state.userinfo.centro,
                vacuna: this.state.userinfo.nombre_vacuna
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
                    <div className="profile-data">
                    <h2>Datos de su usuario</h2>
                    <Grid container direction={"column"} spacing={3}>
                    {this.state.tipo_usuario==1 && this.state.solicitud!=1?
                    <Button id='env_sol' onClick={this.solicitarPermiso}>Solicitar permisos de Empleado</Button>
                    :null}
                    {this.state.enviada?
                        <Alert severity='success'>Solicitud Enviada Exitosamente</Alert>
                        :null}
                        <Grid item className="text-together">
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} inputProps={{ readOnly: true, }} defaultValue={this.context.username}/>
                            <hr/>
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})} inputProps={{ readOnly: true}} value={this.state.full_name}/>
                        </Grid>
                        <Grid item className="text-together">    
                            <TextField className="outlined-short" label="Email" /*type="email"*/ /*inputProps={{ readOnly: true, }}*/ variant="outlined" onInput={e=>this.setState({email1: e.target.value})}  value={this.state.email1}/>
                            <hr/>
                            <TextField className="outlined-short" label="Email 2 (opcional)" /*inputProps={{ readOnly: true, }}*/ InputLabelProps={{shrink: true }} /*type="email"*/ variant="outlined" onInput={e=>this.setState({email2: e.target.value})} value={this.state.email2}/>
                        </Grid>
                            <Grid item className="text-together">
                            <TextField className="outlined-required" label="Teléfono" type="number" variant="outlined"  /*inputProps={{ readOnly: true, }}*/ onInput={e=>this.setState({tel1: e.target.value})} inputProps={{ shrink: true}} value={this.state.tel1}/>
                            <hr/>
                            <TextField className="outlined-short" label="Teléfono 2 (opcional)" type="number" InputLabelProps={{shrink: true }} /*inputProps={{ readOnly: true, }}*/ variant="outlined" onInput={e=>this.setState({tel2: e.target.value})} value={this.state.tel2}/>
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
                            <TextField className="outlined-required" label="Centro de vacunacion" type="text" variant="outlined" onInput={e=>this.setState({centro_vacunacion: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.centro_vacunacion}/>
                            <hr/>
                            <TextField className="outlined-required" label="Vacuna" type="text" variant="outlined" onInput={e=>this.setState({vacuna: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.vacuna}/>
                        </Grid> 
                        <Grid item className="text-together">
                            <TextField className="outlined-required-large" label="Fecha Primera dosis" type="date" variant="outlined" onInput={e=>this.setState({primera_dosis: e.target.value})} inputProps={{ readOnly: true, }} InputLabelProps={{shrink: true }} value={this.state.primera_dosis}/>
                            <hr/>
                            <FormControlLabel disabled control={
                                <Checkbox change={e=>this.setState({primera_aplicada: e.target.value})} checked={this.state.primera_aplicada=="1"? true:false} value={this.state.primera_aplicada}/>
                            } label='Aplicada'/>
                        </Grid>
                        <Grid item className="text-together">
                            <TextField className="outlined-required-large" label="Fecha Segunda dosis" type="date" variant="outlined" onInput={e=>this.setState({segunda_dosis: e.target.value})} inputProps={{ readOnly: true, }} InputLabelProps={{shrink: true }} value={this.state.segunda_dosis}/>
                            <hr/>
                            <FormControlLabel disabled control={
                                <Checkbox change={e=>this.setState({segunda_aplicada: e.target.value})} checked={this.state.segunda_aplicada =="1"? true:false} value={this.state.segunda_aplicada} />
                            } label='Aplicada' inputProps={{ readOnly: true, }}/>
                        </Grid>
                        <Grid item className="text-together">
                            <TextField className="outlined-required-large" label="Fecha Tercera dosis" type="date" variant="outlined" onInput={e=>this.setState({tercera_dosis: e.target.value})} inputProps={{ readOnly: true, }} InputLabelProps={{shrink: true }} value={this.state.tercera_dosis}/>
                            <hr/>
                            <FormControlLabel disabled control={
                                <Checkbox change={e=>this.setState({tercera_aplicada: e.target.value})} checked={this.state.tercera_aplicada=="1"? true:false} value={this.state.tercera_aplicada}/>
                            } label='Aplicada'/>
                        </Grid>
                    </Grid>
                    </div>
                </CardContent>
                <CardActions className="action">
                    <Button id="send" variant="contained" onClick={this.register}>Actualizar mis datos de contacto</Button>
                </CardActions>
                </Card>
            </div>
        );
    }
}

export default Profile;