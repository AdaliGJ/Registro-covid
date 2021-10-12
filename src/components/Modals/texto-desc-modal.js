import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import './modal.scss';



class InsertImgDesc extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: false,
          archivo: this.props.datos.archivo,
          img: this.props.datos.img,
          texto: this.props.datos.texto,
          usuario: null
          
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.cancel=this.cancel.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.addChanges=this.addChanges.bind(this);
      this.updateChanges=this.updateChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }

  cancel=()=>{
    this.setState({
      archivo: null,
      img: '',
      texto: '',
    });
    this.handleOpen();
  }

  handleChange = e => {
    if(e.target.files[0]){
        this.setState({img:  e.target.files[0].name,
        archivo: e.target.files[0]});
        console.log(this.state.img);
    }else{
        this.setState({img: ''});
    }
  }

 
  updateChanges=()=>{
    var updateID = this.props.submit;
    updateID(this.state.archivo, this.state.texto,  this.state.img);
    this.handleOpen();
  }

  addChanges = ()=>{
    var submitID = this.props.submit;
    submitID(this.state.archivo, this.state.texto);
    this.handleOpen();
 }

 componentDidMount(){
  const context = this.context;
  this.setState({usuario: context.tipoUsuario});
 }

  render(){
    
  return (
    <div id={this.state.usuario==3? "sitexto-desc": "notexto-desc"}>
      <Button onClick={this.handleOpen} id="boton-modal-desc">{this.props.titulo}</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Ingresar los datos</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField type="file" name="img-file" id="img-file" inputProps={{ accept: '.jpg, .png, .jpeg' }} onChange={this.handleChange}/>  
                <label htmlFor="img-file"> 
                  <Button id="upload-img-desc" variant="contained" component="span">Seleccionar Imagen</Button>
                  <p>{this.state.img !=''? this.state.img : "Ninguna Imagen Seleccionada"}</p>
                </label> 
              </Grid>
            <Grid item>
              <TextField className="modalfield" label="Descripción" type="text"  multiline rows={5} variant="outlined" onInput={e=>this.setState({texto: e.target.value})}  value={this.state.texto}/> 
            </Grid>
            <Grid item>
            {this.props.comp?
              <Button id="actualizarID" onClick={this.updateChanges}>Actualizar</Button> :
              <Button id="agregarID" onClick={this.addChanges}>Agregar</Button>
            }
              <Button id="cancelarID" onClick={this.props.comp? this.handleOpen: this.cancel }>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
}

export default InsertImgDesc;