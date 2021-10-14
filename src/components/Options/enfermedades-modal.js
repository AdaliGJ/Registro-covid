import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import './options.scss';



class  AddEnfermedad extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: false,
          nombre: '',
          parametro: null         
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.updateChanges=this.updateChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }


  
  updateChanges=()=>{
    const url = 'http://localhost/scripts/enfermedades.php';

        let formData = new FormData();
        formData.append('nombre', this.state.nombre);
        formData.append('parametro', this.state.parametro);

        axios.post(url, formData)
        .then((response) => {
            console.log(response);  
        })
        .catch( (response) =>{
            console.log(response); 
        });
        console.log(this.state.nombre);

        this.setState({
            nombre: '',
            parametro: null     
        });
    

    this.handleOpen();
  }


 componentDidMount(){
  const context = this.context;

 }

  render(){
    
  return (
    <div >
      <Button onClick={this.handleOpen} id="boton-modal-enfermedad">Agregar Enfermedad</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Escriba los datos de la nueva enfermedad</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField className="modalfield" label="Nombre" type="text" variant="outlined" onInput={e=>this.setState({nombre: e.target.value})}  value={this.state.nombre}/> 
            </Grid>
             <Grid item>
                <FormControl className='modalfield' variant ="outlined">
                    <InputLabel>Parámetro de vacunacion</InputLabel>
                    <Select label="Parámetro de vacunacion" displayEmpty onChange={e=>this.setState({parametro: e.target.value})} value={this.state.parametro}>
                        <MenuItem value={1}>Verdadero</MenuItem>
                        <MenuItem value={0}>Falso</MenuItem>
                    </Select>
                </FormControl>       
            </Grid>
            <Grid item>
              <Button id="agregarEnfermedad" onClick={this.updateChanges}>Actualizar</Button>
              <Button id="cancelarEnfermedad" onClick={this.handleOpen}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
}

export default AddEnfermedad;