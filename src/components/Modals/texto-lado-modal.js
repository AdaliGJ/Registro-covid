import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import './modal.scss';



class InsertTextoLado extends React.Component {
  static contextType = LoginContext;
  constructor(props){
      super(props);
      this.state={
          open: this.props.datos.openModal,
          archivo: this.props.datos.archivo,
          img: this.props.datos.img,
          texto: this.props.datos.texto,
          derecha: this.props.datos.derecha,
          usuario: null
          
      }
      this.handleOpen=this.handleOpen.bind(this);
      this.cancel=this.cancel.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.addChanges=this.addChanges.bind(this);
  }
  
  handleOpen=(e)=>{
       this.setState({open: !this.state.open})  
  }

  cancel=()=>{
    this.setState({
      archivo: null,
      img: '',
      texto: '',
      derecha: false
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
    var updateTL = this.props.submit;
    updateTL(this.state.archivo, this.state.texto, this.state.derecha, this.state.img);
    this.handleOpen();
  }

  addChanges = ()=>{
    var submitTL = this.props.submit;
    submitTL(this.state.archivo, this.state.texto, this.state.derecha);
    this.handleOpen();
 }

 componentDidMount(){
  const context = this.context;
  this.setState({usuario: context.tipoUsuario});
 }

  render(){
    
  return (
    <div id={this.state.usuario==3? "sitexto-lado": "notexto-lado"}>
      <Button onClick={this.handleOpen} id="boton-modal-lado">{this.props.titulo}</Button>
      <Modal open={this.state.open} onClose={this.handleOpen}>
        <Box className="box">
          <h2>Ingresar los datos</h2>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TextField type="file" name="img-file" id="img-file" inputProps={{ accept: '.jpg, .png, .jpeg' }} onChange={this.handleChange}/>  
                <label htmlFor="img-file"> 
                  <Button id="upload-img" variant="contained" component="span">Seleccionar Imagen</Button>
                  <p>{this.state.img !=''? this.state.img : "Ninguna Imagen Seleccionada"}</p>
                </label> 
              </Grid>
            <Grid item>
              <FormControl id="derecha" variant ="outlined">
                  <InputLabel>Lado de la imagen</InputLabel>
                  <Select label="Lado de la imagen" onChange={e=>this.setState({derecha: e.target.value})} value={this.state.derecha}>
                      <MenuItem value="1">Derecha</MenuItem>
                      <MenuItem value="0">Izquierda</MenuItem>
                  </Select>
              </FormControl> 
            </Grid>
            <Grid item>
              <TextField className="modalfield" label="Texto" type="text"  multiline rows={5} variant="outlined" onInput={e=>this.setState({texto: e.target.value})}  value={this.state.texto}/> 
            </Grid>
            <Grid item>
            {this.props.lado?
              <Button id="actualizar" onClick={this.updateChanges}>Actualizar</Button> :
              <Button id="agregar" onClick={this.addChanges}>Agregar</Button>
            }
              <Button id="cancelar" onClick={this.props.lado? this.handleOpen: this.cancel }>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
}

export default InsertTextoLado;