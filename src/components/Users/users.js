import React, {Component} from 'react';
import './users.scss'
import MenuBar from '../AppBar/appBar';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import {  withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles({
    root: {
      color: "#ffffff"
    }
  })(TableCell);

  const StyledTable = withStyles({
    root: {
      width: "90vw",
      overflow: 'scroll'
    }
  })(Table);


class UsersTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usuarios: []
        };

        this.mySubmit=this.mySubmit.bind(this);
    }

    /*13/09/2021*/
    componentDidMount(){
        const url = 'http://localhost/scripts/users.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({usuarios: data})
                console.log(this.state.usuarios)
        });
        
    }

    mySubmit(event){
        event.preventDefault();
        
        console.log('this is the submit ' + event.target.username.value);
    }

    render(){
        return(
           <div className="user_table">
                <MenuBar/>
                <h1>Tabla de Usuarios</h1>
                <Paper className="container">
                <StyledTable className="customized-table">
                    <TableHead >
                    <TableRow className="table-header">
                        <StyledTableCell>DPI</StyledTableCell>
                        <StyledTableCell align="right">Nombre</StyledTableCell>
                        <StyledTableCell align="right">Puesto Vacunación</StyledTableCell>
                        <StyledTableCell align="right">Vacuna</StyledTableCell>
                        <StyledTableCell align="right">Primera dosis</StyledTableCell>
                        <StyledTableCell align="right">Aplicada</StyledTableCell>
                        <StyledTableCell align="right">Segunda dosis</StyledTableCell>
                        <StyledTableCell align="right">Aplicada</StyledTableCell>
                        <StyledTableCell align="right">Tercera dosis</StyledTableCell>
                        <StyledTableCell align="right">Aplicada</StyledTableCell>
                        <StyledTableCell align="right">Datos</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.usuarios.map((usuario) => (
                        <TableRow key={usuario.dpi_usuario}>
                        <TableCell component="th" scope="row">
                            {usuario.dpi_usuario}
                        </TableCell>
                        <TableCell align="right">{usuario.nombre_completo}</TableCell>
                        <TableCell align="right">{usuario.fecha_nacimiento}</TableCell>
                        <TableCell align="right">{usuario.tipo_usuario}</TableCell>
                        <TableCell align="right">{usuario.nombre_completo}</TableCell>
                        <TableCell align="right">{usuario.fecha_nacimiento}</TableCell>
                        <TableCell align="right">{usuario.tipo_usuario}</TableCell>
                        <TableCell align="right">{usuario.nombre_completo}</TableCell>
                        <TableCell align="right">{usuario.fecha_nacimiento}</TableCell>
                        <TableCell align="right">{usuario.tipo_usuario}</TableCell>
                        <TableCell align="right">{usuario.nombre_completo}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </StyledTable>
                </Paper>
           </div> 
        );
    }
}
export default UsersTable;