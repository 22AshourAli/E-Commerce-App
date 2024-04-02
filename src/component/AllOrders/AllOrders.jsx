import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import ArrowUp from "../ArrowUp/ArrowUp";

const AllOrders = () => {
  let userId = jwtDecode(localStorage.getItem("token")).id;
  let userName = jwtDecode(localStorage.getItem("token")).name;
  let [allOrders, setAllOrders] = useState(null);

  async function getAllOrders() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );

      setAllOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getAllOrders();
  }, []);

  if (allOrders?.length == 0) {
    return (
      <>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <h2>All order is empty</h2>
          <h6>make some orders</h6>
        </div>
      </>
    );
  }

  return (
    <>
    <ArrowUp/>
      <div className="container py-5">
        <div className="row g-4">

          {allOrders ? (
            allOrders.map((order, index) => (
              <div key={index} className="col-md-12">
                <div className="inner rounded-2 p-3 bg-success-subtle shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h6>
                        Name: : <span className="text-success">{userName}</span>
                      </h6>
                      <h6>
                        City: :{" "}
                        <span className="text-success">
                          {order.shippingAddress.city}
                        </span>
                      </h6>
                      <h6>
                        Phone: :{" "}
                        <span className="text-success">
                          {order.shippingAddress.phone}
                        </span>
                      </h6>
                    </div>
                    <div>
                      <h6>
                        Details :{" "}
                        <span className="text-success">
                          {order.shippingAddress.details}
                        </span>
                      </h6>
                      <h6>
                        Payment method:{" "}
                        <span className="text-success">
                          {order.paymentMethodType}
                        </span>
                      </h6>
                      <h6>
                        Total order price :{" "}
                        <span className="text-success">
                          {order.totalOrderPrice} EGP
                        </span>
                      </h6>
                    </div>

                    <button
                      onClick={function (e) {
                        $(e.target).parent().next().slideToggle(500);
                      }}
                      className="btn btn-danger"
                    >
                      Show details{" "}
                      <i className="fa-solid ms-2 fa-circle-chevron-down"></i>
                    </button>
                  </div>

                  <div className="container" style={{ display: "none" }}>
                    <div className="row gy-4">
                      {order.cartItems.map((item, idx) => (
                        <div key={idx} className="orderDetails col-sm-4 col-md-3 col-lg-2">
                          <div className="bg-white rounded-2 p-2">
                            <img
                              src={item.product.imageCover}
                              className="w-100 rounded-2"
                              alt=""
                            />
                            <h6 className="my-2">
                              {item.product.title
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </h6>
                            <h6>Price: {item.price} EGP</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex align-items-center justify-content-center vh-100 fixed-top z-3 bg-white">
              <img
                src={require("../../images/loading2.gif")}
                style={{ width: "200px", height: "200px" }}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
