import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import "react-slideshow-image/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Resturants";
import { Deliveries } from "./pages/Deliveries";
import { Meals } from "./pages/Meals";
import { WishList } from "./pages/WishList";
import { Cart } from "./pages/MyCart";
import { Orders } from "./pages/Orders";
import { Reviews } from "./pages/Reviews";
import { Account } from "./pages/account";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* route to login if not logged in */}

        {/* Login & Register */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />

        {!isLoggedIn && toast("You need to login first1") && (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        {isLoggedIn && (
          <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
            <Route index element={<Home />} />
            <Route path="resturants" element={<Restaurants />} />
            <Route path="delivery" element={<Deliveries />} />
            <Route path="meals" element={<Meals />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="account" element={<Account />} />
          </Route>
        )}

        {/* Not Found */}
        <Route path="*" element={<>not found</>} />
      </Routes>
    </>
  );
}

export default App;
