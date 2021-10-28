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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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



class ReportesCitaPerdida extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reportes: [],
            dosis: 0,
            mensajeCentro: ''
        };

        this.getData=this.getData.bind(this);
    }
    
    getData=(dosis)=>{
        const url = 'http://localhost/scripts/citas_perdidas.php';
       
        axios.get(url, {params:{dosis: dosis}}).then(response => response.data)
             .then((data) => {
                this.setState({ reportes: data});
                console.log(this.state.reportes);
                if(dosis!=0){
                    this.setState({mensajeCentro: "Personas que no acudieron a su cita para su  " + dosis + " dosis."});
                 }else{
                     this.setState({mensajeCentro:"Personas que no acudieron a su cita de vacunación."});
                 }
        });
        console.log(this.state.reportes);
    }



   

    componentDidMount(){
        console.log(this.state.reportes);

        this.getData(0);


    }

  
    render(){
        let counter = 0;
        return(
           <div className="report_table">     
                <Paper className="container" elevation={20}>
                <Grid container direction={"column"} spacing={3}>
                    <div className="report-search">
                    <h1> Personas registradas que no acudieron a su cita</h1>
                    <FormControl className="outlined-short" variant ="outlined">
                        <InputLabel>Filtrar por Dosis Saltada</InputLabel>
                        <Select label="Filtrar por Dosis Saltada" onChange={e=>this.getData(e.target.value)}>
                            <MenuItem value={0}>Cualquier Dosis</MenuItem>
                            <MenuItem value='primera'>Primera Dosis</MenuItem>
                            <MenuItem value='segunda'>Segunda Dosis</MenuItem>
                            <MenuItem value='tercera'>Tercera Dosis</MenuItem>
                        </Select>
                    </FormControl> 
                    </div>
                <StyledTable className="customized-table" id="tabla-citas-perdidas">
                    <TableHead >
                    <TableRow id="name-cita">
                        {this.state.mensajeCentro}
                    </TableRow>
                    <TableRow className="table-header">
                        <StyledTableCell>DPI Persona</StyledTableCell>
                        <StyledTableCell align="right">Nombre Completo</StyledTableCell>
                        <StyledTableCell align="right">Fecha programada</StyledTableCell>
                        <StyledTableCell align="right">Dosis saltada</StyledTableCell>
                        <StyledTableCell align="right">Centro de Vacunación</StyledTableCell>
                        <StyledTableCell align="right">Nombre del Centro</StyledTableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.reportes.map((reporte) => {
                        counter +=1; return(
                        <TableRow key={reporte.dpi_persona + reporte.fecha_dosis}>
                        <TableCell component="th" scope="row">
                            {reporte.dpi_persona}
                        </TableCell>
                        <TableCell align="right">{reporte.nombre}</TableCell>
                        <TableCell align="right">{reporte.fecha_dosis}</TableCell>
                        <TableCell align="right">{reporte.dosis_saltada}</TableCell>  
                        <TableCell align="right">{reporte.puesto_registro}</TableCell>
                        <TableCell align="right">{reporte.nombre_centro}</TableCell>
                        </TableRow>);
                    })}
                         <TableRow >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="right"></TableCell>
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
                    table="tabla-citas-perdidas"
                    filename="tabla-citas-perdidas"
                    sheet="citas-perdidas"
                    buttonText="DESCARGAR HOJA DE CÁLCULO"
                    />
                
                </Paper>
           </div> 
        );
    }
}
export default ReportesCitaPerdida;