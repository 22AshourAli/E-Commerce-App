import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  let navigate = useNavigate();

  let userEmail = "";
  let userCode = "";

  let [getCode, setGetCode] = useState(true);

  async function getUserEmail() {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: userEmail,
        }
      );

      if (data.statusMsg === "success") {
        toast.success(data.message, {
          duration: 2000,
          position: "top-right",
        });
        setGetCode(false);
      } else {
        toast.error("Error", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("please enter valid email", {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  async function getUserCode() {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: userCode,
        }
      );

      if (data.status === "Success") {
        toast.success("verified successfuly", {
          duration: 2000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/resetpassword");
          setGetCode(true);
        }, 500);
      } else {
        toast.error("Error", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Please enter the code", {
        duration: 2000,
        position: "top-right",
      });
      setGetCode(false);
    }
  }

  // function emailValidation() {
  //   var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  //   if (emailRegex.test(userEmail) == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <>
      <div className="w-50 m-auto py-5">
        {getCode ? (
          <>
            <label htmlFor="forgetPass">Please enter your email</label>
            <input
              type="email"
              id="forgetPass"
              required
              className="form-control mb-4"
              placeholder="email"
              onChange={function (e) {
                userEmail = e.target.value;
              }}
            />

            <button onClick={getUserEmail} className="btn btn-primary">
              send code
            </button>
          </>
        ) : (
          <>
            <label htmlFor="code">Enter your verification code</label>
            <input
              type="number"
              id="code"
              required
              className="form-control mb-4"
              placeholder="code"
              onChange={function (e) {
                userCode = e.target.value;
              }}
            />

            <button onClick={getUserCode} className="btn btn-success">
              verify
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ForgetPassword;
