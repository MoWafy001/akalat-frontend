import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from "../config";
import { useState } from "react";

export const RDLogin = ({ login }: { login: Function }) => {
  const navigate = useNavigate();
  const [isRestaurant, setIsRestaurant] = useState(true);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    return await fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success("Login successful");
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.record));
          login();
          return navigate("/");
        } else {
          toast.error(res.error);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="auth-container">
      <div className="banner-half">
        <img src="/akalat-logo.png" alt="akalat logo" />
        <h1>Akalat</h1>
      </div>
      <form
        className="auth-input"
        action={
          isRestaurant ? config.api.restaurant.login : config.api.delivery.login
        }
        onSubmit={handleLogin}
      >
        <h2>Login</h2>
        <div className="inputs">
          <input type="text" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />

          <div className="row">
            <div
              className={
                "col col-5 px-1 py-2 border shadow rounded m-auto text-center" +
                (isRestaurant ? " bg-warning text-white" : "")
              }
              style={{
                cursor: "pointer",
              }}
              onClick={() => setIsRestaurant(true)}
            >
              Restaurant
            </div>
            <div
              className={
                "col col-5 px-1 py-2 border shadow rounded m-auto text-center" +
                (isRestaurant ? "" : " bg-warning text-white")
              }
              style={{
                cursor: "pointer",
              }}
              onClick={() => setIsRestaurant(false)}
            >
              Delivery
            </div>
          </div>
        </div>

        <Link to="/forgot" className="forgot-link">
          Forgot password?
        </Link>

        <button className="auth-button" type="submit">
          Login
        </button>

        <div className="notice">
          Don't have an account? <Link to="/register/restaurant">Register</Link>
        </div>
      </form>
    </div>
  );
};
