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
            centro: 0,
            puestos: [],
            fecha1: '',
            fecha2: '',
            mensajeCentro: 'Reporte Vacunación en todos los centros  ',
            mensajeFechas: ''
        };

        this.getData=this.getData.bind(this);
        this.exportPDF=this.exportPDF.bind(this);
    }
    
    getData=(centro, fecha1, fecha2)=>{
        const url = 'http://localhost/scripts/centros_reportes.php';
       
        axios.get(url, {params:{centro: centro, inicio: fecha1, fin: fecha2}}).then(response => response.data)
             .then((data) => {
                this.setState({ reportes: data,
                centro: centro,
                fecha1: fecha1,
                fecha2: fecha2})
                if(this.state.centro!=0){
                    this.setState({mensajeCentro: "Reporte Centro de vacunación " + this.state.centro});
                 }else{
                     this.setState({mensajeCentro:"Reporte Vacunación en todos los centros  "});
                 }
         
                 if(this.state.fecha1!='' && this.state.fecha2!=''){
                     this.setState({mensajeFechas: "Reporte Entre las fechas  " + this.state.fecha1+" y "+this.state.fecha2 });
                 }else if(this.state.fecha1=='' && this.state.fecha2!=''){
                    this.setState({mensajeFechas: "Reporte en las fechas en las fechas anteriores a  " +this.state.fecha2 });
                 }else if(this.state.fecha1!='' && this.state.fecha2==''){
                    this.setState({mensajeFechas: "Reporte en las fechas en las fechas posteriores a  " +this.state.fecha1 });
                 }
                console.log(this.state.reportes)
        });
        console.log(this.state.reportes);
    }


    exportPDF=()=>{
        //const title = "Reportes Por Centro de Vacunación";
        //const headers = [["Centro", "Nombre Completo", "DPI Persona", "Género", "Fecha", "# de Dosis", "Vacuna Aplicada", "Nombre Vacuna"]];
        const doc = new jsPDF();

        if(this.state.centro!=0){
            doc.text("Reporte Centro de vacunación " + this.state.centro, 10, 10);
        }else{
            doc.text("Reporte Vacunación en todos los centros  ", 10, 10);
        }

        if(this.state.fecha1!='' && this.state.fecha2!=''){
            doc.text("Reporte Entre las fechas  " + this.state.fecha1+" y "+this.state.fecha2, 10, 20);
        }else if(this.state.fecha1=='' && this.state.fecha2!=''){
        }

        doc.autoTable({ html: '#tabla-centros', margin: { top: 30 } } );
        doc.save('tabla-centros.pdf');

    }


   

    componentDidMount(){
        console.log(this.state.reportes);

        this.getData(0, '','');

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
                <div className="report-search">
                    <h1>Reportes de vacunación por centro</h1>
                    <FormControl className="outlined-short" variant ="outlined">
                        <InputLabel>Filtrar por centro</InputLabel>
                        <Select label="Filtrar por centro" onChange={e=>this.getData(e.target.value, this.state.fecha1, this.state.fecha2)}>
                            <MenuItem value={0}>Todos</MenuItem>
                            {this.state.puestos.map((puesto)=>(
                                <MenuItem key={puesto.id_puesto} value={puesto.id_puesto}>{puesto.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl> 
                </div>
                <p>Escoja un rango de fechas</p>
                <Grid item className="text-together">
                    <TextField className="outlined-short" label="Fecha Inicio" type="date" variant="outlined" onChange={e=>this.getData(this.state.centro, e.target.value, this.state.fecha2)} InputLabelProps={{shrink: true }}/>
                    <hr/>
                    <TextField className="outlined-short" label="Fecha Final" type="date" variant="outlined" onChange={e=>this.getData(this.state.centro, this.state.fecha1, e.target.value)} InputLabelProps={{shrink: true }}/>
                </Grid>
                
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
                        <StyledTableCell align="right"># de dosis</StyledTableCell>
                        <StyledTableCell align="right">Vacuna aplicada</StyledTableCell>
                        <StyledTableCell align="right">Nombre Vacuna</StyledTableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.reportes.map((reporte) => (
                        <TableRow key={reporte.dpi_persona + reporte.fecha_dosis}>
                        <TableCell component="th" scope="row">
                            {reporte.puesto_registro}
                        </TableCell>
                        <TableCell align="right">{reporte.nombre_centro}</TableCell>
                        <TableCell align="right">{reporte.dpi_persona}</TableCell>
                        <TableCell align="right">{reporte.genero}</TableCell>  
                        <TableCell align="right">{reporte.fecha_dosis}</TableCell>
                        <TableCell align="right">{reporte.dosis_aplicada}</TableCell>
                        <TableCell align="right">{reporte.vacuna}</TableCell>
                        <TableCell align="right">{reporte.nombre_vacuna}</TableCell>
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