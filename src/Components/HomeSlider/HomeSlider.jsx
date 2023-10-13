import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../imgs/imgs/slider-image-1.jpeg"
import img2 from "../../imgs/imgs/slider-image-2.jpeg"
import img3 from "../../imgs/imgs/slider-image-3.jpeg"
import Slider from 'react-slick';

export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };

  return <>
      <div>
        <Slider {...settings}>
          <div>
            <img className="" style={{height:"400px", width: "100%"}} src={img1} alt="ay7aga" />
          </div>
          <div>
            <img className="" style={{height:"400px", width: "100%"}} src={img2} alt="ay7aga" />
          </div>
          <div>
            <img className="" style={{height:"400px", width: "100%"}} src={img3} alt="ay7aga" />
          </div>
        </Slider>
      </div>
  </>
}
