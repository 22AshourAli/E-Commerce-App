import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Category from "./component/Category/Category";
import Brand from "./component/Brand/Brand";
import NotFound from "./component/NotFound/NotFound";
import Layout from "./component/Layout/Layout";
import AuthenticationProvider from "./Context/Authentication/Authentication";
import Profile from "./component/Profile/Profile";
import Product from "./component/Product/Product";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Cart from "./component/Cart/Cart";
import CartProvider from "./Context/Cart/Cart";
import { Toaster } from "react-hot-toast";
import Payment from "./component/Payment/Payment";
import AllOrders from "./component/AllOrders/AllOrders";
import WishlistProvider from "./Context/Wishlist/Wishlist";
import WishList from "./component/WishList/WishList";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import { Offline, Online } from "react-detect-offline";

let queryClient = new QueryClient();
document.addEventListener("keydown", function (e) {
  if (e.code === "F12") {
    e.preventDefault();
  }
});
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Product />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            {" "}
            <Category />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brand",
        element: (
          <ProtectedRoute>
            {" "}
            <Brand />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            {" "}
            <WishList />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            {" "}
            <AllOrders />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            {" "}
            <Payment />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CartProvider>
        <WishlistProvider>
          <AuthenticationProvider>
            <RouterProvider router={router} />
            <Offline>
              <div className="offline bg-success">You Are Offline Now!</div>
            </Offline>
          </AuthenticationProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
