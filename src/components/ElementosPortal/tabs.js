import React, {Component} from 'react';
import  Tab  from "@material-ui/core/Tab";
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

class TabsImg extends Component{
    constructor(props){
        super(props);
        this.state={
            value: "1"
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
      };

    render(){
        return (
            <div className="tab-box">
                <Box className='tab-content'>
                    <TabContext value={this.state.value} >
                        <Box className="tab-top">
                            <TabList onChange={this.handleChange} className="tab-list" TabIndicatorProps={{ style: { background: "#0ab200"} }}>
                            <Tab label={this.props.titulo1} value="1" />
                            <Tab label={this.props.titulo2} value="2" />
                            <Tab label={this.props.titulo3} value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">{this.props.texto1}
                            <img src={this.props.img1} className="img-tab"/>
                        </TabPanel>
                        <TabPanel value="2">{this.props.texto2}
                            <img src={this.props.img2} className="img-tab"/>
                        </TabPanel>
                        <TabPanel value="3">{this.props.texto3}
                        <img src={this.props.img3} className="img-tab"/>
                    </TabPanel>
                    </TabContext>
                </Box>
          </div>
        );
    }
}

export default TabsImg;