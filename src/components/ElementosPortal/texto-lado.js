import React,  {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core/';
import './elementos.css'

class TextoLado extends Component{
    render(){
        return (
        <Card sx={{ display: 'flex' }} className={this.props.derecha? 'texto-derecha': 'texto-izquierda'}>
        <CardMedia className='imagen-izquierda' component="img" image={this.props.img}/>
            <Box>
                <CardContent className="content">
                <Typography variant="subtitle1" component="div">
                    {this.props.texto}
                </Typography>
                </CardContent>
            </Box>
            <CardMedia className='imagen-derecha' component="img" image={this.props.img}/>
            </Card>
        );
    }
}

export default TextoLado;