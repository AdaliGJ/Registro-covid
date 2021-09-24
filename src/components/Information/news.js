import MenuBar from "../AppBar/appBar.js";
import React, {useRef, useContext, useState} from 'react';
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import './information.js';

function News(){
    
    const { username } = useContext(LoginContext);

        return(
            <div>
                <div className="page">
                    <MenuBar/>
                    <h3>Welcome, {username}</h3>
                </div>
                <Footer/>
            </div>
        );
}

export default News;