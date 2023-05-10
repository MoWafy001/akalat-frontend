import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { useState } from "react";
import { CardPage } from "./pages/CardPage";
import { RDLogin } from "./pages/RD-Login";
import { LoginChoice } from "./pages/LoginChoice";
import { RestaurantRegister } from "./pages/RestaurantRegister";
import { RHome } from "./pages/restaurant/Home";
import { RMeals } from "./pages/restaurant/Meals";
import { RDeliveries } from "./pages/restaurant/Deliveries";
import { RCardPage } from "./pages/restaurant/CardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [searchTerm, setSearchTerm] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const getUserRole = (): "user" | "restaurant" | "delivery" => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role;
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Login & Register */}
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/register" element={<Register />} />

        {/* RD */}
        <Route path="login/rd" element={<RDLogin login={login} />} />
        <Route path="register/restaurant" element={<RestaurantRegister />} />

        {!isLoggedIn && (
          <>
            <Route path="/" element={<LoginChoice />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {isLoggedIn && (
          <Route
            path="/"
            element={
              <Layout
                logout={logout}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                getUserRole={getUserRole}
              />
            }
          >
            {/* User */}
            {getUserRole() === "user" && (
              <>
                <Route
                  index
                  element={<Home logout={logout} searchTerm={searchTerm} />}
                />
                <Route
                  path="resturants"
                  element={<Restaurants logout={logout} />}
                />
                <Route
                  path="delivery"
                  element={<Deliveries logout={logout} />}
                />
                <Route path="meals" element={<Meals logout={logout} />} />
                <Route path="wishlist" element={<WishList />} />
                <Route path="cart" element={<Cart logout={logout} />} />
                <Route path="orders" element={<Orders />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="account" element={<Account logout={logout} />} />

                <Route
                  path="meals/:id"
                  element={<CardPage logout={logout} />}
                />
                <Route
                  path="restaurants/:id"
                  element={<CardPage logout={logout} />}
                />
                <Route
                  path="deliveries/:id"
                  element={<CardPage logout={logout} />}
                />
              </>
            )}

            {/* Restaurant */}
            {getUserRole() === "restaurant" && (
              <>
                <Route
                  path="/"
                  element={<RHome logout={logout} searchTerm={searchTerm} />}
                />

                <Route
                  path="delivery"
                  element={<RDeliveries logout={logout} />}
                />
                <Route path="meals" element={<RMeals logout={logout} />} />
                {/* <Route path="orders" element={<Orders />} /> */}
                {/* <Route path="reviews" element={<Reviews />} /> */}
                {/* <Route path="account" element={<Account logout={logout} />} /> */}

                <Route
                  path="meals/:id"
                  element={<RCardPage logout={logout} />}
                />
                <Route
                  path="deliveries/:id"
                  element={<RCardPage logout={logout} />}
                />
              </>
            )}
          </Route>
        )}

        {/* Not Found */}
        <Route path="*" element={<>not found</>} />
      </Routes>
    </>
  );
}

export default App;
