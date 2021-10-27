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
import { Box, Modal } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext.js';
import './empleado-salud.scss';

class VacunaAplicada extends Component{
    render(){
        return(
            <FormControl className="outlined-required-small" variant ="outlined">
                <InputLabel>Aplicada</InputLabel>
                <Select label="Aplicada" displayEmpty onChange={this.props.change} value={this.props.value}>
                    <MenuItem value={1}>Sí</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </Select>
            </FormControl> 
        );
    }
}


class UserData extends React.Component{
    static contextType = LoginContext;
    
    constructor(props){
        super(props);

        var today = new Date(),
        todayDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        console.log(todayDate);

        this.state={
            dPI: '',
            full_name: '',
            vacuna:'',
            primera_dosis: '',
            primera_aplicada: '',
            segunda_dosis: '',
            segunda_aplicada: '',
            tercera_dosis: '',
            tercera_aplicada: '',
            centro_vacunacion: '',
            id_vacuna: '',
            vacunas: [],
            userinfo: [],
            registrado: true,
            hoy: '',
            fecha_incorrecta: false,
            open: false,
            dosis: 1
        }

        this.handleOpen=this.handleOpen.bind(this);
        this.getData=this.getData.bind(this);
        this.updateData=this.updateData.bind(this);
        this.aceptar=this.aceptar.bind(this);
        this.getDosis=this.getDosis.bind(this);
      
    }

    getDosis=(vacuna)=>{
        this.setState({id_vacuna: vacuna});

        const url = 'http://localhost/scripts/vacunas_dosis.php';

        axios.get(url, {params: {vacuna: vacuna}}).then(response => response.data)
             .then((data) => {
                this.setState({dosis: data[0].dosis});
                console.log(data);
        });

    }

    handleOpen=()=>{
        this.setState({open: !this.state.open})  
   }

   aceptar=()=>{
       this.handleOpen();
       this.getData();
   }
   
    getData=()=>{
        const url = 'http://localhost/scripts/users.php';
        axios.get(url, {params: {dpi_usuario: this.state.dPI}}).then(response => response.data)
         .then((data) => {
            this.setState({userinfo: data[0]})
            if(this.state.userinfo!='1'){
                this.setState({
                    full_name: this.state.userinfo.nombre_completo,
                    primera_dosis: this.state.userinfo.fecha_primera_dosis,
                    primera_aplicada: this.state.userinfo.primera_dosis,
                    segunda_dosis: this.state.userinfo.fecha_segunda_dosis,
                    segunda_aplicada: this.state.userinfo.segunda_dosis,
                    tercera_dosis: this.state.userinfo.fecha_tercera_dosis,
                    tercera_aplicada: this.state.userinfo.tercera_dosis,
                    centro_vacunacion: this.state.userinfo.puesto_registro,
                    vacuna: this.state.userinfo.nombre_v,
                    id_vacuna: this.state.userinfo.vacuna,
                    hoy: this.state.userinfo.hoy,
                    registrado: true,
                    fecha_incorrecta: false,
                    dosis: this.state.userinfo.dosis
                });
                if(this.state.hoy != this.state.primera_dosis && this.state.hoy != this.state.segunda_dosis && this.state.hoy != this.state.tercera_dosis){
                    this.setState({
                       fecha_incorrecta: true
                    })
                }
            }else{
                this.setState({
                   dPI:'',
                    full_name: '',
                    primera_dosis: '',
                    primera_aplicada: '',
                    segunda_dosis: '',
                    segunda_aplicada: '',
                    tercera_dosis: '',
                    tercera_aplicada: '',
                    centro_vacunacion: '',
                    vacuna: '',
                    id_vacuna: '',
                    fecha_incorrecta: false,
                    registrado: false
                });
            } 
            
           

            console.log(this.state.userinfo);
            console.log(this.state.primera_dosis);
            console.log(this.state.hoy);
        });
    }

    updateData=()=>{
        const url = 'http://localhost/scripts/users.php';

        console.log(this.state.dPI);

        let formData = new FormData();
        var options = {content: formData[0]};
        formData.append('dpi_usuario', this.state.dPI);//set
        formData.append('fecha_primera_dosis', this.state.primera_dosis);
        formData.append('fecha_segunda_dosis', this.state.segunda_dosis);
        formData.append('fecha_tercera_dosis', this.state.tercera_dosis);
        formData.append('primera_dosis', this.state.primera_aplicada);
        formData.append('segunda_dosis', this.state.segunda_aplicada);
        formData.append('tercera_dosis', this.state.tercera_aplicada);
        formData.append('vacuna', this.state.id_vacuna);

        console.log(options);

        axios.post(url, formData)
        .then((response)=>{
            console.log(response);
            this.setState({open: true});
        })
        .catch((response)=>{
            console.log(response);
        });

        
        this.getData();
        
    }



