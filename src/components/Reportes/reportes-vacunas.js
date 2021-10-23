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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, TextField } from '@material-ui/core';
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



class ReportesVacunas extends React.Component{
    constructor(props){
        super(props);
        var today = new Date().getDate();
        this.state={
            reportes: [],
            centro: 0,
            puestos: [],
            fecha: '',
            mensajeCentro: 'Detalle de vacunas en todos los centros  ',
            mensajeFechas: ''
        };

        this.getData=this.getData.bind(this);
    }
    
    getData=(centro, fecha)=>{
        const url = 'http://localhost/scripts/vacunas_reportes.php';
       
        axios.get(url, {params:{centro: centro, dia: fecha}}).then(response => response.data)
             .then((data) => {
                this.setState({ reportes: data,
                centro: centro,
                fecha: fecha})
                if(this.state.centro!=0){
                    this.setState({mensajeCentro: "Detalle de vacunas en centro de vacunación " + this.state.centro});
                 }else{
                     this.setState({mensajeCentro:"Detalle de vacunas en todos los centros  "});
                 }
         
                 if(this.state.fecha!=''){
                     this.setState({mensajeFechas: "Reporte del día " + this.state.fecha });
                 }
                console.log(this.state.reportes)
        });
        console.log(this.state.reportes);
    }



   

    componentDidMount(){
        console.log(this.state.reportes);

        this.getData(0, '');

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
                    <h1>Detalle de Vacunas Diario por centro</h1>
                <p>Escoja un centro de vacunación y una fecha</p>
                <Grid item className="text-together">
                    <FormControl className="outlined-short" variant ="outlined">
                        <InputLabel>Filtrar por centro</InputLabel>
                        <Select label="Filtrar por centro" onChange={e=>this.getData(e.target.value, this.state.fecha)}>
                            <MenuItem value={0}>Todos</MenuItem>
                            {this.state.puestos.map((puesto)=>(
                                <MenuItem key={puesto.id_puesto} value={puesto.id_puesto}>{puesto.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl> 
                    <hr/>
                    <TextField className="outlined-short" label="Fecha Final" type="date" variant="outlined" onChange={e=>this.getData(this.state.centro, e.target.value)} InputLabelProps={{shrink: true }}/>
                </Grid>
                
                <StyledTable className="customized-table" id="tabla-vacunas-centros">
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
                        <StyledTableCell align="right">Fecha Aplicada</StyledTableCell>
                        <StyledTableCell align="right">Vacuna aplicada</StyledTableCell>
                        <StyledTableCell align="right">Nombre Vacuna</StyledTableCell>
                        <StyledTableCell align="right">Cantidad de Vacunas Aplicadas</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.reportes.map((reporte) => (
                        <TableRow key={reporte.dpi_persona + reporte.fecha_dosis}>
                        <TableCell component="th" scope="row">
                            {reporte.puesto_registro}
                        </TableCell>
                        <TableCell align="right">{reporte.nombre_centro}</TableCell>
                        <TableCell align="right">{reporte.fecha}</TableCell>
                        <TableCell align="right">{reporte.vacuna}</TableCell>
                        <TableCell align="right">{reporte.nombre_vacuna}</TableCell>
                        <TableCell align="right">{reporte.vacunas_aplicadas}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </StyledTable>
                </Grid>
                <ReactHTMLTableToExcel
                    //id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-vacunas-centros"
                    filename="detalle-diario-vacunas"
                    sheet="detalle-vacunas"
                    buttonText="DESCARGAR HOJA DE CÁLCULO"
                    />
                
                </Paper>
           </div> 
        );
    }
}
export default ReportesVacunas;