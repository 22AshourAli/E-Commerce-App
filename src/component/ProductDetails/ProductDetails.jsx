import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/Cart/Cart";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import Slider from "react-slick";

const ProductDetails = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };

  let { id } = useParams();
  let [loading, setLoading] = useState(false);

  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  let { addProductToCart } = useContext(cartContext);

  async function addProduct(id) {
    setLoading(true);
    let result = await addProductToCart(id);
    console.log(result);
    if (result.status === "success") {
      toast.success(result.message, {
        duration: 1500,
        position: "top-right",
      });
    } else {
      toast.error("Error", {
        duration: 1500,
        position: "top-right",
      });
    }
    setLoading(false);
  }

  let { data } = useQuery("productDetails", getProductDetails);

  return (
    <div className="container py-3">
      {data?.data.data ? (
        <div className="row g-4 align-items-center">
          <div className="col-md-4 text-center">
            <Slider {...settings}>
              {data.data.data.images.map((item) => (
                <img src={item} className="w-75" alt="imagedetalis" />
              ))}
            </Slider>
          </div>
          <div className="col-md-8 ">
            <h2>{data.data.data.title}</h2>
            <p>{data.data.data.description}</p>
            <h6>
              <span className="fw-bold">Category:</span>{" "}
              {data.data.data.category.name}
            </h6>
            <h6>
              <span className="fw-bold">Brand:</span>{" "}
              {data.data.data.brand.name}
            </h6>
            <div className="d-flex justify-content-between">
              <h6 className="text-danger">
                <span className="fw-bold">Price:</span> {data.data.data.price}{" "}
                EGP
              </h6>
              <h6>
                <i className="fas fa-star text-warning"></i>{" "}
                {data.data.data.ratingsAverage}
              </h6>
            </div>
            <button
              onClick={function () {
                addProduct(data.data.data.id);
              }}
              className="btn btn-success w-100 p-1 mt-3"
            >
              {loading ? (
                <RotatingLines
                  visible={true}
                  height="25"
                  width="25"
                  color="grey"
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "+ add to cart"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100 fixed-top z-3 bg-white">
          <img
            src={require("../../images/loading2.gif")}
            style={{ width: "200px", height: "200px" }}
            alt="loading"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
