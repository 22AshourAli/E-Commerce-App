import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";

const CategorySlider = () => {
  let [sliderConter, setSliderConter] = useState(7);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      setSliderConter(7);
    } else if (window.innerWidth <= 800 && window.innerWidth >= 700) {
      setSliderConter(5);
    } else if (window.innerWidth <= 700 && window.innerWidth >= 600) {
      setSliderConter(4);
    } else if (this.window.innerWidth < 500) {
      setSliderConter(3);
    }
  });

  var settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: sliderConter,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };

  async function getAllCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("category", getAllCategory);

  return (
    <>
      {data?.data.data ? (
        <Slider className="my-4" {...settings}>
          {data.data.data.map(function (element, index) {
            return (
              <div key={index} className="p-2">
                <img
                  style={{ height: "150px", cursor: "pointer" }}
                  className="w-100"
                  src={element.image}
                  alt="imageslider1"
                />
                <h6 className="my-3">{element.name}</h6>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="d-flex align-item-center justify-content-center">
          <img
            src={require("../../images/loading2.gif")}
            style={{ width: "200px", height: "200px" }}
            alt="loading"
          />
        </div>
      )}
    </>
  );
};

export default CategorySlider;
