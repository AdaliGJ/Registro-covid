import React, {useContext} from 'react';
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import './importUser.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class ImportUsers extends React.Component{
    static contextType = LoginContext;
    
    constructor(props){
        super(props);
        this.state = {
           csv: '',
           file: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }
   
    handleChange = e => {
        if(e.target.files[0]){
            this.setState({csv:  e.target.files[0].name,
            file: e.target.files[0]});
            console.log(this.state.csv);
        }else{
            this.setState({csv: ''});
        }
    }

    submitData=()=>{
        const url = 'http://localhost/scripts/import_users.php';
            let formData = new FormData();
            formData.append('file', this.state.csv);
            formData.append('csv', this.state.file);
               
                axios.post(url, formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
                });
    }

   
    componentDidMount(){
        const context = this.context;   
    }
    
    render(){
        return(
            <div className="import-page">
                <MenuBar/>
                    <Card className="import-form">
                        <h1 align="center">Importar Población</h1>
                        <span id="message"></span>
                        <form id="sample_form">
                            <Grid container direction={"column"} spacing={1}>
                                <Grid item >
                                    <label >Seleccionar el archivo CSV</label>
                                </Grid>
                                <Grid item >
                                <TextField type="file" name="csv-file" id="csv-file" inputProps={{ accept: '.csv' }}  variant="outlined" onChange={this.handleChange}/>  
                                <label htmlFor="csv-file"> 
                                    <Button id="upload-csv" variant="contained" component="span">Seleccionar archivo</Button>
                                    <p>{this.state.csv !=''? this.state.csv : "Ningún archivo seleccionado"}</p>
                                </label> 
                                </Grid>
                                <Grid item >
                                    <input type="hidden" name="hidden_field" value="1" />
                                    <Button name="import" id="import" value="Enviar a la base de datos" onClick={this.submitData}>Enviar a la base de datos</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                <Footer/>
            </div>
        );
    }
}

export default ImportUsers;