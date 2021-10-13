import React from 'react';
import MenuBar from "../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Footer from '../Footer/footer.js';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import './habilitar.scss'


class Habilitar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            exito: false,
            simbolo: '',
            parametro: null,
            trabajos: [],
            enfermedades: [],
            fecha: '',
            enfermedad: null,
            trabajo: null,
            igual: "="
        }

        
        this.getTrabajos=this.getTrabajos.bind(this);
        this.getEnfermedades=this.getEnfermedades.bind(this);
        this.submitYear=this.submitYear.bind(this);
        this.submitEnfermedad=this.submitEnfermedad.bind(this);
        this.submitTrabajo=this.submitTrabajo.bind(this);
    }


    submitYear=()=>{
        const url = 'http://localhost/scripts/habilitar_usuarios.php';

        console.log(this.state.fecha);
        let formData = new FormData();
        
        formData.append('parametro', this.state.parametro);
        formData.append('fecha', this.state.fecha);//set
        formData.append('simbolo', this.state.simbolo);


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

    submitEnfermedad=()=>{
        console.log(this.state.igual);
        console.log(this.state.enfermedad);

        const url = 'http://localhost/scripts/habilitar_usuarios.php';

        console.log(this.state.fecha);
        let formData = new FormData();
        
        formData.append('parametro', this.state.parametro);
        formData.append('enfermedad', this.state.enfermedad);//set
        

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

    submitTrabajo=()=>{
        console.log(this.state.igual);
        console.log(this.state.trabajo);
        console.log(this.state.parametro);


        const url = 'http://localhost/scripts/habilitar_usuarios.php';


        let formData = new FormData();
        
        formData.append('parametro', this.state.parametro);
        formData.append('trabajo', this.state.trabajo);//set
        

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

    getTrabajos=()=>{
        const url = 'http://localhost/scripts/profesiones.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({trabajos: data})
                console.log(this.state.trabajos)
        });
    }

    getEnfermedades=()=>{
        const url = 'http://localhost/scripts/enfermedades.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({enfermedades: data})
                console.log(this.state.enfermedades)
        });
    }

    

    componentDidMount(){
        this.getTrabajos();
        this.getEnfermedades();
        
    }


    
    render(){
        return(
            <div className="habilitar">
                <MenuBar/>
                <Card className="habilitar_form" mt={5}>
                <CardContent className="content">
                <div className="habilitar-data">
                    <h2>Escoja un parámetro de habilitación de usuarios</h2>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="together">    
                            <FormControl className='outlined-required' variant ="outlined">
                                <InputLabel>Parámetro</InputLabel>
                                <Select label="Parámetro" displayEmpty onChange={e=>this.setState({parametro: e.target.value})} value={this.state.parametro}>
                                    <MenuItem value="1">Fecha de nacimiento</MenuItem>
                                    <MenuItem value="2">Trabajo</MenuItem>
                                    <MenuItem value="3">Enfermedad</MenuItem>
                                </Select>
                            </FormControl>  
                        </Grid>
                        <Grid item className="together">    
                            <Alert severity="success" id={this.state.exito ? "habilitar_success": "no_habilitar_success"}>Operación Realizada Exitosamente</Alert>
                        </Grid>
                           
                            {this.state.parametro=="1"?
                            <div>
                                <Grid item className="together"> 
                                    <FormControl className='outlined-short' variant ="outlined">
                                        <InputLabel>Es</InputLabel>
                                        <Select label="Es" displayEmpty onChange={e=>this.setState({simbolo: e.target.value})} value={this.state.simbolo}>
                                            <MenuItem value="=">=</MenuItem>
                                            <MenuItem value=">">{'>'}</MenuItem>
                                            <MenuItem value="<">{'<'}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <hr/> 
                                    <TextField className="outlined-short" type="month" onChange={e=>this.setState({fecha: e.target.value})} value={this.state.fecha} variant="outlined" />
                                </Grid> 
                                <Button id="sendYear" variant="contained" onClick={this.submitYear}>Habilitar para vacuna</Button>
                            </div>: 
                            <p className="none"></p> }

                            {this.state.parametro=="3"?
                            <div>
                                <Grid item className="together"> 
                                    <TextField className="outlined-short" type="text" value={this.state.igual} variant="outlined" inputProps={{readOnly: true}}/>
                                    <hr/> 
                                    <FormControl className='outlined-short' variant ="outlined">
                                        <InputLabel>Enfermedad</InputLabel>
                                        <Select label="Enfermedad" displayEmpty onChange={e=>this.setState({enfermedad: e.target.value})} value={this.state.enfermedad}>
                                            {this.state.enfermedades.map((enf)=>(
                                                <MenuItem key={enf.id_enfermedad} value={enf.id_enfermedad}  type="number">{enf.nombre_descripcion}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Button id="sendEnf" variant="contained" onClick={this.submitEnfermedad}>Habilitar para vacuna</Button>
                            </div>: 
                            <p className="none"></p> }

                            {this.state.parametro=="2"?
                            <div>
                                <Grid item className="together"> 
                                    <TextField className="outlined-short" type="text" value={this.state.igual} variant="outlined" inputProps={{readOnly: true}}/>
                                    <hr/> 
                                    <FormControl className='outlined-short' variant ="outlined">
                                        <InputLabel>Trabajo</InputLabel>
                                        <Select label="Trabajos" displayEmpty onChange={e=>this.setState({trabajo: e.target.value})} value={this.state.trabajo}>
                                            {this.state.trabajos.map((prof)=>(
                                                <MenuItem key={prof.id_profesion} value={prof.id_profesion}  type="number">{prof.sector_publico == "1"? prof.nombre + " -público":prof.nombre + " -privado"}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Button id="sendEnf" variant="contained" onClick={this.submitTrabajo}>Habilitar para vacuna</Button>
                            </div>: 
                            <p className="none"></p> }
                            
                    </Grid>
                    </div>
                </CardContent>
                </Card>
                <Footer/>
            </div>
        );
    }
}

export default Habilitar;