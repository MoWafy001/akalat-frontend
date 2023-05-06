import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "react-slideshow-image/dist/styles.css";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login & Register */}
        <Route path="/login" element={<></>} />
        <Route path="/register" element={<></>} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resturants" element={<>resturants</>} />
          <Route path="delivery" element={<>delivery</>} />
          <Route path="meals" element={<>meals</>} />
          <Route path="wishlist" element={<>wishlist</>} />
          <Route path="cart" element={<>cart</>} />
          <Route path="my-orders" element={<>my-orders</>} />
          <Route path="my-reviews" element={<>my-reviews</>} />
          <Route path="account" element={<>account</>} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<>not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
