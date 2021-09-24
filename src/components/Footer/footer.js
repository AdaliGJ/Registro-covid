import React, {Component} from 'react';
import './footer.css';
import {Container} from '@material-ui/core';
import  {Grid}  from '@material-ui/core';
import  {Box}  from '@material-ui/core';
import { Link } from 'react-router-dom';

class FooterBox extends Component{

    render(){
        return(
            <Box>
                <Link to={this.props.link}>
                    {this.props.title}
                </Link>
            </Box>
        );
    }
}



class Footer extends Component{

        
    render(){
        return(
            <footer className="footer">
                <Box >
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={4}> 
                                <Box borderBottom={1}>Información</Box>
                                <FooterBox link='/home' title="Inicio"/>
                                <FooterBox link='/contact' title="Contacto"/>
                                <FooterBox link='/news' title="Noticias"/>
                                <FooterBox link='/information' title="Información"/>
                            </Grid>
                            <Grid item xs={4}> 
                                <Box borderBottom={1}>Cuenta</Box>
                                <FooterBox link='/register' title="Registro"/>
                                <FooterBox link='/login' title="Login"/>
                                <FooterBox link='/register-data' title="datos"/>
                                <FooterBox link='/mi-cuenta' title="Mi cuenta"/>
                            </Grid>
                        </Grid>
                    </Container>
                
                </Box>
            </footer>
        );
    }
}

export default Footer;