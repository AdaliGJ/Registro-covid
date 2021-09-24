import React from 'react';
import MenuBar from "../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Footer from '../Footer/footer.js';
import './information.css'


class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dPI: '',
            full_name: '',
            email: '',
            message: ''
        }

        this.mySubmit=this.mySubmit.bind(this);
    }

    mySubmit(event){
        console.log('this is the submit ' + this.state.dPI);
        console.log('this is the submit ' + this.state.full_name);
        console.log('this is the submit ' + this.state.email);
        console.log('this is the submit ' + this.state.message);
    }
    
    render(){
        return(
            <div className="contact">
                <MenuBar/>
                <Card className="contact_form" mt={5}>
                <CardContent className="content">
                <div className="contact-data">
                    <h2>Contáctenos si tiene una consulta</h2>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})}/>
                        </Grid>
                        <Grid item id="text-together">    
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})}/>
                            <hr/>
                            <TextField className="outlined-short" label="Email" type="email" variant="outlined" onInput={e=>this.setState({email: e.target.value})}/>
                        </Grid>
                            <Grid item>    
                            <TextField className="outlined-required" label="Mensaje" multiline rows={5} variant="outlined" onInput={e=>this.setState({message: e.target.value})}/>
                        </Grid>
                    </Grid>
                    </div>
                </CardContent>
                <CardActions>
                    <Button id="send" variant="contained" onClick={this.mySubmit}>Enviar Mensaje</Button>
                </CardActions>
                </Card>
                <Footer/>
            </div>
        );
    }
}

export default Contact;