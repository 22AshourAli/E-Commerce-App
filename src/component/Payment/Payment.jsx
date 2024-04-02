import axios from "axios";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart/Cart";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  let { cartId, setNumOfItems, setProducts, setTotalPrice } =
    useContext(cartContext);

  let navigator = useNavigate();

  let [city, setCity] = useState("");
  let [phone, setPhone] = useState("");
  let [details, setDetails] = useState("");
  let [loading, setLoading] = useState(false);
  let [loadingOnline, setLoadingOnline] = useState(false);

  async function cashPayment() {
    setLoading(true);
    const paymentInfo = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city,
      },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        paymentInfo,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (data.status === "success") {
        setNumOfItems(0);
        setProducts([]);
        setTotalPrice(0);
        $("#city").val("");
        $("#phone").val("");
        $("#details").val("");
        toast.success("Payment completed successfully", {
          duration: 2000,
          position: "top-right",
        });
        setTimeout(() => {
          navigator("/allorders");
        }, 2500);
        console.log(data);
      } else {
        toast.error("Error", {
          duration: 2000,
          position: "top-right",
        });
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function onlinePayment() {
    setLoadingOnline(true);
    const paymentInfo = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city,
      },
    };

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        paymentInfo,
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: `http://localhost:3000` },
        }
      );

      if (data.status === "success") {
        setNumOfItems(0);
        setProducts([]);
        setTotalPrice(0);
        $("#city").val("");
        $("#phone").val("");
        $("#details").val("");
        toast.success("Payment completed successfully", {
          duration: 2000,
          position: "top-right",
        });
        setTimeout(() => {
          window.open(data.session.url);
        }, 2500);
        console.log(data);
      } else {
        toast.error("Error", {
          duration: 2000,
          position: "top-right",
        });
      }

      setLoadingOnline(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-50 m-auto py-5">
        <label htmlFor="city">City</label>
        <input
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          id="city"
          className="form-control mb-3"
        />

        <label htmlFor="phone">Phone</label>
        <input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="tel"
          id="phone"
          className="form-control mb-3"
        />

        <label htmlFor="details">Details</label>
        <textarea
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          id="details"
          className="form-control mb-3"
        ></textarea>
        <div className="">
          <button onClick={cashPayment} className="btn btn-success me-3 mb-3">
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
              "Cash payment"
            )}
          </button>
          <button onClick={onlinePayment} className="btn btn-warning mb-3">
            {loadingOnline ? (
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
              "Online payment"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
