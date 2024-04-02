import React, { useContext } from "react";
import { cartContext } from "../../Context/Cart/Cart";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  let {
    products,
    totalPrice,
    removeItem,
    updateProductCounter,
    clearUserCart,
  } = useContext(cartContext);

  async function remove(id) {
    let result = await removeItem(id);

    if (result.status === "success") {
      toast.success("Product deleted successfuly", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error("Error", {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  async function updateCounter(id, count) {
    let result = await updateProductCounter(id, count);
  }

  async function clearCart() {
    await clearUserCart();
  }

  if (products == "") {
    return (
      <>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <h2>Your cart is empty</h2>
          <h6>add some items</h6>
        </div>
      </>
    );
  }

  return (
    
    <>
      <div className="container py-5 px-5 px-sm-0">
        {products ? (
          <>
            <h2>Shopping cart:</h2>
            <h5>
              Total cart price:{" "}
              <span className="text-success">{totalPrice} EGP</span>
            </h5>
            <button onClick={clearCart} className="btn btn-danger my-3">
              Clear cart
            </button>
            <Link to={"/payment"} className="btn btn-primary m-3">
              Payment
            </Link>
            {products.map(function (product, index) {
              return (
                <div
                  key={index}
                  className="row g-3 py-3 mt-3 bg-body-secondary align-items-center border-1 border-bottom border-dark-subtle"
                >
                  <div className="col-sm-2 col-md-2 col-lg-1">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9">
                    <h5>{product.product.title}</h5>
                    <h6>
                      Brand:{" "}
                      <span className="text-success">
                        {product.product.brand.name}
                      </span>
                    </h6>
                    <h6>
                      Price:{" "}
                      <span className="text-success">{product.price} EGP</span>
                    </h6>
                    <button
                      onClick={function () {
                        remove(product.product.id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="col-sm-4 col-md-2 col-lg-2">
                    <div className="d-flex align-items-center justify-content-around">
                      <button
                        onClick={function () {
                          updateCounter(product.product.id, product.count + 1);
                        }}
                        className="btn btn-outline-success fw-bold"
                      >
                        +
                      </button>
                      <h6>{product.count}</h6>
                      {product.count <= 0 ? (
                        <button
                          onClick={function () {
                            remove(product.product.id);
                          }}
                          className="btn btn-outline-success fw-bold"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={function () {
                            updateCounter(
                              product.product.id,
                              product.count - 1
                            );
                          }}
                          className="btn btn-outline-success fw-bold"
                        >
                          -
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center vh-100 fixed-top bg-white">
            <img
              src={require("../../images/loading2.gif")}
              style={{ width: "200px", height: "200px" }}
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
