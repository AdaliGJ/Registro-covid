import React, {useContext} from 'react';
import './information.css'
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import axios from 'axios';
import TextoLado from '../ElementosPortal/texto-lado';
import TextoColumnas from '../ElementosPortal/texto-columnas';
import Acordeon from '../ElementosPortal/acordeon';
import DescImagen from '../ElementosPortal/img-descripcion'; 
import TabsImg from '../ElementosPortal/tabs';
import ImgCarousel from '../ElementosPortal/carrusel';
import {SliderData} from '../ElementosPortal/carrusel';

class Home extends React.Component{
    
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
                <MenuBar/>
                <div className="page">
                    <h3>Welcome, {this.state.dpi_usuario}</h3>
                    <ImgCarousel slides={SliderData}/>
                    <Acordeon titulo="Más información" texto="Este es un texto de prueba para saber cómo se comporta la página si se le agregan noticias"/>
                    <TextoLado derecha={true} texto="Este es un texto de prueba para saber cómo se comporta la página si se le agregan noticias" img="https://img.freepik.com/vector-gratis/verificacion-inyeccion-vacuna-covid-19-hipster-vintage-logo-vector-icono-ilustracion_7688-3267.jpg?size=338&ext=jpg"/>
                    <TextoLado derecha={false} texto="Este es un texto de prueba para saber cómo se comporta la página si se le agregan noticias" img="https://img.freepik.com/vector-gratis/verificacion-inyeccion-vacuna-covid-19-hipster-vintage-logo-vector-icono-ilustracion_7688-3267.jpg?size=338&ext=jpg"/>
                    <TextoLado derecha={false} texto="Este es un texto de prueba para saber cómo se comporta la página si se le agregan noticias" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo63Fxx3M-EXKuXuMmQTvUxhExnGU_0f76xQ&usqp=CAU"/>       
                    <TextoColumnas texto1='La Organización Mundial de la Salud -OMS- define un Sistema de Información Sanitaria como una estructura para la recolección, el proceso, el análisis y la transmisión de la información necesaria para organizar y hacer funcionar los servicios sanitarios.' 
                    texto2='Un SIS es la infraestructura esencial, recursos humanos y materiales y su interrelación, para la integración de datos de salud, cuyo objetivo es proveer información relacionada con la salud de la población en forma oportuna y confiable.' 
                    texto3='La reducción del mosquito Aedes, la eliminación de sus criaderos, evitar las picaduras y mejorar las condiciones ambientales de las viviendas y sus entornos siguen siendo las herramientas fundamentales de lucha para disminuir el riesgo de transmisión de la infección por el virus del Zika.' img ='https://www.mspas.gob.gt/images/images-slider/yo-me-vacuno-2.jpg'/>
                    <DescImagen img="https://www.mspas.gob.gt/media/k2/items/cache/65eb99de7f31e7479a8853734ca0c7ac_XL.jpg" 
                    texto="Foto: donación de OPS/OMS y Cooperación Alemana"/>
                    <TabsImg img="https://www.utel.edu.mx/blog/wp-content/uploads/2014/01/Copia-de-shutterstock_85785490.jpg" texto="Hola"/>
                    
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;