    componentDidMount(){
        const url = 'http://localhost/scripts/vacunas.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({vacunas: data})
                console.log(this.state.vacunas)
        });
    }
    
    render(){
        return(
            <div className="data">
                <MenuBar/>
                <Card className="data_form" mt={5}>
                <CardContent className="content">
                    <div className="register-data">
                    <h2>Búsqueda de usuarios</h2>
                    <div className="searchbar">
                        <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} name="dpi"/>
                        <Button id="search" onClick={this.getData}><SearchIcon/></Button>
                    </div>
                    <Alert severity="error" id={this.state.registrado? "noerror": "error"}>Error, el usuario no está registrado</Alert>
                    <h4>Datos del usuario:</h4> 
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="text-together">
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.dPI}/>
                            <hr/>
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})} inputProps={{ readOnly: true}} value={this.state.full_name}/>
                        </Grid>
                        <Grid item className="text-together">
                            <TextField className="outlined-required" label="Centro de vacunacion" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} inputProps={{ readOnly: true, }} value={this.state.centro_vacunacion}/>
                            <hr/>
                            <FormControl className="outlined-required" variant ="outlined">
                                <InputLabel>Vacuna</InputLabel>
                                <Select label="Vacuna" displayEmpty onChange={e=>this.getDosis(e.target.value)} value={this.state.id_vacuna}>
                                    {this.state.vacunas.map((vac)=>(
                                        <MenuItem key={vac.id_vacuna} value={vac.id_vacuna}  type="number">{vac.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> 
                        </Grid> 
                        
                        <Grid item className="text-together">
                            <TextField className="outlined-required-large" label="Fecha Primera dosis" type="date" inputProps={{ readOnly: true, }} variant="outlined" onInput={e=>this.setState({primera_dosis: e.target.value})} InputLabelProps={{shrink: true }} value={this.state.primera_dosis}/>
                            <hr/>
                            <VacunaAplicada change={e=>this.setState({primera_aplicada: e.target.value})} value={this.state.primera_aplicada}/>
                        </Grid>
                        {this.state.dosis==2 || this.state.dosis==3?
                        <Grid item className="text-together">
                            <TextField className="outlined-required-large" label="Fecha Segunda dosis" type="date" inputProps={{ readOnly: true, }} variant="outlined" onInput={e=>this.setState({segunda_dosis: e.target.value})} InputLabelProps={{shrink: true }} value={this.state.segunda_dosis}/>
                            <hr/>
                            <VacunaAplicada change={e=>this.setState({segunda_aplicada: e.target.value})} value={this.state.segunda_aplicada}/>
                        </Grid>:null}
                        {this.state.dosis==3?
                        <Grid item className="text-together">
                            <TextField className="outlined-required-large" label="Fecha Tercera dosis" type="date" inputProps={{ readOnly: true, }} variant="outlined" onInput={e=>this.setState({tercera_dosis: e.target.value})} InputLabelProps={{shrink: true }} value={this.state.tercera_dosis}/>
                            <hr/>
                            <VacunaAplicada change={e=>this.setState({tercera_aplicada: e.target.value})} value={this.state.tercera_aplicada}/>
                        </Grid>:null}
                    </Grid>
                    </div>
                </CardContent>
                <CardActions className="action">
                    <Alert severity="error" id={this.state.fecha_incorrecta? "error": "noerror"}>Error, el usuario no está programado para vacunarse hoy</Alert>
                    <Button id={(this.state.fecha_incorrecta || !this.state.registrado) ? "noregistrar":"send" } variant="contained" onClick={this.updateData}>Registrar los cambios</Button>
                </CardActions>
                </Card>
                <Modal open={this.state.open} onClose={this.handleOpen}>
                    <Box className="success-box">
                    <Alert severity="success">Datos actualizados correctamente</Alert>
                    <Button id="success-accept" onClick={this.aceptar}>Aceptar</Button>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default UserData;