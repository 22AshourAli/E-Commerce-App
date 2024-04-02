import axios, { Axios } from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthenticationContext } from "../../Context/Authentication/Authentication";
import { cartContext } from "../../Context/Cart/Cart";
import { wishlistContext } from "../../Context/Wishlist/Wishlist";
import $ from "jquery";

const Login = () => {
  let user = {
    email: "",
    password: "",
  };

  let [errorMessage, setErrorMessage] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let { token, setToken } = useContext(AuthenticationContext);
  let { getUserCart } = useContext(cartContext);
  let { getUserWishlist } = useContext(wishlistContext);

  async function testData(value) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        value
      );
      setSuccessMessage(data.message);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setTimeout(function () {
        getUserCart();
        getUserWishlist();
        navigate("/");
      }, 500);
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
    setLoading(false);
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Enter your email").email("Email is wrong"),
    password: Yup.string()
      .required("Enter your password")
      .matches(/^[A-Z][a-zA-Z0-9@]{7,}$/, "The password is incorrect"),
  });

  let formik = useFormik({
    initialValues: user,
    onSubmit: testData,
    validationSchema
  });

  return (
    <>
      <section className="w-75 m-auto py-3">
        <h2 className="text-center">Login Form</h2>

        {errorMessage ? (
          <div className="errorMessage p-2 m-0 alert alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}

        {successMessage ? (
          <div className="successMessage p-2 m-0 alert alert-success">
            {successMessage}
          </div>
        ) : (
          ""
        )}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="form-control mb-3"
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-1">{formik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            className="form-control mb-3"
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-1">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <h6
            style={{ cursor: "pointer" }}
            className="mb-3  text-danger"
            onClick={function () {
              navigate("/forgetpassword");
            }}
          >
            forget password ?
          </h6>

          <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-success">
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
              "Login"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
