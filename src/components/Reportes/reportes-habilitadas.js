import React from 'react';
import './reportes.scss'
import axios from 'axios';
import Table from '@material-ui/core/Table';
import {  withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const StyledTableCell = withStyles({
    root: {
      color: "#ffffff"
    }
  })(TableCell);

  const StyledTable = withStyles({
    root: {
      overflow: 'scroll'
    }
  })(Table);



class ReportesHabilitadas extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reportes: [],
            puestos: [],
            mensaje: 'Reporte de personas habilitadas para vacuna sin registrarse aún',
            cantidad: 'Hola'
            
        };

        this.getData=this.getData.bind(this);
    }
    
    getData=()=>{
        const url = 'http://localhost/scripts/habilitadas_reporte.php';
       
        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({ reportes: data});
                console.log(this.state.reportes);
        });
        console.log(this.state.reportes);
    }



   

    componentDidMount(){
        console.log(this.state.reportes);

        this.getData();

        const url = 'http://localhost/scripts/centros.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({puestos: data});
        });

        console.log(this.state.reportes);
    }

  
    render(){
        let counter = 0;
        return(
           <div className="report_table">     
                <Paper className="container" elevation={20}>
                <Grid container direction={"column"} spacing={3}>
                    <h1>Personas habilitadas sin registrarse</h1>
                <StyledTable className="customized-table" id="tabla-habilitadas">
                    <TableHead >
                    <TableRow id="name-habilitadas">
                        {this.state.mensaje}
                    </TableRow>
                    <TableRow className="table-header">
                        <StyledTableCell>DPI Persona</StyledTableCell>
                        <StyledTableCell align="right">Nombre Completo</StyledTableCell>
                        <StyledTableCell align="right">Fecha de Nacimiento</StyledTableCell>
                        <StyledTableCell align="right">Género persona</StyledTableCell>
                        <StyledTableCell align="right">Nacionalidad</StyledTableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.reportes.map((reporte) => {
                        counter +=1; return(
                        <TableRow key={reporte.dpi}>
                        <TableCell component="th" scope="row">
                            {reporte.dpi}
                        </TableCell>
                        <TableCell align="right">{reporte.nombre_completo}</TableCell>
                        <TableCell align="right">{reporte.fecha_nacimiento}</TableCell>
                        <TableCell align="right">{reporte.genero}</TableCell>  
                        <TableCell align="right">{reporte.nacionalidad}</TableCell>
                        </TableRow>);
                    })}
                         <TableRow >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">TOTAL</TableCell>  
                        <TableCell align="right">{counter}</TableCell>
                        </TableRow>
                    </TableBody>
                </StyledTable>
                </Grid>
                <ReactHTMLTableToExcel
                    className="download-table-xls-button"
                    table="tabla-habilitadas"
                    filename="tabla-personas-habilitadas"
                    sheet="habilitadas-sin-registrar"
                    buttonText="DESCARGAR HOJA DE CÁLCULO"
                    />
                
                </Paper>
           </div> 
        );
    }
}
export default ReportesHabilitadas;