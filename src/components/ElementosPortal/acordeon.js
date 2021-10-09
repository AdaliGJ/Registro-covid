import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './elementos.scss';

class Acordeon extends Component{
    constructor(props){
        super(props);
        this.state={
            defaultExpanded: false,
            
        }

        this.change=this.change.bind(this);
    }

    change(){
        if(this.state.defaultExpanded){
            this.setState({
                defaultExpanded: false
            })
        }else{
            this.setState({
                defaultExpanded: true
            })
        }
    }

    render(){
    return (
    <div className="acordeon-expanded">
      <Accordion>
        <AccordionSummary style={{backgroundColor: "#230043", color: 'white'}}
          expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>} onClick={this.change}>
          <Typography><b>{this.props.titulo}</b></Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography>
            {this.props.texto}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>

  );
}
}

export default Acordeon;