import React, {useContext} from 'react';
import './information.scss'
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
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
        tipo_usuario: null,
        baseUrl: 'http://localhost/webimages/'
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
                    <ImgCarousel slides={SliderData}/>
                    <DescImagen texto="Esta es la sección de inicio de nuestra página, navega para conocer más sobre la vacuna y registro" />
                    <TextoLado derecha={true} texto="Cada 21 de septiembre se conmemora el Día Mundial del Alzheimer, enfermedad que se caracteriza por la pérdida irreversible de las capacidades intelectuales" img={this.state.baseUrl + "8510c1d80ad0564ec5927fdaa5505e47_XL.jpg"}/>
                    <TextoLado derecha={false} texto="Los coronavirus son conocidos por provocar un amplio rango de enfermedades, desde un resfriado hasta infecciones respiratorias." img={this.state.baseUrl + "_115033548_gettyimages-1226314512.jpg"}/>
                    <TextoLado derecha={false} texto="Este es un texto de prueba para saber cómo se comporta la página si se le agregan noticias" img={this.state.baseUrl +"images.PNG"}/>
                    <TextoColumnas texto1='La Organización Mundial de la Salud -OMS- define un Sistema de Información Sanitaria como una estructura para la recolección, el proceso, el análisis y la transmisión de la información necesaria para organizar y hacer funcionar los servicios sanitarios.' 
                    texto2='Un SIS es la infraestructura esencial, recursos humanos y materiales y su interrelación, para la integración de datos de salud, cuyo objetivo es proveer información relacionada con la salud de la población en forma oportuna y confiable.' 
                    texto3='La reducción del mosquito Aedes, la eliminación de sus criaderos, evitar las picaduras y mejorar las condiciones ambientales de las viviendas y sus entornos siguen siendo las herramientas fundamentales de lucha para disminuir el riesgo de transmisión de la infección por el virus del Zika.' img ={this.state.baseUrl +"yo-me-vacuno-2.jpg"}/>
                    <DescImagen img={this.state.baseUrl +"65eb99de7f31e7479a8853734ca0c7ac_XL.jpg"} />
                    
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;