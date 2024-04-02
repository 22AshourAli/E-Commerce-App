import React, { useContext } from "react";
import { AuthenticationContext } from "../../Context/Authentication/Authentication";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    let { token } = useContext(AuthenticationContext);
  
    if (localStorage.getItem("token") == null) {
      return <Navigate to={"/login"} />;
    }

    return <>{children}</>;
  };

export default ProtectedRoute;
