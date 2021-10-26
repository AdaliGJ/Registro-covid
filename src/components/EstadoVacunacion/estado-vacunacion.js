import React, {useContext} from 'react';
import './estado-vacunacion.scss'
import MenuBar from "../AppBar/appBar.js";
import {LoginContext} from "../../Context/LoginContext.js";
import Footer from '../Footer/footer.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@material-ui/core';
import axios from 'axios';
import ConsultaPDF from './consultaPDF';



class EstadoProceso extends React.Component{
    
    static contextType = LoginContext;
    constructor(props){
        super(props);
        this.state = {
            dpi_usuario: null,
            tipo_usuario: null,
            fecha: new Date().toDateString(),
            infoUsuario: {
                dpi_persona: '',
                dosis_vacuna: null,
                fecha_creacion: '',
                fecha_inscripcion: '',
                fecha_primera_dosis: '',
                fecha_segunda_dosis: '',
                fecha_tercera_dosis: '',
                id_archivo: '',
                nombre_completo: '',
                primera_dosis: '',
                segunda_dosis: '',
                tercera_dosis: '',
                vacuna: '',
                nombre_vacuna: ''

            }
        };
        this.exportPDF=this.exportPDF.bind(this);
        this.enviar_datos=this.enviar_datos.bind(this);
    }

    enviar_datos=()=>{
        const url = 'http://localhost/scripts/pdf.php';

        let formData = new FormData();
        formData.append('dpi', this.state.dpi_usuario);

        axios.post(url, formData)
        .then((response)=>{
            console.log(response);
        })
        .catch((response)=>{
            console.log(response);
        }).finally(()=>{
            axios.get(url, {params: {dpi: this.state.dpi_usuario}}).then(response => response.data)
             .then((data) => {
                this.setState({infoUsuario: data[0]})
                console.log(this.state.infoUsuario)
            }).finally(()=>{
                this.exportPDF();
            });
        });
       
       
        
    }

