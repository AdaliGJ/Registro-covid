import React, {Component} from 'react';
import MenuBar from "./../AppBar/appBar.js";
import Footer from '../Footer/footer.js';
import { LoginContext } from '../../Context/LoginContext.js';
import TextoLado from '../ElementosPortal/texto-lado';
import TextoColumnas from '../ElementosPortal/texto-columnas';
import Acordeon from '../ElementosPortal/acordeon';
import DescImagen from '../ElementosPortal/img-descripcion'; 
import TabsImg from '../ElementosPortal/tabs';
import ImgCarousel from '../ElementosPortal/carrusel';
import {SliderData} from '../ElementosPortal/carrusel';
import './information.scss';

class News extends Component {
    
    static contextType = LoginContext;
    state = {
        dpi_usuario: null,
    };
    
    componentDidMount(){
        const context = this.context;
        this.setState({dpi_usuario: context.username});
        
    }
    render(){
        return(
            <div>
                <div className="page">
                    <MenuBar/>
                    <h3>Welcome, {this.state.dpi_usuario}</h3>
                    <DescImagen img="https://www.mspas.gob.gt/media/k2/items/cache/3de303a43620aac779205f8a1027a16c_XL.jpg" texto="Foto: Guatemala recibe vacunas Pfizer compradas a través del mecanismo COVAX"/>
                    <h1>Noticias Actuales</h1>
                    <TextoLado derecha={true} texto=" Este martes ingresaron al país las 3 millones de dosis de vacunas de la casa Moderna, que fueron donadas por el Gobierno de Estados Unidos. La entrega de este donativo se anunció el fin de semana recién pasado; lo cual se suma a las 1.5 millones de vacunas enviadas a Guatemala el 8 de julio de 2021." img="https://www.mspas.gob.gt/media/k2/items/cache/f863e4fb1b47b206b2276d9b70a5b183_XL.jpg"/>
                    <TextoLado derecha={false} texto="Luego del arribo al país de 310 mil dosis de vacuna Sputnik V, 250 mil de primera dosis y 60 mil de segunda, los inmunizantes se llevaron al Centro Nacional de Biológicos donde se resguardan a una temperatura de entre -18 y -20 °C, hasta que sean entregadas a las Áreas de Salud para su administración, según las fases del Plan Nacional de Vacunación COVID-19." img="https://www.mspas.gob.gt/media/k2/items/cache/7a4010c728df5112a2a660b7127561f8_XL.jpg"/>
                    <DescImagen texto="Continúa viendo las noticias más relevantes" />
                    <TextoLado derecha={true} texto="La ministra de Salud, Amelia Flores, brindó información de los logros obtenidos por el Ministerio de Salud Pública y Asistencia Social -MSPAS- durante el primer cuatrimestre del 2021. Lo anterior como parte del nuevo Mecanismo de Rendición de Cuentas del Organismo Ejecutivo, el cual se instauró por instrucciones del presidente Alejandro Giammattei." img="https://www.mspas.gob.gt/media/k2/items/cache/670539864e65359b2f613197e806fc23_XL.jpg"/>
                    <TextoLado derecha={false} texto="La Organización Panamericana de la Salud / Organización Mundial de la Salud (OPS/OMS), con el apoyo financiero del Fondo Central para la Acción en Casos de Emergencia (CERF por sus siglas en inglés), de la Organización de las Naciones Unidas (ONU) entregó un Módulo de Atención de Emergencia Temporal como apoyo al Ministerio de Salud Pública y Asistencia Social (MSPAS) y a los servicios de salud que sufrieron daños en su infraestructura durante el paso de las tormentas tropicales Eta e Iota." img="https://www.mspas.gob.gt/media/k2/items/cache/51fd4e073a5c230f82bf528d466f6b2c_XL.jpg"/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default News;