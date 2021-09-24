import React from 'react';
import MenuBar from "./../AppBar/appBar.js";
import Footer from '../Footer/footer.js';
import { LoginContext } from '../../Context/LoginContext.js';
import './information.css';

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
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Information;