import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { AuthenticationContext } from "../../Context/Authentication/Authentication";
import { cartContext } from "../../Context/Cart/Cart";
import { wishlistContext } from "../../Context/Wishlist/Wishlist";

const Navbar = () => {
  let { token, setToken } = useContext(AuthenticationContext);
  let { wishlistCounter } = useContext(wishlistContext);

  let navigate = useNavigate();

  let { numOfItems } = useContext(cartContext);

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="nav navbar navbar-expand-lg shadow-sm py-3">
      <div className="container p-2">
        <NavLink to="/">
          <img src={logo} alt="logo fresh cart" />
        </NavLink>
        <button
          className="navbar-toggler border-0 bg-main "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars-staggered border-0 bars text-white "></i>{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/">
                    Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/category">
                    Category
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/brand">
                    Brand
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/allorders">
                    All orders
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item d-flex align-items-center position-relative me-3">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/wishlist"
                  >
                    Wishlist
                    <i className="fa-solid fa-heart ms-1"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistCounter}
                    </span>
                  </NavLink>
                </li>

                <li className="nav-item d-flex align-items-center position-relative me-3">
                  <NavLink className="nav-link" aria-current="page" to="/cart">
                    Cart
                    <i className="fa-solid fa-cart-shopping ms-1"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numOfItems}
                    </span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                    className="nav-link"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
