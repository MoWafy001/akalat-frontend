import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "react-slideshow-image/dist/styles.css";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Resturants";
import { Deliveries } from "./pages/Deliveries";
import { Meals } from "./pages/Meals";
import { WishList } from "./pages/WishList";
import { Cart } from "./pages/MyCart";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login & Register */}
        <Route path="/login" element={<></>} />
        <Route path="/register" element={<></>} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resturants" element={<Restaurants />} />
          <Route path="delivery" element={<Deliveries />} />
          <Route path="meals" element={<Meals />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<>my-reviews</>} />
          <Route path="account" element={<>account</>} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<>not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
