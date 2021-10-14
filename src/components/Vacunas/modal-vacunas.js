import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext';
import { Edit } from '@material-ui/icons';
import axios from 'axios';
import './vacunas.scss';



class  UdpdateVacuna extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: false,
          vacuna: this.props.datos.vacuna,
          lab: this.props.datos.lab,
          dosis: this.props.datos.dosis,
          dias: this.props.datos.dias,
          id: this.props.datos.id
          
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.updateChanges=this.updateChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }


  
  updateChanges=()=>{
    var updateVac = this.props.submit;
    updateVac(this.state.vacuna, this.state.lab, this.state.dosis, this.state.dias, this.state.id);
    this.handleOpen();
  }


 componentDidMount(){
  const context = this.context;

 }

  render(){
    
  return (
    <div >
      <Button onClick={this.handleOpen} id="boton-modal-titulo">{this.props.titulo}</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Editar</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField className="modalfield" label="Nombre" type="text" variant="outlined" onInput={e=>this.setState({vacuna: e.target.value})}  value={this.state.vacuna}/> 
            </Grid>
             <Grid item>
              <TextField className="modalfield" label="Laboratorio" type="text"   variant="outlined" onInput={e=>this.setState({lab: e.target.value})}  value={this.state.lab}/> 
            </Grid>
             <Grid item>
              <TextField className="modalfield" label="Dosis" type="number"  variant="outlined" onInput={e=>this.setState({dosis: e.target.value})}  value={this.state.dosis}/> 
            </Grid>
             <Grid item>
              <TextField className="modalfield" label="Días Siguiente dosis" type="number" variant="outlined" onInput={e=>this.setState({dias: e.target.value})}  value={this.state.dias}/> 
            </Grid>
            <Grid item>
              <Button id="actualizarText" onClick={this.updateChanges}>Actualizar</Button>
              <Button id="cancelarText" onClick={this.handleOpen}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
}

export default UdpdateVacuna;