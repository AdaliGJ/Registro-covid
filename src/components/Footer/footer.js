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
                                {this.state.tipo_usuario==3?
                                    <FooterBox link='/reportes' title="Reportes"/>:null}
                            </Grid>
                            <Grid item xs={4}> 
                               
                                <Box borderBottom={1}>Usuarios</Box>
                                {!this.state.dpi_usuario?
                                    <div>
                                        <FooterBox link='/register' title="Registro"/>
                                        <FooterBox link='/login' title="Login" />
                                    </div>:
                                    <div>
                                        <FooterBox link='/mi-cuenta' title="Mi cuenta"/>
                                        <FooterBox link='/mi-proceso' title="Mi Proceso de vacunación"/>
                                    </div>}
                                <FooterBox link='/health-employees' title="Módulo empleados" name={this.context.tipoUsuario==2 ? "sifoot":"nofoot"}/>
                                {this.state.tipo_usuario==3?
                                    <div>
                                        <FooterBox link='/admin' title="Administración usuarios"/>
                                        <FooterBox link='/Vacunas' title="Ingreso Vacunas" />
                                        <FooterBox link='/habilitar-poblacion' title="Habilitar Personas" />
                                        <FooterBox link='/import-users' title="Ingresar Población" />
                                        <FooterBox link='/information-options' title="Agregar Datos Selección"/>
                                        <FooterBox link='/solicitudes' title="Permisos de Empleado"/>
                                        <FooterBox link='/primera-dosis' title="Asignar Primera Dosis"/>
                                        
                                </div>:null}
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