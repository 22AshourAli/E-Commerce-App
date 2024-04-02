import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ArrowUp from "../ArrowUp/ArrowUp";

const Category = () => {
  let [subcategory, setSubcategory] = useState([]);
  let [categoryName, setCategoryName] = useState("");

  async function getAllCategory() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("category", getAllCategory);

  async function getSubcategory(categoryId, categoryName) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );

      setSubcategory(data.data);
      setCategoryName(categoryName + " subcategories");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <ArrowUp/>
      {data?.data.data ? (
        <div className="container py-5 px-5 px-md-0">
          <div className="row g-4">
            {data.data.data.map(function (element, index) {
              return (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card categoryCard">
                    <img
                      style={{ height: "250px" }}
                      src={element.image}
                      className="card-img-top w-100"
                      alt=""
                    />
                    <div className="card-body">
                      <h4 className="card-title text-success fst-italic">
                        {element.name}
                      </h4>
                      <a
                        onClick={function () {
                          getSubcategory(element._id, element.name);
                        }}
                        className="btn btn-success"
                        // {/*                         href="#subcategory" */}
                      >
                        Show subcategories
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex align-item-center justify-content-center">
          <img
            src={require("../../images/loading2.gif")}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </div>
      )}

      {subcategory != null ? (
        <div id="subcategory" className="container pb-5 px-5 px-md-0">
          <h2 className="text-success text-center mb-5">{categoryName}</h2>
          <div className="row g-4">
            {subcategory.map((item, idx) => (
              <div key={idx} className="col-sm-4 col-lg-3">
                <div className="subcategoryItems border border-1 border-secondary-subtle rounded-1 d-flex align-items-center justify-content-center">
                  <h3 className="text-black p-1">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Category;
