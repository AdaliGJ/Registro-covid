import React, {useContext} from 'react';
import './reportes.scss'
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import ReportesCentro from './reportes-centro';


class Reportes extends React.Component{
    
    static contextType = LoginContext;
    state = {
        dpi_usuario: null,
        tipo_usuario: null
    };
    
    componentDidMount(){
        const context = this.context;
        this.setState({dpi_usuario: context.username,
        tipo_usuario: context.tipoUsuario});
        
    }
    
    render(){
        return(
            <div>
                <MenuBar/>
                <div className="page">
                    <ReportesCentro/>
                    
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Reportes;