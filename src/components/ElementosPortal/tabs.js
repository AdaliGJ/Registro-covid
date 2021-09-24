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
            <Box className="tab-box">
                <TabContext value={this.state.value}>
                    <Box className="tab-top">
                        <TabList onChange={this.handleChange}>
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{this.props.texto}
                        <img src={this.props.img} className="img-tab"/>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
          </Box>
        );
    }
}

export default TabsImg;