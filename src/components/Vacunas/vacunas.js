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
import axios from 'axios';
import VacunasTabla from './vacunas-table.js';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './vacunas.scss'


class InsertVacunas extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nombre: '',
            laboratorio: '',
            dosis: '',
            dias: '',
            exito: false,
            vacunas: []
        }

        this.mySubmit=this.mySubmit.bind(this);
        this.getVacunas=this.getVacunas.bind(this);
    }

    mySubmit(){
        const url = 'http://localhost/scripts/vacunas.php';

        let formData = new FormData();
        formData.append('nombre', this.state.nombre);
        formData.append('laboratorio', this.state.laboratorio);
        formData.append('dosis', this.state.dosis);
        formData.append('dias', this.state.dias);



        axios.post(url, formData)
        .then((response) => {
            console.log(response);
            this.setState({exito: true});
        })
        .catch( (response) =>{
            console.log(response);
            this.setState({exito: false});
        });
        console.log(this.state.nombre);

        this.setState({
            nombre: '',
            laboratorio: '',
            dosis: '',
            dias: '',
        });

        this.getVacunas();
    }

    getVacunas=()=>{
        const url = 'http://localhost/scripts/catalogo_vacunas.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({vacunas: data})
                console.log(this.state.vacunas)
        });
    }

    componentDidMount(){
        this.getVacunas();
        
    }


    
    render(){
        return(
            <div className="vacuna">
                <MenuBar/>
                <Card className="vacunas_form" mt={5}>
                <CardContent className="content">
                <div className="vacunas-data">
                    <h2>Inserte una nueva vacuna</h2>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item className="together">    
                            <TextField className="outlined-short" label="Nombre Vacuna" type="text" variant="outlined" onInput={e=>this.setState({nombre: e.target.value})} value={this.state.nombre}/>
                            <hr/>
                            <TextField className="outlined-short" label="Laboratorio" type="text" variant="outlined" onInput={e=>this.setState({laboratorio: e.target.value})} value={this.state.laboratorio}/>
                        </Grid>
                        <Grid item className="together">
                            <FormControl className="outlined-short" variant ="outlined">
                                <InputLabel>Dosis</InputLabel>
                                <Select label="Dosis" displayEmpty onChange={e=>this.setState({dosis: e.target.value})}  value={this.state.dosis}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </FormControl>       
                           
                            <hr/>
                            <TextField className="outlined-short" label="Días siguiente dosis" type="number" variant="outlined" onInput={e=>this.setState({dias: e.target.value})} value={this.state.dias}/>
                        </Grid>
                        <Grid item className="together">    
                            <Alert severity="success" id={this.state.exito ? "vacuna_success": "no_vacuna_success"}>Vacuna Ingresada Exitosamente</Alert>
                        </Grid>
                    </Grid>
                    </div>
                </CardContent>
                <CardActions>
                    <Button id="sendVacuna" variant="contained" onClick={this.mySubmit}>Agregar Vacuna</Button>
                </CardActions>
                <VacunasTabla vacunas={this.state.vacunas} />
                </Card>
                <Footer/>
            </div>
        );
    }
}

export default InsertVacunas;