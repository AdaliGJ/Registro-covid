import React, {Component} from 'react';
import MenuBar from "./../AppBar/appBar.js";
import Footer from '../Footer/footer.js';
import { LoginContext } from '../../Context/LoginContext.js';
import TextoLado from '../ElementosPortal/texto-lado';
import DescImagen from '../ElementosPortal/img-descripcion'; 
import axios from 'axios';
import InsertTextoLado from '../Modals/texto-lado-modal.js';
import InsertImgDesc from '../Modals/texto-desc-modal.js';
import { Edit, Delete } from '@material-ui/icons';
import { ButtonGroup } from '@material-ui/core';
import './information.scss';

class News extends Component {
    
    static contextType = LoginContext;
    constructor(props){
        super(props);
        this.state = {
            dpi_usuario: null,
            usuario_tipo: null,
            baseURL: "http://localhost/webimages/",
            img_desc: [],
            titulos: [],
            texto: [],
            texto_lado: [],
            formTextoLado:{
               archivo: null,
               img: '',
               texto:'',
               derecha: false,
               openModal: false,
               id: null 
            },
            formImgDesc:{
                archivo: null,
                img: '',
                texto:'',
                id: null 
             }
        };
        this.sumbitTL=this.sumbitTL.bind(this);
        this.updateTL=this.updateTL.bind(this);
        this.editTextoLado=this.editTextoLado.bind(this);
        this.getTextoLado=this.getTextoLado.bind(this);

        this.getImagenDesc=this.getImagenDesc.bind(this);
        this.updateID=this.updateID.bind(this);
        this.submitID=this.submitID.bind(this);
        this.editImgDesc=this.editImgDesc.bind(this);
    }

    sumbitTL=(imagen, texto_p, derecha_p)=>{
        
        console.log(texto_p);
        console.log(imagen);
        console.log(derecha_p);
        const url = 'http://localhost/scripts/texto_lado.php';
        let formData = new FormData();
        
          formData.append('img', imagen);
          formData.append('texto', texto_p);
          formData.append('derecha', derecha_p);
          
    
        axios.post(url, formData)
            .then(response=> {
                console.log(response);
                this.getTextoLado();
            })
            .catch(function (response) {
                console.log(response);
            });
    
      }

    submitID=(imagen, texto_p)=>{
        console.log(texto_p);
        console.log(imagen);
        const url = 'http://localhost/scripts/img_desc.php';
        let formData = new FormData();
        
          formData.append('img', imagen);
          formData.append('texto', texto_p);
          
        axios.post(url, formData)
            .then(response=> {
                console.log(response);
                this.getImagenDesc();
            })
            .catch(function (response) {
                console.log(response);
            });
    
    }  

    updateTL=(imagen, texto_p, derecha_p, img_name)=>{
        const url = 'http://localhost/scripts/texto_lado2.php';
        let formData = new FormData();
        
          formData.append('id', this.state.formTextoLado.id);
          formData.append('img', imagen);
          formData.append('imagen', img_name);
          formData.append('texto', texto_p);
          formData.append('derecha', derecha_p);

        axios.post(url, formData)
            .then(response=> {
                console.log(response);
                console.log(this.state.formTextoLado.id);
                this.getTextoLado();
            })
            .catch(function (response) {
                console.log(response);
            });

        this.getTextoLado();    
    }

    updateID=(imagen, texto_p, img_name)=>{
        const url = 'http://localhost/scripts/img_desc2.php';
        let formData = new FormData();
        
          formData.append('id', this.state.formImgDesc.id);
          formData.append('img', imagen);
          formData.append('imagen', img_name);
          formData.append('texto', texto_p);

        axios.post(url, formData)
            .then(response=> {
                console.log(response);
                console.log(this.state.formImgDesc.id);
                this.getImagenDesc();
            })
            .catch(function (response) {
                console.log(response);
            });

        //this.getTextoLado(); 
    }
    
    getTextoLado=()=>{
        const url4 = 'http://localhost/scripts/texto_lado.php';
        axios.get(url4).then(response => response.data)
             .then((data) => {
                this.setState({texto_lado: data})
                console.log(this.state.texto_lado)
        });
    }

    getImagenDesc=()=>{
        const url = 'http://localhost/scripts/img_desc.php';

        axios.get(url).then(response => response.data)
             .then((data) => {
                this.setState({img_desc: data})
                console.log(this.state.img_desc)
        });
    }

    editTextoLado=(texto_lado)=>{
       this.setState({
           formTextoLado:{
            archivo: texto_lado.archivo,
            img: texto_lado.img,
            texto: texto_lado.texto,
            derecha: texto_lado.derecha,
            openModal: true,
            id: texto_lado.id_imagen_texto 
           }
       })
       console.log(texto_lado);
    }

    editImgDesc=(texto_img)=>{
        this.setState({
            formImgDesc:{
             archivo: texto_img.archivo,
             img: texto_img.imagen,
             texto: texto_img.descripcion,
             openModal: true,
             id: texto_img.id_imagen_desc
            }
        })
        console.log(texto_img);
     }
      
    componentDidMount(){
        const context = this.context;
        this.setState({dpi_usuario: context.username,
        usuario_tipo: context.tipoUsuario});

        console.log(this.state.usuario_tipo);

        this.getImagenDesc();
        
        const url2 = 'http://localhost/scripts/texto_html.php';
        axios.get(url2).then(response => response.data)
             .then((data) => {
                this.setState({texto: data})
                console.log(this.state.texto)
        });

        const url3 = 'http://localhost/scripts/titulo.php';
        axios.get(url3).then(response => response.data)
             .then((data) => {
                this.setState({titulos: data})
                console.log(this.state.titulos)
        });

        this.getTextoLado();
        
    }
    render(){
        return(
            <div>
                <div className="page">
                    <MenuBar/>
                    <h3>Welcome, {this.state.dpi_usuario}</h3>
                    <ButtonGroup>
                        <InsertTextoLado submit={this.sumbitTL} datos={this.state.formTextoLado} titulo='Agregar texto-lado' /*lado={null}*//>
                        <InsertImgDesc submit={this.submitID} datos={this.state.formImgDesc} titulo='Agregar imagen-descripcion' /*lado={null}*//> 
                    </ButtonGroup>
                    {this.state.titulos.map((titulo)=>(
                        <h1 key={titulo.id_titulo + ' 3'}>{titulo.texto}</h1>
                    ))}
                    {this.state.img_desc.map((imagen)=>(
                        <DescImagen key={imagen.id_imagen_desc + ' 1'} img= {this.state.baseURL+imagen.imagen} texto={imagen.descripcion} usuario={this.state.usuario_tipo} edit={<InsertImgDesc submit={this.updateID} datos={{texto: imagen.descripcion, img: imagen.imagen}} titulo={<Edit onClick={()=>this.editImgDesc(imagen)}/>} comp={true}/>}/>
                    ))}
                    {this.state.texto.map((text)=>(
                        <DescImagen key={text.id_titulo + ' 2'} texto={text.texto} />
                    ))}
                    {this.state.texto_lado.map((lado)=>(
                        <TextoLado key={lado.id_imagen_texto+' 4'} derecha={lado.derecha} texto={lado.texto} img={this.state.baseURL+lado.imagen} usuario={this.state.usuario_tipo} edit={<InsertTextoLado submit={this.updateTL} datos={{openModal: false, texto: lado.texto, img: lado.imagen, derecha: lado.derecha}} titulo={<Edit onClick={()=>this.editTextoLado(lado)}/>} lado={true}/>} />
                    ))}
                   
                    
    
                </div>
                <Footer/>
            </div>
        );
    }
}

export default News;