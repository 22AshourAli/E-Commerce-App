import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    fade:true,
   
  };

  return (
    <>
      <div className="row mb-5 g-0">
        <div className="col-md-9 mainslider">
          <Slider {...settings}>
            <div>
              <img
                style={{ height: "300px" }}
                className="w-100"
                src={require("../../images/slider-image-2.jpeg")}
                alt="imageslider"
              />
            </div>
            <div>
              <img
                style={{ height: "300px" }}
                className="w-100"
                src={require("../../images/slider-image-1.jpeg")}
                alt="imageslider"
              />
            </div>
            <div>
              <img
                style={{ height: "300px" }}
                className="w-100"
                src={require("../../images/slider-image-3.jpeg")}
                alt="imageslider"
              />
            </div>
            <div>
              <img
                style={{ height: "300px" }}
                className="w-100"
                src={require("../../images/slider-2.jpeg")}
                alt="imageslider"
              />
            </div>
          </Slider>
        </div>
        <div className="col-md-3 subslider">
          <img
            style={{ height: "150px" }}
            className="w-100"
            src={require("../../images/grocery-banner-2.jpeg")}
            alt="imageslider"
          />

          <img
            style={{ height: "150px" }}
            className="w-100"
            src={require("../../images/grocery-banner.png")}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default ProductSlider;
