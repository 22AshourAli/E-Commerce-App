import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  let navigate = useNavigate();
  let userEmail = "";
  let newPass = "";

  async function getNewPassword() {
    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: userEmail,
          newPassword: newPass,
        }
      );
      toast.success("Password reset successfuly", {
        duration: 2000,
        position: "top-right",
      });
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-50 m-auto py-5">
        <label htmlFor="useremail">Enter your eamil</label>
        <input
          type="email"
          id="useremail"
          className="form-control mb-4"
          placeholder="email"
          onChange={function (e) {
            userEmail = e.target.value;
          }}
        />

        <label htmlFor="rePassword">Enter new password</label>
        <input
          type="password"
          id="rePassword"
          className="form-control mb-5"
          placeholder="new password"
          onChange={function (e) {
            newPass = e.target.value;
          }}
        />

        <button onClick={getNewPassword} className="btn btn-primary">
          Reset password
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
