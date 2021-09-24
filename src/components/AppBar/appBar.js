import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";
import HealingIcon from '@material-ui/icons/Healing';
import './appBar.css'

 function MenuBar() {
     const history = useHistory();

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

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="appbar" position="static">
        <Toolbar>
          <IconButton id="menu-toggle">
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
        </ButtonGroup>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuBar;