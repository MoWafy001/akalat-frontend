import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
export const Layout = ({
  logout,
  setSearchTerm,
  searchTerm,
  getUserRole,
}: {
  logout: Function;
  setSearchTerm: Function;
  searchTerm: string;
  getUserRole: Function;
}) => {
  const userRole = getUserRole();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearchOptions, setShowSearchOptions] = useState(false);

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/");
  };

  return (
    <>
      <nav>
        {/* logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src="/akalat-logo.png" alt="logo" />
            <span>Akalat</span>
          </Link>
        </div>

        {isHome && userRole !== "delivery" && (
          <div className="nav-search menu-holder">
            <button>
              <img src="/zoomer.png" alt="search" />
            </button>

            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
            />

            <button
              className="humberger-menu"
              onClick={() => {
                setShowSearchOptions(!showSearchOptions);
              }}
            >
              <img src="/levels-controls.png" alt="filter" />
            </button>

            {showSearchOptions && (
              <div className="menu search hamberger">
                {userRole === "user" && (
                  <Link to="/resturants">Resturants</Link>
                )}

                <Link to="/delivery">Delivery</Link>
                <Link to="/meals">Meals</Link>
              </div>
            )}
          </div>
        )}

        {/* nav links 1 */}
        <ul className="nav-links">
          {userRole === "user" && (
            <Link to="/resturants">
              <li>Resturants</li>
            </Link>
          )}

          {userRole !== "delivery" && (
            <>
              <Link to="/delivery">
                <li>Delivery</li>
              </Link>
              <Link to="/meals">
                <li>Meals</li>
              </Link>
            </>
          )}
        </ul>

        {/* nav links 2 */}
        <ul className="nav-links nav-right">
          {userRole === "user" && (
            <>
              <Link to="/wishlist">
                <li>
                  <img src="/heart-outline-shape.png" alt="wishlist" />
                </li>
              </Link>
              <Link to="/cart">
                <li>
                  <img src="/shopping-cart.png" alt="cart" />
                </li>
              </Link>
            </>
          )}

          {/* hamburger menu */}
          <li className="menu-holder">
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <img src="/menu.png" alt="menu" />
            </button>
            {showMenu && (
              <div className="menu hamberger">
                {userRole !== "delivery" && <Link to="/orders">My Orders</Link>}
                {/* <Link to="/reviews">My Reviews</Link> */}
                <div className="divider"></div>
                <Link to="/account">My Account</Link>
                <Link to="" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
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
