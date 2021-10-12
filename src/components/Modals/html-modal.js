import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import './modal.scss';



class InsertTexto extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: false,
          texto: this.props.datos.texto,
          usuario: null
          
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.cancel=this.cancel.bind(this);
      this.addChanges=this.addChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }

  cancel=()=>{
    this.setState({
      texto: ''
    });
    this.handleOpen();
  }

  
  updateChanges=()=>{
    var updateText = this.props.submit;
    updateText(this.state.texto);
    this.handleOpen();
  }

  addChanges = ()=>{
    var submitText = this.props.submit;
    submitText(this.state.texto);
    this.handleOpen();
 }

 componentDidMount(){
  const context = this.context;
  this.setState({usuario: context.tipoUsuario});
 }

  render(){
    
  return (
    <div id={this.state.usuario==3? "sitexto": "notexto"}>
      <Button onClick={this.handleOpen} id="boton-modal-text">{this.props.titulo}</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Ingresar los datos</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField className="modalfield" label="Texto" type="text"  multiline rows={5} variant="outlined" onInput={e=>this.setState({texto: e.target.value})}  value={this.state.texto}/> 
            </Grid>
            <Grid item>
            {this.props.comp?
              <Button id="actualizarText" onClick={this.updateChanges}>Actualizar</Button> :
              <Button id="agregarText" onClick={this.addChanges}>Agregar</Button>
            }
              <Button id="cancelarText" onClick={this.props.comp? this.handleOpen: this.cancel }>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
}

export default InsertTexto;