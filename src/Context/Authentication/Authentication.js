import React, { useEffect, useState } from 'react';
import { createContext } from "react";

export let AuthenticationContext = createContext()

const AuthenticationProvider = ({ children }) => {
    let [token, setToken] = useState(null)

    useEffect(function () {
        if (localStorage.getItem("token") != null) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    return (
        <AuthenticationContext.Provider value={{ token, setToken }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationProvider;
