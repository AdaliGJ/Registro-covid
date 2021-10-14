import React from 'react';
import MenuBar from "../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Footer from '../Footer/footer.js';
import AddCentros from './centros-modal.js';
import AddEnfermedad from './enfermedades-modal.js';
import './options.scss'
import AddTrabajo from './trabajos-modal.js';


class Options extends React.Component{
    
    
    render(){
        return(
            <div className="options">
                <MenuBar/>
                <Card className="options_form" mt={5}>
                    <CardContent className="content">
                    <div className="options-data">
                        <h2>Escoja el campo para el que desea agregar una opción</h2>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item className="together">    
                                <AddCentros/>
                            </Grid>
                            <Grid item className="together">    
                                <AddEnfermedad/>
                            </Grid>
                            <Grid item className="together">    
                                <AddTrabajo/>
                            </Grid>
                        </Grid>
                        </div>
                    </CardContent>
                </Card>
                <Footer/>
            </div>
        );
    }
}

export default Options;