    exportPDF=()=>{
        var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAACdCAIAAAASbNhQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABVFSURBVHhe7Z1BbuQ4loYbSAxQqERlT3fOXKBvYsC56kvU3jByU4fofdrbPMTs4i7hs+QwTFqiflISRYoUI+L78DXQZUsK6SnjvV9S2P7bP7/8LyIiXpG//9/fdvcXQGUIHIiI16QEhV10AwGgJgQORMRrUrJCuW4aAFSGwIGIeDVKVijXjQKA+hA4EBGvQ8kKu+hGAUB9CByIiFegBIVddHMAoAkEDkTE3pWgsItuCAC0gsCBiNi1EhR20U0AgIYQOBARu1ayQrmu/QO0hcCBiNivkhXKdb0foDkEDkTETpWsUK5r/ABHQOBAROxRyQrluq4PcBAEDkTE7pSsUK5r+QDHQeBAROxLyQrlun4PcCgEDkTEvpS4UK7r9wCHkh84/vHlf3CTUkBExFDJCuW6Zg9wNASOdkoBERFFyQrluk4P0AEEjnZKARERfSUrlOvaPEAfEDjaKQVERByUrFCu6/EA3UDgaKcUEBHRKlmhXNfgAXqCwNFOKSAiolXiQqGuuwN0BoGjnVJARESjxIVCXWsH6A8CRzulgIiIEhcKdX0doEsIHO2UAiLinStxoVDX1AF6hcDRTikgIt6zEhcKdR0doGMIHO2UAiLiPSuJoVDX0QE6hsDRTikgIt6tEhcKde0coG8IHO2UAiLifSpxoVDXywG6h8DRTikgIt6hEhcKdY0c4BogcLRTCoiI96bEhUJdFwe4Eggc7ZQCIuJdKXGhUNfCAa4HAkc7pYCIeFdKYijR9W+Aq6LfwPHlz9/N++rzz09///cf8q1sh22a/yPfaqAUEBHvxyErlOuaN8C10Wng+Pyf//LfYH/89ZsskGGNbW5SCoiId6LfeQp1nRvgCukxcEgysBbmgxrb3KoUEBHvQWk7Jbq2DXCddBc4osnAmp0PamwzQykgIt680nAKdW0b4DrpK3AsJANrRj6osc08pYCIeNtKqynU9WyAq6WjwBEmgy9//h5+cVM+WE0b1jaZQwqIiLet9JkSXcMGuGZ6CRxhMrA/nPLf//pnduZITBvWBplDCuj79cv3kzsjMc6vj/7CD99fTm9n9z3D2/n0+vzwbX07I6dnb4Pv23z1Nvjr/OOyNXF24+fLDrw8RVbxfXx6PZkl3ToXzue304/vjw+6ZOjMS7+dzyd53cWdXHqtvN0L1nK7ZM/XXqc1tEIxbYni53HTgaBVOkyJrs4AV04XgWMubVjzMsemtGGtnTmkgL4y7wPGfPD44819TbksszIYRjRw6GZjI2RtJ81ap+fYwDOj9LS0ppmUK2Fl5aW9vV3bybfT07jZj1Vydm95LZvY9jqtdhlr9WIagvOYfiBold5SoqsxwPVzfOBYThvWrZkjI21Yq2YOKaBv4kD9+rQQJ95eHjIDx9cv31705S9bGxZwi60Oqgu6YuIuRe+pDK6/9Ol76pJ67Dm7t7pWUuBIPq3pr2spLeaF6eumHQhapauU6CoMcBMcHDhS0oY1PXNkpw1rvcwhBfT1G3p4CT74PE6b8Rr068O358ut+MhVpj/JFjY7vvr5dUge4dCa28lHueb27zdIlDm/ym67r19YukqOvvTjkz8F3erRJc1ueKWbfD1v9/ytvd8PcLUyG3x/2BEJHAv1TzytVYtpXDqPaQeCRuknJbqKA9wKRwaO9LRhTckchWnDWilzSAF9Uxr6ZN58XNAvmxg4hvv5Zkx69/Z1aC3s5OxE96/dY/vsP0pYuC6fnZHj6u6KfG5J/97A8EJ5u+e/hD+VQ/c9rbWLefnW3HlMOBA0Sicp0ZUb4IY4LHBsTRvW5cyxS9qw1sgcUkDfzZMp9sgjNCVweJu9bHNpGi3u5ORu/8c49KZXfIcna80P77mX9g5wLXDEvp63e9GRHHW5Ytb001q7mO67sfOYciBolDaSras1wG1xTODISxvWucyxY9qw7p45pIC+fkMPGO80+JewhvefYhg3EpoUOIaXfh9RCxfcq1PHm4iXfZ5samb+Tcft7IOAuZdOvMNx+QGQ8VU+lszavcQdtu54WhsUc1DOo/lK4oHcudJAsnV1Bbg5DggcJWnDGs0cNdw3c0gBfRMb+uXqM1zO+wyBmBI4hmk33IT35t9klqwOKlkxeq0cGo630OhLPz55xfiYwYuVvDA+GcnavcS7CNYdT2vtYvqG/wASD+SeldaRrSsqwC3SOnCUpw3rNWYOKaBvekO/XMVOPh7oOMeG0Grg8MbYeJd+biBtHVSVZmSUYX+Wlpz+0o683ZustVPguCy5dloJHD0rTaNEV1SAW6R14JB3V17asLbJHJ9/fpLXzVYK6Ls6A8TLM4JgPoWfE1wPHMMC3uyc3Jn3ZtvWQdUscPgHvrjk5KMPjQNH4WntJ3CkHMhdKR2jRFdigBulaeAwEUHeYF/+/F2W2WSbmxzyotlKAX3zGrpJBss/DLkaOLz5NMe4zdWdHLf2PoknwWVmNqcsY/RfeuT9N2PKxx3CnZysO5erkndv8pX5oW7d8bTm7a0sYN16Hs1X8g7kHpReUaKrL8Dt0voOxx9//SZvs+zM0SZtFEYiXymgb0lD965H9YcXlgPH5KJ5nmHF5Z2MXoKvXnAnXrin1ye65Fwd8nbPW0sLLu57WtsUM7qRkgO5baVdZOuKC3DTtA4c0ecgGUO9TdowryKvW6IU0LekoXvTVOfQSuDwvrtEwtR5vyh33zIM3/WmZuSJjzG6Vmh6faJLToaod+mft3uTus3fSDDue1obFHPuPJYcyA0r7SJbV1mAW6d14DCWZ45rTBtGKaBvSkN/X0b/oNfjw+s4IILhtxw4xtESuxoOr7DndnLxN416k958x/vzafp5hZ0m9+xOBodzWThr92Qts1rJbxpNP621i8lvGt2ktItsXVkB7oADAoexJHNcadowSgF9/YYe43KNu7ZMZBIsBA5/ekVHiP9y4ficR58y+Nfl8+z2bGJuycnOewErb/fWbw69v8RaxTaf1t2LOc9kIykHMix8D0q7yNbVD+A+OCZwGPMyRzRt2LXMBs3/kW/lWSNtGKWAvuWTKXqPfSlwBHfsxcn19PvF7vqgCv7KqPXxR+TXTIzMrOXrv3Rm4Jj/sGfe7k1+C0hAWkTLOa37FjNOsJGUA/GXv22lXWTrigdwNxwWOIxbM8dC2hj8+7//kAW2WiltGKWAvnqXXnEN/fH9zvnZ7/2Xn9QYb62L3pzQq97l5ynW5/F6+n00mp2MjZ2z+2mRSOIZvPx1MTMpz/4FujmQyS/GWHByIKmBQ5dcil9Zu3f5xMPMWtGHIAHZp7WsmNvPY+KB3IPSLrJ1lQO4J44MHMb0zBFNG0azBX8x85+ywCbrpQ2jFBARr07pGHm67gtwZxwcOIwpmWMubRglcBhlgXSrpg2jFBARr0vpGHm61gtwfxwfOIzLmWMhbRglmpj/lAUSrZ02jFJARLwipWNk61ovwP3RReAwzmWO5bRh/Pzzk1nMrG7sOW0YpYCIeC1Kx8jW9V2Au6SXwGGMZo5Qe0tjOV6kLDPYJm0YpYCIeBVKx8jWNV2Ae6WjwGFczRw2SQxGfyYlZZnBZmnDKAVExP6VjpGt67gAd0xfgcO4nDnMd2VhWcCYsoy1ZdowSgERsXOlY2Tr2i3AfdNd4DCmBw6jLGBMWcb6x1+/yZJVlQIiYudKx8jT9VqAu6e7wLHpkUr0Ixopywy2zBxSQETsWekVebpGCwC9BY7ltGFM+ZmUrT+30ixzSAERsVulS+TpuiwAvNNR4FhNG3OaVGFWT4wX5lXCF2qTOaSAiNin0h/ydC0WAD7oJXAUpo3BlJ9JMdHkkMwhBcRO9P+uW/Rv4OFdKZ0hT/fvCQA8uggc2WnDaNKDvynzn7LAoE0bw2LtM4cUEHtwkjbm/44d3onSE/J0/54AYMrxgaMkbRglcBhlAaufNqztM4cUEHtw+Ku53NtAozSEDN2/JwAIODhwFKYNozxSiX6MI0wb1saZQwqIh/vo/mD924m0gaQNgMocGTjK04Zx9WdS5tKGtWXmkAIiYj9KE8jTtVUAiHFY4Nglbay6nDaszTKHFHBwuKv/69fpOfiu9fn09rGIfs7g68Prx4cQLqw+Gnh8ej2d37xV3s7n08vTt8f373798n3YndNTZFNf3V0Bw+n54eOL3ichDOGHIcxmPxYY1/Ld+SjGrb29PE1WtAar/zqf304/vj8G+1Z+aNi/8vbP0/4jAIA5jgkc/aQNa5vMIQUcfPzxESYuM16/a/RDQDiJ/dUvnF/t0A39+vD95M/YKXbLy69l9ALH28sYOMa1LHIg3gLjWr47H4UXX3RPFlc3uyePV8oPDTtX3vh5un8CADDPAYGjt7RhbZA5pICDk5EW+0GJ6Ix335pef78TH3vh4BT2DRxyIMtTef+jmAkcq6tb/AMvPDTsXHnL5+nOPwAs0jpwmBEu79Uabk0b1mjmkA+lligF9F1+qjJ+N7juHyfr+XWY2dGg4L2EWeL0/OCWMcP+/fnCToHj/HZ2uzGZvstTef+jiAUOjTXn1/GR0MO38aHVhfEsFB4adq683zN0Jx8A1mgdOOS9WsO8tGENM8fnn59kmWylgL7eFA/v2I9jMpzBw5MI8y3vqYSmFn8ALzytMJYGjl+nl2E3vDsBy1N5/6OIBg6vyNE7Sf5jneHYCw8Ne9Z/p+fpzjwAJNA0cJhxLm/XGhbekwjvwcgC2UoBfRfGvDc7gwE8ZpHLqItOWat/Y0C+JS7siXU1cDzHBvDCVK5yFLGNeKvrPlj9Yx8CTcmhYc/K2zxDd9oBII3WdzjCZxY1zM4cYdrY8WMcUkBxHIfTa/fxsju4KB/H6vsqk0cGk0tw/1GCphbRH7q5gSOyzwtTucpRBIFjsvrM3ZHoS5QcGnarvM0zdOccAJJpHTguzyx+fpK3bg0zMkeYNnZ8nmKUAoozg3wcgeE1/TD8hmTgPRQYR7KfIeZm7aC/cHbgCGfwwlSuchSRwOGtHkS3Qe8uSDxwbDo07FN5m2foTjgAbKF14DDWyByfY38DdlPmqJ02jFJA0Z+Iw+j1Buc4et23YnMuHLTTJRsFDvMVuRMQ3du5r+9wFNUCh/lK4qFhn8rbPEN3tgFgIwcEDuO+mcN+SjT8vKcxMXM0SBtGKWBo+FRFZpvvOPi96Rt9HrFtVHsLlwQOb08ui81N5VpHUTNwJB4adqi8zTN0pxoAtnNM4DDulTls2hi3uT1ztEkbRilgqMzy5ecp3micIxyQBvfFOf3BXBI4Jkuevs9N5VpHEQkc3uozeSW6TPahYW/K2zxDd54BIIvDAoexPHP4aWPc5pbM0SxtGKWAoTLsvamp89VfcoEhpnhzfWUoTrYcuxOw9gEL/4vD/DZfjEzlikcReygT3r0Qo8eed2jYofJO36o7yQCQy5GBw1iSOcK0YU3PHC3ThlEKGHUciufX55TnKcsMU9NffvF5xPKNhLn7BNGpfPn6x+uefwx/cMQLHPWOIhY4vKgUv3nj324Z1so7NOxNeadv1Z5gACjh4MBhzMscc2nDmpI5GqcNoxQwqjdTh99rOQ6/wXE0rtyEcCNQ7yXM/47O6ep2SbdZ+Ssk/syencpDQDmfPtYdp3K9o4gGDln9fBr/VJs5tBf/N42mZKnFQ8OulHf6Vu3ZBYBCjg8cxq2ZYzltWJczR/u0YZQCRtWZeiG8zTAuE2YRoz9uh1iwfjthuJEQ2YcQmb7xqXz5lr5uJD3sfhTRwGGcZKlZJrkh49CwK+WdvlV3bgGgmC4ChzE9c6SkDetc5jgkbRilgHP6N/YvBFf/3pzTEWidJAbvYv3xyb9DoUzuWDxc7hbM4t32cMsvTOXJMxrDR+CoeRRzgeOy+o+l1Xc5NOxHeadv1Z1YANiDXgKHMSVzpKcNazRziG3ShlEKOKeZxN4Uewuv/pefRFjHz39Mx6SZkc9m4p79C/238/n08vRNPhLx8ZAisqS/mHWcyufXMD1M4stHdKh6FF7geHsJCnj5U20zq8uSxoxDw06Ud3qG7swCwB50FDiMy5lja9qwLmeOZmnDKAVExHrKOz1D1yMBYCf6ChzGucyRlzasc5mjZdowSgERsZLyTs/QNUgA2I/uAocxzBwlacMaZo7GacMoBUTESvrv9AxddwSAXekxcBj9fLDwa7s2abZpNmU2aKLGXtvcpBQQEWto+0a2rjUCwN50GjisJiLIV8qtsc1EpYCIuLuSHrbq+iIAVKDrwHFjSgERcV8lPWzVNUUAqAOBo51SQETcUUkPW3UdEQCqQeBopxQQEfdS0sNWXTsEgJoQONopBUTEXZT0sFXXCwGgMgSOdkoBEbFcSQ9bdY0QAOpD4GinFBARC5X0sFXXBQGgCQSOdkoBEbFQCRCbdC0QAFpB4GinFBARS5QAsUnX/wCgIQSOdkoBETFbCRCbdM0PANpC4GinFBAR85QAsUnX+QCgOQSOdkoBETFDCRCbdG0PAI6AwNFOKSAiblUCxCZdzwOAgyBwtFMKiIiblACxSdfwAOA4CBztlAIiYroSIDbpuh0AHAqBo51SQERMVALEJl2rA4CjyQ8ciIgNlACxSdfnAKADCByI2K8SIDbpmhwA9AGBAxE7VQLEJl2HA4BuIHAgYo9KgEjX9TYA6AwCByJ2p2SIdF1jA4D+IHAgYl9KhkjXdTUA6BICByJ2pGSIdF1LA4BeIXAgYi9KhkjX9TMA6BgCByJ2oWSIdF0zA4C+IXAg4vFKhkjUtTEAuAYIHIh4sBIjEnU9DACuBAIHIh6pxIhEXQMDgOuBwIGIhykxIlHXvQDgqiBwIOIBSoZI1PUtALhCCByI2FqJEYm6pgUA1wmBAxGbKjEiRdeuAOCaIXAgYjslSaToehUAXDkEDkRsocSIFF2XAoCbgMCBiNWVJLGq608AcEMQOBCxopIkVnWdCQBuDgIHItZSwsSyricBwI1C4EDEPZUYkaLrRgBw0xA4EHEHJUOk6JoQANwHBA5ELFWSxLKu9wDAnUHgQMQiTR+RSBHVdhwAuFsIHIiYo2sh70i2GHTfBgAwgcP8T/oIIqJo+8UC5AwAWGbSGqTFIOId6toBAMCucC0CAAAA1SFwAAAAQHUIHAAAAFAdAgcAAABUh8ABAAAA1SFwAAAAQHUIHAAAAFAdAgcAAABUh8ABAAAA1SFwAAAAQHUIHAAAAFAdAgcAAABUh8ABAAAA1SFwAAAAQHUIHAAAAFAdAgcAAABUh8ABAAAA1SFwAAAAQHUIHAAAAFAdAgcAAABUh8ABAAAAlfn16/8B49L3nKKchSQAAAAASUVORK5CYII=';
        
        var primera;
        var segunda;
        var tercera;

        var int1 = this.state.infoUsuario.primera_dosis==null? 0 : this.state.infoUsuario.primera_dosis;
        var int2 = this.state.infoUsuario.segunda_dosis==null? 0 : this.state.infoUsuario.segunda_dosis;
        var int3 = this.state.infoUsuario.tercera_dosis==null? 0 : this.state.infoUsuario.tercera_dosis;

        var completo = 'Incompleto';

        if(this.state.infoUsuario.fecha_primera_dosis == null || this.state.infoUsuario.fecha_primera_dosis == '0000-00-00'){
            primera = 'No programada';
        }else if (this.state.infoUsuario.primera_dosis == 1){
            primera = 'Efectuada';
        }else{
            primera = 'Programada';
        }
        
        if(this.state.infoUsuario.dosis_vacuna == 1){
            segunda = 'No aplica';
            tercera = 'No aplica';
            if(this.state.infoUsuario.fecha_primera_dosis == null || this.state.infoUsuario.fecha_primera_dosis == '0000-00-00'){
                primera = 'No programada';
            }else if (this.state.infoUsuario.primera_dosis == 1){
                primera = 'Efectuada';
            }else{
                primera = 'Programada';
            }
        }

        if(this.state.infoUsuario.dosis_vacuna == 2){
            tercera = 'No aplica';
            if(this.state.infoUsuario.fecha_primera_dosis == null || this.state.infoUsuario.fecha_primera_dosis == '0000-00-00'){
                primera = 'No programada';
            }else if (this.state.infoUsuario.primera_dosis == 1){
                primera = 'Efectuada';
            }else{
                primera = 'Programada';
            }
            
            if(this.state.infoUsuario.fecha_segunda_dosis == null || this.state.infoUsuario.fecha_segunda_dosis == '0000-00-00'){
                segunda = 'No programada';
            }else if (this.state.infoUsuario.segunda_dosis == 1){
                segunda = 'Efectuada';
            }else{
                segunda = 'Programada';
            }
        }

        if(this.state.infoUsuario.dosis_vacuna == 3){
            if(this.state.infoUsuario.fecha_primera_dosis == null || this.state.infoUsuario.fecha_primera_dosis == '0000-00-00'){
                primera = 'No programada';
            }else if (this.state.infoUsuario.primera_dosis == 1){
                primera = 'Efectuada';
            }else{
                primera = 'Programada';
            }
            
            if(this.state.infoUsuario.fecha_segunda_dosis == null || this.state.infoUsuario.fecha_segunda_dosis == '0000-00-00'){
                segunda = 'No programada';
            }else if (this.state.infoUsuario.segunda_dosis == 1){
                segunda = 'Efectuada';
            }else{
                segunda = 'Programada';
            }

            if(this.state.infoUsuario.fecha_tercera_dosis == null || this.state.infoUsuario.fecha_tercera_dosis == '0000-00-00'){
                tercera = 'No programada';
            }else if (this.state.infoUsuario.tercera_dosis == 1){
                tercera = 'Efectuada';
            }else{
                tercera = 'Programada';
            }
        }



        var total = parseInt(int1) + parseInt(int2) +parseInt(int3);

        if(this.state.infoUsuario.dosis_vacuna == total){
            completo = 'Completo'
        }
      
        var vacuna_v = this.state.infoUsuario.vacuna==null? 'No Asignada': this.state.infoUsuario.vacuna + ' - ' + this.state.infoUsuario.nombre_vacuna;

        const doc = new jsPDF();

        doc.addImage(img, 'PNG', 0, 0);
        doc.setFontSize(12);
        doc.text(20, 60, 'Persona con DPI : '+ this.state.infoUsuario.dpi_persona);
        doc.text(20, 70, 'Nombre : '+ this.state.infoUsuario.nombre_completo);
        doc.text(20, 80, 'Vacuna Correspondiente : '+ vacuna_v);
        doc.text(115, 50, 'Documento creado: '+ this.state.infoUsuario.fecha_creacion);
        doc.text(140, 25, 'Documento Número: ');
        doc.text(140, 32, this.state.infoUsuario.id_archivo);
        doc.text(20, 50, 'Fecha de inscripción: '+this.state.infoUsuario.fecha_inscripcion);
        doc.autoTable({
            //styles: { fillColor: '#0ab200'},
            headStyles: { fillColor: '#230043'}, 
            margin: { top: 90 },
            head: [['Fase del Proceso', 'Fecha' ,'Estado']],
            body: [
              ['Primera Dosis', this.state.infoUsuario.fecha_primera_dosis, primera],
              ['Segunda Dosis', this.state.infoUsuario.fecha_segunda_dosis, segunda],
              ['Tercera Dosis', this.state.infoUsuario.fecha_tercera_dosis, tercera],
            ],
          })
        
        doc.text(20,130, "Cuadro de vacunación: "+ completo);
        doc.save('proceso_vacuna.pdf');

        console.log(total);

    }
    
    componentDidMount(){
        const context = this.context;
        this.setState({dpi_usuario: context.username,
        tipo_usuario: context.tipoUsuario});

        /*const url = 'http://localhost/scripts/pdf.php';

        axios.get(url, {params: {dpi: context.username}}).then(response => response.data)
             .then((data) => {
                this.setState({infoUsuario: data[0]})
                console.log(this.state.infoUsuario)
        });*/
        
    }
    
    render(){
        return(
            <div>
                <MenuBar/>
                <div className="page">
                    <h1 className="title2">Mi proceso de vacunación</h1>
                    <p>Haga click sobre el botón para descargar el documento con su estado en el proceso de vacunación</p>
                   <Button id="pdf_descargar" onClick={this.enviar_datos}>Descargar PDF</Button>
                   <ConsultaPDF/>
                </div>
                
                <Footer/>
            </div>
        );
    }
}

export default EstadoProceso;