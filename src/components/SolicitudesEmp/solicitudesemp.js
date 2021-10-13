import React, {Component} from 'react';
import MenuBar from '../AppBar/appBar';
import './solicitudesemp.scss'
import axios from 'axios';
import Table from '@material-ui/core/Table';
import {  withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {CheckCircle, DeleteForever} from '@material-ui/icons/';
import Footer from '../Footer/footer';
import { Button } from '@material-ui/core';


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


class Solicitudes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dpi: null,
            solicitudes:[]
        };

        this.aproveData=this.aproveData.bind(this);
        this.deleteData=this.deleteData.bind(this);
    }

    aproveData=(datos)=>{
        const url = 'http://localhost/scripts/solicitudes.php';

        let formData = new FormData();
        console.log(datos);

        formData.append('dpi', datos.dpi_empleado);


        axios.post(url, formData)
        .then((response) => {
            console.log(response);
            this.getData();
        })
        .catch( (response) =>{
            console.log(response);
        });
    }

    deleteData=(datos)=>{
        const url = 'http://localhost/scripts/eliminar_solicitudes.php';

        let formData = new FormData();
        console.log(datos);

        formData.append('dpi', datos.dpi_empleado);


        axios.post(url, formData)
        .then((response) => {
            console.log(response);
            this.getData();
        })
        .catch( (response) =>{
            console.log(response);
        });
    }
    
    getData=()=>{
        const url = 'http://localhost/scripts/solicitudes.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({solicitudes: data})
                console.log(this.state.solicitudes)
        });
        console.log(this.state.solicitudes);
    }


    componentDidMount(){
        console.log(this.state.solicitudes);

        this.getData();
    }

  
    render(){
        return(
           <div className="solicitud_table">
           <div className="page">     
           <MenuBar/>
                <Paper className="container">
                <h1>Solicitudes de permisos de empleado</h1>
                <StyledTable className="customized-table">
                    <TableHead >
                    <TableRow className="table-header-emp">
                        <StyledTableCell>DPI Empleado</StyledTableCell>
                        <StyledTableCell align="right">Nombre completo</StyledTableCell>
                        <StyledTableCell align="right">Aprobar Solicitud</StyledTableCell>
                        <StyledTableCell align="right">Rechazar Solicitud</StyledTableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.solicitudes.map((sol) => (
                        <TableRow key={sol.dpi_empleado}>
                        <TableCell component="th" scope="row">
                            {sol.dpi_empleado}
                        </TableCell>
                        <TableCell align="right">{sol.nombre_completo}</TableCell>
                        <TableCell align="right"><Button id="aprobar" onClick={()=>this.aproveData(sol)}><CheckCircle/></Button></TableCell>
                        <TableCell align="right"><Button id="rechazar" onClick={()=>this.deleteData(sol)}><DeleteForever/></Button></TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </StyledTable>
                </Paper>
           </div> 
            <Footer/>
           </div>
        );
    }
}
export default Solicitudes;