import React, { useState, useEffect } from 'react';
import './Slider.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const images = [
        'https://picsum.photos/1200/500?random=1',
        'https://picsum.photos/1200/500?random=2',
        'https://picsum.photos/1200/500?random=3',
        'https://picsum.photos/1200/500?random=4',
    ];

    const nextSlide = () => {
        if (currentSlide === images.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(images.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!isHovered) {
    //             nextSlide();
    //         }
    //     }, 2200);

    //     return () => clearInterval(interval);
    // }, [currentSlide, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='container'>

            <div className='wrapBtns'>
                <button className='sliderBtn back' onClick={prevSlide}><ArrowForwardIosIcon /></button>
                <button className='sliderBtn foward' onClick={nextSlide}><ArrowForwardIosIcon /></button>
            </div>


            <img className='sliderImg' src={images[currentSlide]} alt={`Slide ${currentSlide}`} />


        </div>
    );
}
