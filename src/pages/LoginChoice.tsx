import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";

export const LoginChoice = () => {
  return (
    <div className="auth-container">
      <div className="banner-half">
        <img src="/akalat-logo.png" alt="akalat logo" />
        <h1>Akalat</h1>
      </div>
      <form className="auth-input">
        <h2>Choose</h2>

        <Link
          to="/login"
          className="auth-button"
          style={{
            width: "100%",
            textAlign: "center",
            margin: "1rem auto"
          }}
        >
          User
        </Link>

        <Link
          to="/login/rd"
          className="auth-button"
          style={{
            width: "100%",
            textAlign: "center",
            margin: "1rem auto"
          }}
        >
          Restaurant/Delivery
        </Link>
      </form>
    </div>
  );
};
