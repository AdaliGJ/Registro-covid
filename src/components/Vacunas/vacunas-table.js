import React, {Component} from 'react';
import './vacunas.scss'
import MenuBar from '../AppBar/appBar';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import {  withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import UpdateVacuna from './modal-vacunas.js';
import {Edit} from '@material-ui/icons/';

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


class VacunasTabla extends React.Component{
    constructor(props){
        super(props);
        this.state={
            vacunas: this.props.vacunas,
        };

        this.updateData=this.updateData.bind(this);
    }

    updateData=(nom_p, lab_p, dosis_p, dias_p, id_p)=>{
        const url = 'http://localhost/scripts/catalogo_vacunas.php';

        let formData = new FormData();
        formData.append('id', id_p);
        formData.append('nombre', nom_p);
        formData.append('laboratorio', lab_p);
        formData.append('dosis', dosis_p);
        formData.append('dias', dias_p);



        axios.post(url, formData)
        .then((response) => {
            console.log(response);
            this.getData();
        })
        .catch( (response) =>{
            console.log(response);
        });
        console.log(this.state.nombre);

       
    }
    
    getData=()=>{
        const url = 'http://localhost/scripts/catalogo_vacunas.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({vacunas: data})
                console.log(this.state.vacunas)
        });
        console.log(this.state.vacunas);
    }


    componentDidMount(){
        console.log(this.state.vacunas);
    }

  
    render(){
        return(
           <div className="vaccine_table">     
                <Paper className="container">
                <StyledTable className="customized-table">
                    <TableHead >
                    <TableRow className="table-header">
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell align="right">Laboratorio</StyledTableCell>
                        <StyledTableCell align="right">Cantidad de dosis</StyledTableCell>
                        <StyledTableCell align="right">Días siguiente Dosis</StyledTableCell>
                        <StyledTableCell align="right">Editar</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.vacunas.map((vac) => (
                        <TableRow key={vac.id_vacuna}>
                        <TableCell component="th" scope="row">
                            {vac.nombre}
                        </TableCell>
                        <TableCell align="right">{vac.laboratorio}</TableCell>
                        <TableCell align="right">{vac.dosis}</TableCell>
                        <TableCell align="right">{vac.dias_siguiente_dosis}</TableCell>
                        <TableCell align="right"><UpdateVacuna datos={{vacuna: vac.nombre, lab: vac.laboratorio, dosis: vac.dosis, dias: vac.dias_siguiente_dosis, id: vac.id_vacuna }} titulo={<Edit/>} submit={this.updateData}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </StyledTable>
                </Paper>
           </div> 
        );
    }
}
export default VacunasTabla;