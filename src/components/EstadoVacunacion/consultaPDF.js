import React, {useContext, Component} from 'react';
import './estado-vacunacion.scss'
import {LoginContext} from "../../Context/LoginContext.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import {  withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';

const StyledTableCell = withStyles({
    root: {
      color: "#ffffff"
    }
  })(TableCell);

  const StyledTable = withStyles({
    root: {
      /*width: "95%",*/
      overflow: 'scroll'
    }
  })(Table);



class ConsultaPDF extends Component{
    
    static contextType = LoginContext;
    constructor(props){
        super(props);
        this.state = {
            dpi_usuario: null,
            tipo_usuario: null,
            dpi_persona: '',
            dosis_vacuna: null,
            fecha_creacion: '',
            fecha_inscripcion: '',
            fecha_primera_dosis: '',
            fecha_segunda_dosis: '',
            fecha_tercera_dosis: '',
            id_archivo: '',
            nombre_completo: '',
            primera_dosis: '',
            segunda_dosis: '',
            tercera_dosis: '',
            vacuna: '',
            id_vacuna: '',
            userinfo: [],
            registrado: true,
            id_actual: '',
            doc_antiguo: false,
            completo: '',
            mensaje: ''
        };
      
        this.getData=this.getData.bind(this);
    }

    

