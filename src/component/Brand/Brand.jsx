import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ArrowUp from "../ArrowUp/ArrowUp";

const Brand = () => {
  let [brandName, setBrandName] = useState("");
  let [brandImage, setBrandImage] = useState("");

  async function getAllBrand() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data } = useQuery("category", getAllBrand);

  return (
    <>
    <ArrowUp/>
      {data?.data.data ? (
        <div className="container py-5 px-5 px-md-0">
          <div className="row g-4">
            {data.data.data.map(function (element, index) {
              return (
                <div key={index} className="col-sm-4 col-md-3 ">
                  <div
                    style={{ cursor: "pointer"  }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="card brandCard px-5 px-sm-0"
                    onClick={() => {
                      setBrandName(element.name);
                      setBrandImage(element.image);
                    }}
                  >
                    <img
                      style={{ height: "150px" }}
                      src={element.image}
                      className="card-img-top w-100"
                      alt=""
                    />
                    <div className="card-body">
                      <h4 className="card-title text-success fst-italic">
                        {element.name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Brand
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h2 className="text-success fs-1 fw-bold">{brandName}</h2>
                      <h5 className="text-black-50">{brandName}</h5>
                    </div>
                    <img
                      src={brandImage}
                      className="card-img-top w-50"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-item-center justify-content-center vh-100">
          <img
            src={require("../../images/loading2.gif")}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Brand;
