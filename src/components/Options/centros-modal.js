import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import './options.scss';



class  AddCentros extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: false,
          nombre: '',
          departamento: '',
          direccion: '',
          
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.updateChanges=this.updateChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }


  
  updateChanges=()=>{
    const url = 'http://localhost/scripts/centros.php';

        let formData = new FormData();
        formData.append('nombre', this.state.nombre);
        formData.append('departamento', this.state.departamento);
        formData.append('direccion', this.state.direccion);


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
            departamento: '',
            direccion: ''
        });
    

    this.handleOpen();
  }


 componentDidMount(){
  const context = this.context;

 }

  render(){
    
  return (
    <div >
      <Button onClick={this.handleOpen} id="boton-modal-centro">Agregar Centro de Vacunación</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Escriba los datos del nuevo centro</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField className="modalfield" label="Nombre" type="text" variant="outlined" onInput={e=>this.setState({nombre: e.target.value})}  value={this.state.nombre}/> 
            </Grid>
             <Grid item>
              <TextField className="modalfield" label="Departamento" type="text"  variant="outlined" onInput={e=>this.setState({departamento: e.target.value})}  value={this.state.departamento}/> 
            </Grid>
             <Grid item>
              <TextField className="modalfield" label="Dirección" type="text" multiline rows={4} variant="outlined" onInput={e=>this.setState({direccion: e.target.value})}  value={this.state.direccion}/> 
            </Grid>
            <Grid item>
              <Button id="agregarCentro" onClick={this.updateChanges}>Actualizar</Button>
              <Button id="cancelarCentro" onClick={this.handleOpen}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
}

export default AddCentros;