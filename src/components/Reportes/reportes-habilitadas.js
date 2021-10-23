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
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, TextField } from '@material-ui/core';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
            mensajeCentro: 'Reporte Vacunación en todos los centros  ',
            mensajeFechas: ''
        };

        this.getData=this.getData.bind(this);
    }
    
    getData=()=>{
        const url = 'http://localhost/scripts/habilitadas_reporte.php';
       
        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({ reportes: data});
                console.log(this.state.reportes)
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
        return(
           <div className="report_table">     
                <Paper className="container" elevation={20}>
                <Grid container direction={"column"} spacing={3}>
                    <h1>Reportes de vacunación por centro</h1>
                
                <StyledTable className="customized-table" id="tabla-centros">
                    <TableHead >
                    <TableRow id="name-centros">
                        {this.state.mensajeCentro}
                    </TableRow>
                    <TableRow id="name-centros-fecha">
                        {this.state.mensajeFechas}
                    </TableRow>
                    <TableRow className="table-header">
                        <StyledTableCell>Centro de vacunación</StyledTableCell>
                        <StyledTableCell align="right">Nombre Centro</StyledTableCell>
                        <StyledTableCell align="right">DPI persona</StyledTableCell>
                        <StyledTableCell align="right">Género persona</StyledTableCell>
                        <StyledTableCell align="right">Fecha de la dosis</StyledTableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.reportes.map((reporte) => (
                        <TableRow key={reporte.dpi}>
                        <TableCell component="th" scope="row">
                            {reporte.dpi}
                        </TableCell>
                        <TableCell align="right">{reporte.nombre_completo}</TableCell>
                        <TableCell align="right">{reporte.fecha_nacimiento}</TableCell>
                        <TableCell align="right">{reporte.genero}</TableCell>  
                        <TableCell align="right">{reporte.nacionalidad}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </StyledTable>
                </Grid>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-centros"
                    filename="tabla-centros"
                    sheet="vacuna-centros"
                    buttonText="DESCARGAR HOJA DE CÁLCULO"
                    />
                
                </Paper>
           </div> 
        );
    }
}
export default ReportesHabilitadas;