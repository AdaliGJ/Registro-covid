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


class ReportesCentro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reportes: [],
            centro: 0,
            puestos: []
        };

        this.getData=this.getData.bind(this);
    }
    
    getData=(centro)=>{
        const url = 'http://localhost/scripts/centros_reportes.php';

        axios.get(url, {params:{centro: centro}}).then(response => response.data)
             .then((data) => {
                this.setState({ reportes: data})
                console.log(this.state. reportes)
        });
        console.log(this.state.reportes);
    }


   

    componentDidMount(){
        console.log(this.state.reportes);

        this.getData(0);

        const url = 'http://localhost/scripts/centros.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({puestos: data});
        });
    }

  
    render(){
        return(
           <div className="report_table">     
                <Paper className="container">
                <div className="report-search">
                    <h1>Reportes de vacunación por centro</h1>
                    <FormControl className="outlined-short" variant ="outlined">
                        <InputLabel>Filtrar por centro</InputLabel>
                        <Select label="Filtrar por centro" onChange={e=>this.getData(e.target.value)}>
                            <MenuItem value={0}>Todos</MenuItem>
                            {this.state.puestos.map((puesto)=>(
                                <MenuItem key={puesto.id_puesto} value={puesto.id_puesto}>{puesto.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl> 
                </div>
                <StyledTable className="customized-table">
                    <TableHead >
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
                <Button id="pdf-centros">Desargar PDF</Button>
                </Paper>
           </div> 
        );
    }
}
export default ReportesCentro;