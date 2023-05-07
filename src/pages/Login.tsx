import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="auth-container">
      <div className="banner-half">
        <img src="/akalat-logo.png" />
        <h1>Akalat</h1>
      </div>
      <div className="auth-input">
        <h2>Login</h2>
        <div className="inputs">
          <input type="text" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
        </div>
        <Link to="/forgot" className="forgot-link">
          Forgot password?
        </Link>

        <button className="auth-button" type="submit">
          Login
        </button>

        <div className="notice">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};
