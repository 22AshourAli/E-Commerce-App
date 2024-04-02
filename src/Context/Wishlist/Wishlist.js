import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import toast from "react-hot-toast";

export let wishlistContext = createContext()


const WishlistProvider = ({ children }) => {
    let [wishlistCounter, setWishlistCounter] = useState(0)
    let [userWishlist, setUserWishlist] = useState(null)

    useEffect(function () {
        getUserWishlist()
    }, [])

    async function getUserWishlist() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers: { token: localStorage.getItem("token") }
            })

            if (data.status === "success") {
                setWishlistCounter(data.count)
            }

            setUserWishlist(data.data)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function addProductToWishlist(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId: productId
                },
                {
                    headers: { token: localStorage.getItem("token") }
                })


            if (data.status === "success") {
                toast.success(data.message, {
                    duration: 2000,
                    position: "top-right",
                });
                getUserWishlist()
            } else {
                toast.error("Error", {
                    duration: 2000,
                    position: "top-right",
                });

            }
        } catch (error) {
            console.log(error);
        }
    }

    async function removeProductFromWishlist(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers: { token: localStorage.getItem("token") }
                })

            if (data.status === "success") {
                toast.success(data.message, {
                    duration: 2000,
                    position: "top-right",
                });
                getUserWishlist()
            } else {
                toast.error("Error", {
                    duration: 2000,
                    position: "top-right",
                });

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <wishlistContext.Provider value={{ getUserWishlist, addProductToWishlist, removeProductFromWishlist, wishlistCounter, userWishlist }}>
            {children}
        </wishlistContext.Provider>
    );
}

export default WishlistProvider;
