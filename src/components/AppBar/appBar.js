import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import {useHistory} from "react-router-dom";
import HealingIcon from '@material-ui/icons/Healing';
import { LoginContext } from '../../Context/LoginContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './appBar.css'

 function MenuBar() {
     const history = useHistory();
     const {tipoUsuario, setUsername, setTipoUsuario, username }=useContext(LoginContext);

     const inicio = () =>{
        history.push('/home');
    }
    const contact = () =>{
        history.push('/contact');
    }
    const info = () =>{
        history.push('/information');
    }
    const news = () =>{
        history.push('/news');
    }

    const login = ()=>{
      history.push('/login');
    }

   const signout=()=>{
        setUsername(null);
        setTipoUsuario(null);
        history.push('/home');
   } 

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="appbar" position="static">
        <Toolbar>
          <IconButton id="icon">
            <HealingIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Registro Vacunación
          </Typography>
          <ButtonGroup variant="contained" id="appbar_button">
            <Button id="info_button" onClick={inicio}>Inicio</Button>
            <Button id="home_button" onClick={news}>Noticias</Button>
            <Button id="contact_button" onClick={info}>Información</Button>
            <Button id="news_button" onClick={contact}>Contacto</Button>
            <IconButton id={tipoUsuario?"siout":"noout"} onClick={signout}>
              <ExitToAppIcon />
            </IconButton>
            <Button id={username? "silog":"nolog"} onClick={login}>Inicia Sesión</Button>
        </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuBar;