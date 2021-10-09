import React,  {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Container} from '@material-ui/core';
import './elementos.scss';

class DescImagen extends Component{
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
                </Card>
        );
    }
}

export default DescImagen