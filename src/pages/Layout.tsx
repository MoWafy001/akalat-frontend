import { Link, Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <nav>
        {/* logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src="akalat-logo.png" alt="logo" />
            <span>Akalat</span>
          </Link>
        </div>

        {isHome && (
          <div className="nav-search">
            <button>
              <img src="/zoomer.png" alt="search" />
            </button>

            <input type="text" placeholder="Search" />

            <button className="humberger-menu">
              <img src="/levels-controls.png" alt="filter" />
            </button>
          </div>
        )}

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
      <div className="content">
        <Outlet />
      </div>

      <footer>
        <div className="footer-top">
          <div className="follow-us col">
            <h3>Follow Us</h3>
            <div className="socials">
              <a href="https://www.facebook.com/">
                <img src="/facebook-logo.png" alt="facebook" />
              </a>
              <a href="https://www.instagram.com/">
                <img src="/instagram.png" alt="instagram" />
              </a>
              <a href="https://www.twitter.com/">
                <img src="/twitter-black-shape.png" alt="twitter" />
              </a>
            </div>
          </div>
          <div className="contact-us col">
            <h3>Contact Us</h3>
            <div className="contacts">
              <div className="contact">
                <span>Call us: </span>
                <a href="tel:+1-279-349-5035">1-279-349-5035</a>
              </div>
              <div className="contact">
                <span>Email: </span>
                <a href="mailto:Akalat12@gmail.com">Akalat12@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyrights">
          <span>Copyright © 2023,Akalat</span>
        </div>
      </footer>
    </>
  );
};
