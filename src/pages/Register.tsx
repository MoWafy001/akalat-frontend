import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div className="auth-container">
      <div className="banner-half">
        <img src="/akalat-logo.png" />
        <h1>Akalat</h1>
      </div>
      <div className="auth-input">
        <h2>Register</h2>
        <div className="inputs">
          <input type="text" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <input type="password" placeholder="password confirm" />
          <input type="text" name="address" placeholder="address" />
          <input type="text" name="phone" placeholder="phone" />
        </div>
        <Link to="/forgot" className="forgot-link">
          Forgot password?
        </Link>

        <button className="auth-button" type="submit">
          Login
        </button>

        <div className="notice">
          Do you have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};
