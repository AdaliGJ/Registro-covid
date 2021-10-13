import React, {Component} from 'react';
import './footer.scss';
import {Container} from '@material-ui/core';
import  {Grid}  from '@material-ui/core';
import  {Box}  from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


class FooterBox extends Component{
    

    render(){
        return(
            <Box className={this.props.name}>
                <Link to={this.props.link}>
                    {this.props.title}
                </Link>
            </Box>
        );
    }
}


class FooterBox2 extends Component{
    

    render(){
        return(
            <Box className={this.props.className}>
                <a href={this.props.link} target="_blank">
                    {this.props.title}
                </a>
            </Box>
        );
    }
}



class Footer extends Component{

    static contextType = LoginContext;
    constructor(props){
        super(props);
        this.state = {
            dpi_usuario: null,
            tipo_usuario: null
        };
    }
    
    
    componentDidMount(){
        const context = this.context;
        this.setState({dpi_usuario: context.username,
        tipo_usuario: context.tipoUsuario});
        
    }    


    render(){
        return(
            <footer className="footer">
                <Box >
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={4}> 
                                <Box borderBottom={1}>Información</Box>
                                <FooterBox link='/home' title="Inicio"/>
                                <FooterBox link='/information' title="Información"/>
                                <FooterBox link='/news' title="Noticias"/>
                                <FooterBox link='/contact' title="Contacto"/>
                            </Grid>
                            <Grid item xs={4}> 
                                <Box borderBottom={1}>Usuarios</Box>
                                <FooterBox link='/register' title="Registro" name={this.state.dpi_usuario ? "nofoot":"sifoot"}/>
                                <FooterBox link='/login' title="Login" name={this.state.dpi_usuario ? "nofoot":"sifoot"}/>
                                <FooterBox link='/mi-cuenta' title="Mi cuenta" name={this.state.dpi_usuario ? "sifoot":"nofoot"}/>
                                <FooterBox link='/health-employees' title="Módulo empleados" name={this.context.tipoUsuario==2 ? "sifoot":"nofoot"}/>
                                <FooterBox link='/admin' title="Administración usuarios" name={this.context.tipoUsuario==3 ? "sifoot":"nofoot"}/>
                                <FooterBox link='/Vacunas' title="Ingreso Vacunas" name={this.context.tipoUsuario==3 ? "sifoot":"nofoot"}/>
                                <FooterBox link='/habilitar-poblacion' title="Habilitar Personas" name={this.context.tipoUsuario==3 ? "sifoot":"nofoot"}/>
                                <FooterBox link='/import-users' title="Ingresar Población" name={this.context.tipoUsuario==3 ? "sifoot":"nofoot"}/>
                            </Grid>
                            <Grid item xs={4}> 
                                <Box borderBottom={1}>Redes sociales</Box>
                                <FooterBox2 link='https://twitter.com/MinSaludGuate/'  title={<TwitterIcon/>}/>
                                <FooterBox2 link='https://www.instagram.com/min_saludgt/'  title={<InstagramIcon/>}/>
                                <FooterBox2 link='https://www.facebook.com/MinisteriodeSaludPublicayAsistenciaSocial/'  title={<FacebookIcon/>}/>
                            </Grid>
                        </Grid>
                    </Container>
                    
                </Box>
            </footer>
        );
    }
}

export default Footer;