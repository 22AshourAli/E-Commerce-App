import React, { useEffect, useState } from 'react';
import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext()



const CartProvider = ({ children }) => {
    let [numOfItems, setNumOfItems] = useState(0)
    let [totalPrice, setTotalPrice] = useState(0)
    let [products, setProducts] = useState(null)
    let [cartId, setCartId] = useState('')

    useEffect(() => {
        getUserCart()
    }, []);

    async function getUserCart() {
        try {
            let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("token") }
            })

            if (data.status == "success") {
                setNumOfItems(data.numOfCartItems)
                setTotalPrice(data.data.totalCartPrice)
                setProducts(data.data.products)
                setCartId(data.data._id)
            }
            return data

        } catch (error) {
            setProducts([])
        }
    }

    async function addProductToCart(addedProductId) {
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: addedProductId
                },
                {
                    headers: { token: localStorage.getItem("token") }
                }
            )

            if (data.status == "success") {
                getUserCart()
            }

            return data

        } catch (error) {
            console.log(error);
        }
    }

    async function removeItem(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: { token: localStorage.getItem("token") }
            })

            if (data.status == "success") {
                setNumOfItems(data.numOfCartItems)
                setTotalPrice(data.data.totalCartPrice)
                setProducts(data.data.products)
            }

            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function updateProductCounter(id, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count: count }, { headers: { token: localStorage.getItem("token") } }
            )

            if (data.status == "success") {
                setNumOfItems(data.numOfCartItems)
                setTotalPrice(data.data.totalCartPrice)
                setProducts(data.data.products)
            }

            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function clearUserCart() {
        try {
            let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("token") }
            })

            if (data.message == "success") {
                setNumOfItems(0)
                setTotalPrice(0)
                setProducts("")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <cartContext.Provider value={{ addProductToCart, numOfItems, totalPrice, products, removeItem, updateProductCounter, clearUserCart, cartId, setNumOfItems, setProducts, setTotalPrice, getUserCart }}>
            {children}
        </cartContext.Provider>
    </>
}

export default CartProvider;
