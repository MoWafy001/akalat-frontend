import { Link, Outlet } from "react-router-dom";

export const Layout = () => (
  <>
    <nav>
      {/* logo */}
      <div className="nav-logo">
        <Link to="/">
          <img src="akalat-logo.png" alt="logo" />
          <span>Akalat</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="nav-search">
        {/* search button icon */}
        <button>
          <img src="/zoomer.png" alt="search" />
        </button>

        {/* search box */}
        <input type="text" placeholder="Search" />

        {/* search filter button*/}
        <button className="humberger-menu">
          <img src="/levels-controls.png" alt="filter" />
        </button>
      </div>

      {/* nav links 1 */}
      <ul className="nav-links">
        <li>
          <Link to="/resturants">Resturants</Link>
        </li>
        <li>
          <Link to="/delivery">Delivery</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>
        </li>
      </ul>

      {/* nav links 2 */}
      <ul className="nav-links nav-right">
        <li>
          <Link to="/wishlist">
            <img src="/heart-outline-shape.png" alt="wishlist" />
          </Link>
        </li>

        <li>
          <Link to="/cart">
            <img src="shopping-cart.png" alt="cart" />
          </Link>
        </li>

        {/* hamburger menu */}
        <li>
          <button>
            <img src="menu.png" alt="menu" />
          </button>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
);
