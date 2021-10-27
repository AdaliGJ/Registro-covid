import React from 'react';
import MenuBar from "../AppBar/appBar.js";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Footer from '../Footer/footer.js';
import { Alert } from '@material-ui/lab';
import './information.scss'
//import emailjs from 'emailjs-com';
import axios from 'axios';




class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dPI: '',
            full_name: '',
            email: '',
            message: '',
            exito: 0
        }

        this.mySubmit=this.mySubmit.bind(this);
    }

    mySubmit=(event)=>{
        console.log('this is the submit ' + this.state.dPI);
        console.log('this is the submit ' + this.state.full_name);
        console.log('this is the submit ' + this.state.email);
        console.log('this is the submit ' + this.state.message);


        const url = 'http://localhost/scripts/contact.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dPI);
        formData.append('nombre', this.state.full_name);
        formData.append('email', this.state.email);
        formData.append('mensaje', this.state.message);

        axios.post(url, formData)
        .then((response)=> {
            console.log(response)
            this.setState({
                dPI: '',
                full_name: '',
                email: '',
                message: '',
                exito: 1
            });  
        })
        .catch((response)=> {
            console.log(response);
            this.setState({
                exito: 2
            });
        });
      

       /* emailjs.sendForm('service_regh45v', 'template_w0tcaex', '#form-contact', 'user_r9MFbHG6TPbku9LgciHCj')
            .then((response)=>{
                console.log('¡Éxito!', response.status, response.text);
                this.setState({
                    dPI: '',
                    full_name: '',
                    email: '',
                    message: '',
                    exito: 1
                });  
            }, (error)=> {
                console.log('FAILED...', error);
                this.setState({
                    exito: 2
                });  
            });*/

            
        }
    
    render(){
        return(
            <div className="contact">
                <MenuBar/>
                <Card className="contact_form" mt={5}>
                <CardContent className="content">
                <form className="contact-data" id="form-contact">
                    <h2>Contáctenos si tiene una consulta</h2>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <TextField className="outlined-required" label="DPI" type="number" variant="outlined" onInput={e=>this.setState({dPI: e.target.value})} value={this.state.dPI} name="dpi"/>
                        </Grid>
                        <Grid item id="text-together">    
                            <TextField className="outlined-short" label="Nombre Completo" type="text" variant="outlined" onInput={e=>this.setState({full_name: e.target.value})} value={this.state.full_name} name="nombre"/>
                            <hr/>
                            <TextField className="outlined-short" label="Email" type="email" variant="outlined" onInput={e=>this.setState({email: e.target.value})} name="email" value={this.state.email}/>
                        </Grid>
                            <Grid item>    
                            <TextField className="outlined-required" label="Mensaje" multiline rows={5} variant="outlined" onInput={e=>this.setState({message: e.target.value})} value={this.state.message} name="message"/>
                        </Grid>
                        {this.state.exito==1?
                        <Alert severity="success">Mensaje enviado con éxito, le responderemos tan pronto nos sea posible</Alert>: 
                        this.state.exito ==2? <Alert  severity="error">Ha ocurrido un error al enviar el mensaje, intente de nuevo</Alert>: <p></p>}
                    </Grid>
                    </form>
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