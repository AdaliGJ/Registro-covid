import React, {useContext} from 'react';
import './estado-vacunacion.scss'
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



class EstadoProceso extends React.Component{
    
    static contextType = LoginContext;
    state = {
        dpi_usuario: null,
        tipo_usuario: null
    };

    exportPDF=()=>{
        //const title = "Reportes Por Centro de Vacunación";
        //const headers = [["Centro", "Nombre Completo", "DPI Persona", "Género", "Fecha", "# de Dosis", "Vacuna Aplicada", "Nombre Vacuna"]];
        const doc = new jsPDF();

        /*if(this.state.centro!=0){
            doc.text("Reporte Centro de vacunación " + this.state.centro, 10, 10);
        }else{
            doc.text("Reporte Vacunación en todos los centros  ", 10, 10);
        }

        if(this.state.fecha1!='' && this.state.fecha2!=''){
            doc.text("Reporte Entre las fechas  " + this.state.fecha1+" y "+this.state.fecha2, 10, 20);
        }else if(this.state.fecha1=='' && this.state.fecha2!=''){
        }

        doc.autoTable({ html: '#tabla-centros', margin: { top: 30 } } );*/
        doc.save('tabla-centros.pdf');

    }
    
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
                   
                </div>
                <Footer/>
            </div>
        );
    }
}

export default EstadoProceso;