import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext';
import { Edit } from '@material-ui/icons';
import axios from 'axios';
import './modal.scss';



class UpdateTitulo extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: false,
          texto: this.props.datos.texto,
          usuario: null
          
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.updateChanges=this.updateChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }


  
  updateChanges=()=>{
    var updateTitle = this.props.submit;
    updateTitle(this.state.texto);
    this.handleOpen();
  }


 componentDidMount(){
  const context = this.context;
  this.setState({usuario: context.tipoUsuario});
 }

  render(){
    
  return (
    <div id={this.state.usuario==3? "sititulo": "notitulo"}>
      <Button onClick={this.handleOpen} id="boton-modal-titulo">{this.props.titulo}</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Ingresar el nuevo título</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField className="modalfield" label="Texto" type="text"  multiline rows={2} variant="outlined" onInput={e=>this.setState({texto: e.target.value})}  value={this.state.texto}/> 
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

export default UpdateTitulo;