import React, { useEffect, useState } from 'react';
import './CarouselSection.css';
import { IoIosArrowForward } from "react-icons/io";
import Img01 from '../../assets/Carousel Images/Img01.jpg';
import Img02 from '../../assets/Carousel Images/Img02.jpg';
import Img03 from '../../assets/Carousel Images/Img03.jpg';

const carouselItems = [
    {
      image: Img01,
      title: "Create a Cake as Unique as Your Celebration!",
      description: "Use our interactive designer to customize flavors, colors, and decorations - then see it in 3D before ordering!",
    },
    {
      image: Img02,
      title: "Sweet Gifts, Tailored to Your Budget!",
      description: "Use our interactive designer to customize flavors, colors, and decorations - then see it in 3D before ordering!",
    },
    {
      image: Img03,
      title: "Stunning Wedding Cakes for Your Big Day!",
      description: "Use our interactive designer to customize flavors, colors, and decorations - then see it in 3D before ordering!",
    }
  ];

function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1600); // Wait until fade completes
    }, 6000); // 6s for better pacing
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className='CarouselSection'>
      <div className="CarouselSectionContent">
        {previousIndex !== null && isAnimating && (
          <div className="carousel-layer fade-out">
            <img src={carouselItems[previousIndex].image} alt="" />
            <div className="CarouselText">
              <p className='CarouselTextTitle'>{carouselItems[previousIndex].title}</p>
              <p className='CarouselTextPara'>{carouselItems[previousIndex].description}</p>
              <div className="DesignNowBtn">
                Start Designing Now <IoIosArrowForward />
              </div>
            </div>
          </div>
        )}
        <div className={`carousel-layer fade-in`}>
          <img src={carouselItems[currentIndex].image} alt="" />
          <div className="CarouselText">
            <p className='CarouselTextTitle'>{carouselItems[currentIndex].title}</p>
            <p className='CarouselTextPara'>{carouselItems[currentIndex].description}</p>
            <div className="DesignNowBtn">
              Start Designing Now <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselSection;
