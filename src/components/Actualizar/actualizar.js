import React from 'react';
import MenuBar from "../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Footer from '../Footer/footer.js';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import './actualizar.scss'


class Actualizar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            exito: false,
            centros: [],
            fecha: '',
            centro: null,
            parametro: "1"
        }

        
        this.getCentros=this.getCentros.bind(this);
        this.submitAll=this.submitAll.bind(this);
        this.submitCentro=this.submitCentro.bind(this);
    }


    submitAll=()=>{
        console.log(this.state.fecha);
        
        const url = 'http://localhost/scripts/actualizar_usuarios.php';

        console.log(this.state.fecha);
        let formData = new FormData();
        
        formData.append('parametro', this.state.parametro);
        formData.append('fecha', this.state.fecha);//set
      

        axios.post(url, formData)
        .then( (response)=> {
            console.log(response)
            this.setState({exito: true});
        })
        .catch((response)=> {
            console.log(response);
            this.setState({exito: false});
        });
    }


    submitCentro=()=>{
       
        console.log(this.state.centro);
        
        this.setState({exito: false});

        const url = 'http://localhost/scripts/actualizar_usuarios.php';


        let formData = new FormData();
        
        formData.append('parametro', this.state.parametro);
        formData.append('centro', this.state.centro);
        formData.append('fecha', this.state.fecha);//set
        

        axios.post(url, formData)
        .then( (response)=> {
            console.log(response)
            this.setState({exito: true});
        })
        .catch((response)=> {
            console.log(response);
            this.setState({exito: false});
        });
    }

    getCentros=()=>{
        const url = 'http://localhost/scripts/centros.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({centros: data})
                console.log(this.state.centros);
        });
    }

 
    

    componentDidMount(){
        this.getCentros();
        
    }


    
    render(){
        return(
            <div className="actualizar">
                <MenuBar/>
                <Card className="actualizar_form" mt={5}>
                <CardContent className="content">
                <div className="actualizar-data">
                    <h2>Asigne una fecha de primera dosis</h2>
                    <h5>¿Qué usuarios desea actualizar?</h5>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="together">    
                            <FormControl className='outlined-required' variant ="outlined">
                                <InputLabel>Parámetro</InputLabel>
                                <Select label="Parámetro" displayEmpty onChange={e=>this.setState({parametro: e.target.value})} value={this.state.parametro}>
                                    <MenuItem value="1">Todo el que no tenga fecha</MenuItem>
                                    <MenuItem value="2">Por centro de vacunación</MenuItem>
                                </Select>
                            </FormControl>  
                        </Grid>
                        <Grid item className="together" id={this.state.exito ? "actualizar_success": "no_actualizar_success"}>    
                            <Alert severity="success" >Operación Realizada Exitosamente</Alert>
                        </Grid>
                           
                            {this.state.parametro=="1"?
                            <div>
                                <Grid item className="together"> 
                                    <TextField className="outlined-required" type="date" onChange={e=>this.setState({fecha: e.target.value})} value={this.state.fecha} variant="outlined" />
                                </Grid> 
                                <Button id="sendAll" variant="contained" onClick={this.submitAll}>Asignar Fecha</Button>
                            </div>: 
                            <div>
                                <Grid item className="together">
                                    <FormControl className='outlined-short' variant ="outlined">
                                        <InputLabel>Centro de vacunación</InputLabel>
                                        <Select label="Centro de vacunación" displayEmpty onChange={e=>this.setState({centro: e.target.value})} value={this.state.centro}>
                                            {this.state.centros.map((centro)=>(
                                                <MenuItem key={centro.id_puesto} value={centro.id_puesto}  type="number">{centro.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <hr/>
                                    <TextField className="outlined-short" type="date" onChange={e=>this.setState({fecha: e.target.value})} value={this.state.fecha} variant="outlined" />
                                </Grid> 
                                <Button id="sendFecha" variant="contained" onClick={this.submitCentro}>Asignar Fecha</Button>
                            </div>}
                            
                    </Grid>
                    </div>
                </CardContent>
                </Card>
                <Footer/>
            </div>
        );
    }
}

export default Actualizar;