    getData=()=>{
        const url = 'http://localhost/scripts/buscar_archivo.php';
        axios.get(url, {params: {id_archivo: this.state.id_archivo}}).then(response => response.data)
         .then((data) => {
            this.setState({userinfo: data[0]})
            console.log(data[0]);
            if(this.state.userinfo!='1'){
                var primera;
                var segunda;
                var tercera;

                var int1 = this.state.userinfo.primera_dosis==null? 0 : this.state.userinfo.primera_dosis;
                var int2 = this.state.userinfo.segunda_dosis==null? 0 : this.state.userinfo.segunda_dosis;
                var int3 = this.state.userinfo.tercera_dosis==null? 0 : this.state.userinfo.tercera_dosis;

                
                if(this.state.userinfo.fecha_primera_dosis == null || this.state.userinfo.fecha_primera_dosis == '0000-00-00'){
                    primera = 'No programada';
                }else if (this.state.userinfo.primera_dosis == 1){
                    primera = 'Efectuada';
                }else{
                    primera = 'Programada';
                }

                if(this.state.userinfo.dosis_vacuna == 1){
                    segunda = 'No aplica';
                    tercera = 'No aplica';
                    if(this.state.userinfo.fecha_primera_dosis == null || this.state.userinfo.fecha_primera_dosis == '0000-00-00'){
                        primera = 'No programada';
                    }else if (this.state.userinfo.primera_dosis == 1){
                        primera = 'Efectuada';
                    }else{
                        primera = 'Programada';
                    }
                }
        
                if(this.state.userinfo.dosis_vacuna == 2){
                    tercera = 'No aplica';
                    if(this.state.userinfo.fecha_primera_dosis == null || this.state.userinfo.fecha_primera_dosis == '0000-00-00'){
                        primera = 'No programada';
                    }else if (this.state.userinfo.primera_dosis == 1){
                        primera = 'Efectuada';
                    }else{
                        primera = 'Programada';
                    }
                    
                    if(this.state.userinfo.fecha_segunda_dosis == null || this.state.userinfo.fecha_segunda_dosis == '0000-00-00'){
                        segunda = 'No programada';
                    }else if (this.state.userinfo.segunda_dosis == 1){
                        segunda = 'Efectuada';
                    }else{
                        segunda = 'Programada';
                    }
                }
        
                if(this.state.userinfo.dosis_vacuna == 3){
                    if(this.state.userinfo.fecha_primera_dosis == null || this.state.userinfo.fecha_primera_dosis == '0000-00-00'){
                        primera = 'No programada';
                    }else if (this.state.userinfo.primera_dosis == 1){
                        primera = 'Efectuada';
                    }else{
                        primera = 'Programada';
                    }
                    
                    if(this.state.userinfo.fecha_segunda_dosis == null || this.state.userinfo.fecha_segunda_dosis == '0000-00-00'){
                        segunda = 'No programada';
                    }else if (this.state.userinfo.segunda_dosis == 1){
                        segunda = 'Efectuada';
                    }else{
                        segunda = 'Programada';
                    }
        
                    if(this.state.userinfo.fecha_tercera_dosis == null || this.state.userinfo.fecha_tercera_dosis == '0000-00-00'){
                        tercera = 'No programada';
                    }else if (this.state.userinfo.tercera_dosis == 1){
                        tercera = 'Efectuada';
                    }else{
                        tercera = 'Programada';
                    }
                }
        
                var vacuna_v = this.state.userinfo.vacuna==null? 'No Asignada': this.state.userinfo.vacuna + ' - ' + this.state.userinfo.nombre_vacuna;
        
                var total = parseInt(int1) + parseInt(int2) +parseInt(int3);
        
                if(this.state.userinfo.dosis_vacuna == total){
                    this.setState({completo:'Completo'});
                }else{
                    this.setState({completo:'Incompleto'});
                }
                
                
                this.setState({
                    dpi_persona: this.state.userinfo.dpi_persona,
                    nombre_completo: this.state.userinfo.nombre_completo,
                    primera_dosis: this.state.userinfo.fecha_primera_dosis,
                    primera_aplicada: primera,
                    segunda_dosis: this.state.userinfo.fecha_segunda_dosis,
                    segunda_aplicada: segunda,
                    tercera_dosis: this.state.userinfo.fecha_tercera_dosis,
                    tercera_aplicada: tercera,
                    centro_vacunacion: this.state.userinfo.puesto_registro,
                    vacuna: vacuna_v,
                    //id_vacuna: this.state.userinfo.vacuna,
                    dosis_vacuna: this.state.userinfo.dosis_vacuna,
                    registrado: true,
                    fecha_incorrecta: false
                });

                if(this.state.id_actual!=this.state.userinfo.id_archivo && this.state.dpi_usuario == this.state.userinfo.dpi_persona){
                    this.setState({doc_antiguo: true,
                    mensaje: 'El documento que está consultando ya no es el más actual'});
                }else{
                    if(this.state.dpi_usuario!=this.state.userinfo.dpi_persona){
                        this.setState({doc_antiguo: true,
                        mensaje: 'El documento consultado no corresponde a su usuario'});
                    }else{
                        this.setState({doc_antiguo: false});
                    }
                }

                console.log(this.state.doc_antiguo);
                

                
                
            }else{
                this.setState({
                    dpi_persona:'',
                    nombre_completo: '',
                    primera_dosis: '',
                    primera_aplicada: '',
                    segunda_dosis: '',
                    segunda_aplicada: '',
                    tercera_dosis: '',
                    tercera_aplicada: '',
                    centro_vacunacion: '',
                    vacuna: '',
                    id_vacuna: '',
                    fecha_incorrecta: false,
                    registrado: false,
                    id_archivo:'',
                    completo:''
                });
            } 
            
        });
    }



    
    componentDidMount(){
        const context = this.context;
        this.setState({dpi_usuario: context.username,
        tipo_usuario: context.tipoUsuario});
        
        const url = 'http://localhost/scripts/pdf.php';

        axios.get(url, {params: {dpi: context.username}}).then(response => response.data)
             .then((data) => {
                this.setState({id_actual: data[0].id_archivo})
                console.log(this.state.id_actual)
        });
         
    }

    
    render(){
        return(
            <div className="search-process">
                <Paper className="container">
                    <h2>Validar documento</h2>
                    <h5>Escriba el identificador de su documento para validar su autenticidad</h5>
                    <div className="searchbar">
                        <TextField className="outlined-required" label="ID del archivo" type="number" variant="outlined" onInput={e=>this.setState({id_archivo: e.target.value})} name="id_archivo"/>
                        <Button id="search" onClick={this.getData}><SearchIcon/></Button>
                    </div>
                     <Alert severity="error" id={this.state.registrado? "sidoc": "nodoc"}>Error, el documento no existe</Alert>
                     <Alert severity="warning" id={this.state.doc_antiguo? "antiguo": "noant"}>{this.state.mensaje}</Alert>
                    <p>{'Documento número: ' + this.state.id_archivo} </p>
                    <p>{'Persona con DPI: '+ this.state.dpi_persona}</p>
                    <p>{'Nombre Completo: '+ this.state.nombre_completo}</p>
                    <p>{'Vacuna Correspondiente: '+ this.state.vacuna}</p>
                <StyledTable className="customized-table">
                    <TableHead >
                    <TableRow className="table-header">
                        <StyledTableCell>Fase del Proceso</StyledTableCell>
                        <StyledTableCell align="right">Fecha</StyledTableCell>
                        <StyledTableCell align="right">Estado</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                            Primera Dosis
                            </TableCell>
                            <TableCell align="right"> {this.state.primera_dosis}</TableCell>
                            <TableCell align="right"> {this.state.primera_aplicada}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                            Segunda Dosis
                            </TableCell>
                            <TableCell align="right"> {this.state.segunda_dosis}</TableCell>
                            <TableCell align="right"> {this.state.segunda_aplicada}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                            Tercera Dosis
                            </TableCell>
                            <TableCell align="right"> {this.state.tercera_dosis}</TableCell>
                            <TableCell align="right"> {this.state.tercera_aplicada}</TableCell>
                        </TableRow>
                
                    </TableBody>
                </StyledTable>
                <p>{'Cuadro de Vacunación: ' + this.state.completo}</p>
                </Paper>
                
            
            </div>
        );
    }
}

export default ConsultaPDF;