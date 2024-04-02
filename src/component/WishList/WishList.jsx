import React, { useContext } from "react";
import { wishlistContext } from "../../Context/Wishlist/Wishlist";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/Cart/Cart";

const WishList = () => {
  let { userWishlist, removeProductFromWishlist } = useContext(wishlistContext);
  let { addProductToCart } = useContext(cartContext);

  async function addProduct(id) {
    let result = await addProductToCart(id);

    if (result.status === "success") {
      toast.success(result.message, {
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

  if (userWishlist?.length == 0) {
    return (
      <>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <h2>Your wishlist is empty</h2>
          <h6>add some items</h6>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        {userWishlist
          ? userWishlist.map((element, index) => (
              <div
                key={index}
                className="row g-3 py-3 px-5 px-sm-0 mt-3 bg-body-secondary align-items-center border-1 border-bottom border-dark-subtle"
              >
                <div className="col-sm-4 col-md-2 col-lg-1">
                  <img src={element.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-sm-7 col-md-10 col-lg-9">
                  <h5>{element.title}</h5>
                  <h6>
                    Brand:{" "}
                    <span className="text-success">{element.brand.name}</span>
                  </h6>
                  <h6>
                    Price:{" "}
                    <span className="text-success">{element.price} EGP</span>
                  </h6>

                  <p
                    style={{ fontSize: "13px", cursor: "pointer" }}
                    className="text-danger fw-semibold"
                    onClick={function () {
                      removeProductFromWishlist(element.id);
                    }}
                  >
                    <i className="fa-solid fa-trash-can mx-1"></i>
                    Remove
                  </p>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-2">
                  <button
                    onClick={function () {
                      addProduct(element._id);
                    }}
                    className="btn btn-outline-success"
                  >
                    + Add to card
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default WishList;
