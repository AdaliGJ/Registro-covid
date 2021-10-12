import React,  {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core/';
import { Edit, Delete } from '@material-ui/icons';
import { LoginContext } from '../../Context/LoginContext';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './elementos.scss'

class TextoLado extends Component{
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

    }

    


    render(){
        
        return (
        <Card sx={{ display: 'flex', verticalAlign: 'middle' }} className= 'texto'>
        
        <div className={this.props.derecha == 1? 'imagen-derecha': 'imagen-izquierda'}>
            <CardMedia  component="img" image={this.props.img}/>
            
        </div>
            <Box>
                <CardContent className="content">
                <Typography variant="subtitle1" component="div">
                    {this.props.texto}
                </Typography>
                   <div id={this.props.usuario==3? 'edit' : 'noedit'}> {this.props.edit}
                   <Button onClick={this.props.delete} id="delete"><Delete/></Button></div> 
                </CardContent>
            </Box>
            
            </Card>
        );
    }
}

export default TextoLado;