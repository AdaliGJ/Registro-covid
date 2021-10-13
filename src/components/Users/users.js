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
import { Edit } from '@material-ui/icons';
import { Button } from '@material-ui/core';

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
        const url = 'http://localhost/scripts/poblacion.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({usuarios: data})
                console.log(this.state.usuarios);
                console.log(data);
        });
        
    }

    mySubmit(event){
        event.preventDefault();
        
        console.log('this is the submit ' + event.target.username.value);
    }

    render(){
        return(
           <div className="user_table">
                <Paper className="container">
                <StyledTable className="customized-table">
                    <TableHead >
                    <TableRow className="table-header">
                        <StyledTableCell>DPI</StyledTableCell>
                        <StyledTableCell align="right">Nombre Completo</StyledTableCell>
                        <StyledTableCell align="right">Nacionalidad</StyledTableCell>
                        <StyledTableCell align="right">Sexo</StyledTableCell>
                        <StyledTableCell align="right">Enfermedad Crónica</StyledTableCell>
                        <StyledTableCell align="right">Profesión</StyledTableCell>
                        <StyledTableCell align="right">Seleccionar</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.usuarios.map((usuario) => (
                        <TableRow key={usuario.dpi}>
                        <TableCell component="th" scope="row">
                            {usuario.dpi}
                        </TableCell>
                        <TableCell align="right">{usuario.nombre_completo}</TableCell>
                        <TableCell align="right">{usuario.nacionalidad}</TableCell>
                        <TableCell align="right">{usuario.genero}</TableCell>
                        <TableCell align="right">{usuario.enfermedad}</TableCell>
                        <TableCell align="right">{usuario.trabajo}</TableCell>
                        <TableCell align="right"><Button onClick={()=>this.props.edit(usuario.dpi)}><Edit/></Button></TableCell>
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