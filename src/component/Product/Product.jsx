// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import ProductSlider from "../productSlider/productSlider";
// import CategorySlider from "../CategorySlider/CategorySlider";
// import { Link } from "react-router-dom";
// import { cartContext } from "../../Context/Cart/Cart";
// import toast from "react-hot-toast";
// import $ from "jquery";
// import { wishlistContext } from "../../Context/Wishlist/Wishlist";

// const Product = () => {
//   let { addProductToWishlist, getUserWishlist, removeProductFromWishlist } =
//     useContext(wishlistContext);
//   let { addProductToCart } = useContext(cartContext);
//   let [favList, setFavList] = useState(null);
//   let changeIcon = false;

//   async function getfavList() {
//     let { data } = await getUserWishlist();
//     setFavList(data);
//   }
//   useEffect(function () {
//     getfavList();
//   }, []);

//   async function getAllProduct() {
//     return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
//   }

//   let { data } = useQuery("allProduct", getAllProduct);

//   async function addProduct(id) {
//     let result = await addProductToCart(id);

//     if (result.status === "success") {
//       toast.success(result.message, {
//         duration: 1500,
//         position: "top-right",
//       });
//     } else {
//       toast.error("Error", {
//         duration: 1500,
//         position: "top-right",
//       });
//     }
//   }

//   return (
//     <>
//       <div className="container-fluid py-5 ">
//         <ProductSlider />
//         <CategorySlider />

//         <div className="row g-2 mt-2">
//           {data?.data.data ? (
//             data.data.data.map((element, index) => (
//               <div key={index} className="col-md-3 p-2  product col-sm-4 col-lg-2">
//                 {(changeIcon = false)}
//                 <div className="inner">
//                   <Link
//                     to={`/details/` + element._id}
//                     className="inner text-decoration-none text-black"
//                     style={{ cursor: "pointer" }}
//                   >
//                     <img src={element.imageCover} className="w-100" />
//                     <h6 clanpmssName="text-info-emphasis">
//                       {element.category.name}
//                     </h6>
//                     <h5>{element.title.split(" ").slice(0, 2).join(" ")}</h5>
//                     <h6 className="text-danger">Price {element.price} EGP</h6>
//                   </Link>

//                   {favList?.map(function (item) {
//                     if (item._id == element._id) {
//                       changeIcon = true;
//                     }
//                   })}
//                   {changeIcon ? (
//                     <div className="d-flex align-items-center justify-content-between my-3">
//                       <i
//                         onClick={function (e) {
//                           $(e.target).css({ color: "gray" });
//                           removeProductFromWishlist(element.id);
//                         }}
//                         style={{ cursor: "pointer", color: "red" }}
//                         className="fas fa-heart love"
//                       ></i>
//                       <span>
//                         <i className="fas fa-star text-warning"></i>
//                         {element.ratingsAverage}
//                       </span>
//                     </div>
//                   ) : (
//                     <div className="d-flex align-items-center justify-content-between my-3">
//                       <i
//                         onClick={function (e) {
//                           $(e.target).css({ color: "red" });
//                           addProductToWishlist(element.id);
//                         }}
//                         style={{ cursor: "pointer", color: "gray" }}
//                         className="fas fa-heart love"
//                       ></i>
//                       <span>
//                         <i className="fas fa-star text-warning"></i>
//                         {element.ratingsAverage}
//                       </span>
//                     </div>
//                   )}
//                   <button
//                     onClick={function () {
//                       addProduct(element._id);
//                     }}
//                     className="btn btn-success mb-2 w-100 p-1 fw-semibold"
//                   >
//                     +add to cart
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="d-flex align-items-center justify-content-center vh-100 fixed-top z-3 bg-white">
//               <img
//                 src={require("../../images/loading2.gif")}
//                 style={{ width: "200px", height: "200px" }}
//                 alt="loading"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Product;

