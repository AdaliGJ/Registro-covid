import React, {useContext} from 'react';
import './reportes.scss'
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import ReportesCentro from './reportes-centro';
import ReportesVacunas from './reportes-vacunas';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReportesHabilitadas from './reportes-habilitadas';


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
                <h1 className="title">Reportes</h1>
                    <ReportesCentro/>
                    <ReportesVacunas/>
                    <ReportesHabilitadas/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Reportes;