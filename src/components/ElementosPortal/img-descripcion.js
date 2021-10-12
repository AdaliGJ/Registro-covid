import React,  {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {ButtonGroup, Container} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { LoginContext } from '../../Context/LoginContext';
import './elementos.scss';

class DescImagen extends Component{

    static contextType = LoginContext;
    constructor(props){
        super(props);
        this.state={
            usuario: null,      
        }
    }

    componentDidMount(){
        const context = this.context;
        this.setState({usuario: context.tipoUsuario});
        console.log(this.state.usuario);

    }



    render(){
        return (
            <Card className='texto-columna'>
                <Container>
                    <div className={this.props.img ? "imagen-columnas" : "solo-texto"}>
                        <img src={this.props.img}/>
                    </div>       
                        <Typography variant="subtitle1" component="div">
                                    {this.props.texto}
                        </Typography>
                        
                    </Container>
                    <ButtonGroup id={this.props.usuario==3? 'editID' : 'noeditID'}> {this.props.edit}
                        <Delete id={this.props.usuario==3? 'delete' : 'nodelete'}/></ButtonGroup> 
                </Card>
        );
    }
}

export default DescImagen