import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import ProductSlider from "../productSlider/productSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart/Cart";
import toast from "react-hot-toast";
import $ from "jquery";
import { wishlistContext } from "../../Context/Wishlist/Wishlist";
import axios from "axios";
import ArrowUp from "../ArrowUp/ArrowUp";

const Product = () => {
  let { addProductToWishlist, getUserWishlist, removeProductFromWishlist } =
    useContext(wishlistContext);
  let { addProductToCart } = useContext(cartContext);
  let [favList, setFavList] = useState(null);
  let [sortType, setSortType] = useState("default"); // تعيين القيمة الافتراضية لحالة الفرز
  let changeIcon = false;
  async function getfavList() {
    let { data } = await getUserWishlist();
    setFavList(data);
  }

  useEffect(function () {
    getfavList();
  }, []);

  async function getAllProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data } = useQuery("allProduct", getAllProduct);

  async function addProduct(id) {
    let result = await addProductToCart(id);

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
  }

  // تحديث النوع للترتيب
  const handleSort = (type) => {
    setSortType(type);
  };

  // ترتيب المنتجات
  const sortProducts = (products, type) => {
    if (type === "highestPrice") {
      return products.sort((a, b) => b.price - a.price);
    } else if (type === "lowestPrice") {
      return products.sort((a, b) => a.price - b.price);
    } else {
      return products;
    }
  };

  return (
    <>
      <div className="container-fluid py-5 ">
        <ProductSlider />
        <CategorySlider />
        <ArrowUp />
        {/* أزرار الترتيب */}
        <h5 className="text-center mt-5 pt-5 ">
          "Sorts products by price: highest to lowest and lowest to highest"
        </h5>
        <div className="d-flex justify-content-center py-2">
          <button
            className={`btn ${
              sortType === "highestPrice"
                ? "btn-success"
                : "btn-outline-success"
            } me-2`}
            onClick={() => handleSort("highestPrice")}
          >
            Highest Price
          </button>
          <button
            className={`btn ${
              sortType === "lowestPrice" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handleSort("lowestPrice")}
          >
            Lowest Price
          </button>
        </div>

        <div className="row g-2 mt-3">
          {data?.data.data ? (
            sortProducts(data.data.data, sortType).map((element, index) => (
              <div
                key={index}
                className="col-md-3 p-2  product col-sm-4 col-lg-2"
              >
                <Link
                  to={`/details/${element._id}`}
                  className="text-decoration-none text-black"
                >
                  <img
                    src={element.imageCover}
                    alt={element.title}
                    className="w-100"
                  />
                  <h6 className="text-info-emphasis">
                    {element.category.name}
                  </h6>
                  <h5>{element.title.split(" ").slice(0, 2).join(" ")}</h5>
                  <h6 className="text-danger">Price {element.price} EGP</h6>
                </Link>
                {/* أيقونات الوظائف */}

                {favList?.find((item) => item._id === element._id) ? (
                  <div className="d-flex align-items-center justify-content-between my-3">
                    <i
                      onClick={(e) => {
                        $(e.target).css({ color: "gray" });
                        removeProductFromWishlist(element.id);
                      }}
                      style={{ cursor: "pointer", color: "red" }}
                      className="fas fa-heart love"
                    ></i>
                    <span>
                      <i className="fas fa-star text-warning"></i>
                      {element.ratingsAverage}
                    </span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between my-3">
                    <i
                      onClick={(e) => {
                        $(e.target).css({ color: "red" });
                        addProductToWishlist(element.id);
                      }}
                      style={{ cursor: "pointer", color: "gray" }}
                      className="fas fa-heart love"
                    ></i>
                    <span>
                      <i className="fas fa-star text-warning"></i>
                      {element.ratingsAverage}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    addProduct(element._id);
                  }}
                  className="btn btn-success mb-2 w-100 p-1 fw-semibold"
                >
                  +add to cart
                </button>
              </div>
            ))
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
      </div>
    </>
  );
};

export default Product;
