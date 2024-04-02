import axios, { Axios } from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  let [errorMessage, setErrorMessage] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function addUser(value) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        value
      );
      setSuccessMessage(data.message);

      setTimeout(function () {
        navigate("/login");
      }, 2000);
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
    setLoading(false);
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("The name is required")
      .min(3, "The name must be more than 3 letters")
      .max(20, "The name must be less than 10 characters"),
    email: Yup.string()
      .required("The email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("The password is required")
      .matches(
        /^[A-Z][a-zA-Z0-9@]{7,}$/,
        "The password must start with capital letter and at least 8 letter"
      ),
    rePassword: Yup.string()
      .required("The password is required")
      .oneOf([Yup.ref("password")], "The password must be matched"),
    phone: Yup.string()
      .required("The phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  });

  let formik = useFormik({
    initialValues: user,
    onSubmit: addUser,
    validationSchema,
  });

  return (
    <>
      <section className="w-75 m-auto py-3">
        <h2 className="text-center">Register Form</h2>

        {errorMessage ? (
          <div className="alert p-2 m-0 alert-danger">{errorMessage}</div>
        ) : (
          ""
        )}

        {successMessage ? (
          <div className="alert p-2 m-0 alert-success">{successMessage}</div>
        ) : (
          ""
        )}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            className="form-control mb-3"
          />

          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-1">{formik.errors.name}</div>
          ) : (
            ""
          )}

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

          <label htmlFor="rePassword">Re-Password:</label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            className="form-control mb-3"
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger p-1">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="phone"
            className="form-control mb-3"
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-1">{formik.errors.phone}</div>
          ) : (
            ""
          )}

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
              "Submit"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
  