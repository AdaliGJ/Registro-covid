   
import React, { useState } from 'react';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Card from '@material-ui/core/Card';

const baseURL = 'http://localhost/webimages/';

export const SliderData = [
    {
      image:
        baseURL + 'yo-me-vacuno-1.jpg'
    },
    {
      image:
      baseURL + 'yo-me-vacuno-3.jpg'
    },
    {
      image:
      baseURL + 'PREGUNTAS-FRECUENTES-vacuna.jpg'
    },
    {
      image:
      baseURL + 'registros-v6.png'
    }
  ];



const ImgCarousel = ({ slides }) => {
  const [actual, setActual] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setActual(actual === length - 1 ? 0 : actual + 1);
  };

  const prevSlide = () => {
    setActual(actual === 0 ? length - 1 : actual - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <Card className='slider' >
      <ArrowBackIosRoundedIcon className='left-arrow' onClick={prevSlide} />
      <ArrowForwardIosIcon className='right-arrow' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div className={index === actual ? 'slide-active' : 'slide'} key={index}>
            {index === actual && (<img src={slide.image} className='carousel-image' />) 
           }
          </div>
        );
      })}
    </Card>
  );
};

export default ImgCarousel;