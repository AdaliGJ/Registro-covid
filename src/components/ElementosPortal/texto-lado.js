import React,  {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core/';
import './elementos.scss'

class TextoLado extends Component{
    render(){
        return (
        <Card sx={{ display: 'flex', verticalAlign: 'middle' }} className= 'texto'>
        <div className={this.props.derecha? 'imagen-derecha': 'imagen-izquierda'}>
            <CardMedia  component="img" image={this.props.img}/>
        </div>
            <Box>
                <CardContent className="content">
                <Typography variant="subtitle1" component="div">
                    {this.props.texto}
                </Typography>
                </CardContent>
            </Box>
            
            </Card>
        );
    }
}

export default TextoLado;