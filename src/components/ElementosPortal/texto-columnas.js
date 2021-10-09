import React,  {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Container} from '@material-ui/core';
import  {Box}  from '@material-ui/core';
import './elementos.scss'

class TextoColumnas extends Component{
    render(){
        return (
            <Card className='texto-columna'>
                <Container>
                    <div className="imagen-columnas">
                        <img src={this.props.img} />
                    </div>       
                        <Grid container spacing={2}>
                            <Grid item xs={4}> 
                                <Typography variant="subtitle1" component="div">
                                    {this.props.texto1}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}> 
                                <Typography variant="subtitle1" component="div">
                                    {this.props.texto2}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}> 
                                <Typography variant="subtitle1" component="div">
                                    {this.props.texto3}
                                </Typography>
                            </Grid>
                        </Grid>    
                    </Container>
                </Card>
        );
    }
}

export default TextoColumnas;