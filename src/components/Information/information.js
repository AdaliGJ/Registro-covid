import React from 'react';
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

class Information extends React.Component{

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
                    <Acordeon titulo="Sobre nosotros" texto="El Ministerio de Salud Pública y Asistencia Social de la República de Guatemala (MSPAS) le corresponde formular las políticas y hacer cumplir el régimen jurídico relativo a la salud preventiva y curativa y a las acciones de protección, promoción, recuperación y rehabilitación de la salud física y mental de los habitantes del país y a la preservación higiénica de medio ambiente; a la orientación y coordinación de la cooperación técnica y financiera en salud y a velar por el cumplimiento de los tratados y convenios internacionales relacionados con la salud en casos de emergencias por epidemias y desastres naturales."/>
                    <Acordeon titulo="Vacunación" texto="Selecciona el botón de registro para ingresar tus datos y poder obtener tu vacuna."/>
                    <TextoColumnas img="https://www.mspas.gob.gt/images/files/proyectos/cruzadanutricion/priorizacion.svg" texto1="Guatemala es uno de los países en Latinoamérica más afectados por diferentes Problemas nutricionales, siendo la desnutrición crónica el problema que prevalece más y afectan a uno de cada dos niños menores de 5 años. La población más afectada es la niñez indígena y rural por los altos índices de pobreza, analfabetismo etc. (Principalmente en los departamentos del occidente y norte del país.)"
                    texto2="La Gran Cruzada Nacional por la Nutrición, como prioridad de gobierno buscará unir a todos los sectores del país con la finalidad de mejorar la nutrición de las familias guatemaltecas, pero sobre todo con énfasis en las áreas más pobres y marginadas de Guatemala aplicando un enfoque integral que responda a la multi causalidad del problema."
                    texto3="Las principales entidades de Gobierno que dirigirán la Gran Cruzada Nacional por la Nutrición son los ministerios de Salud Pública y Asistencia Social; de Desarrollo Social; de Educación; de Agricultura, Ganadería y Alimentación; de Ambiente y Recursos Naturales, y la Secretaría de Seguridad Alimentaria y Nutricional."/>
                    <TabsImg img1="https://www.mspas.gob.gt/images/about/team/CVministro-MSPAS.jpeg" titulo1="DR.Francisco José Coma Martín" texto1 ="Ministro de Salud"
                    img2="https://www.mspas.gob.gt/images/about/team/Viceministro-Administrativo-mspas.jpg" titulo2="Ariel Estuardo Hernández Cardona" texto2 ="Viceministro de Salud"
                    img3="https://www.mspas.gob.gt/images/about/team/vice-tecnico-Leslie-Samayoa.jpg" titulo3="M.A. Leslie Samayoa" texto3 ="Viceministra Técnica"/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Information;