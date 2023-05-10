import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";
import { toast } from "react-toastify";

export const RestaurantRegister = () => {
  const navigate = useNavigate();

  const handleRegister = async(e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfirm = form["password-confirm"].value;
    const address = form.address.value;
    const phone = form.phone.value;
    const url = form.url.value;

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    return await fetch(form.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address, phone, url }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success("Account created successfully");
          toast.info("Please login to continue");
          return navigate("/login");
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
        action={config.api.restaurant.register}
        method="POST"
        onSubmit={handleRegister}
      >
        <h2>Register as Restaurant</h2>
        <div className="inputs">
          <input required type="text" name="name" placeholder="name" />
          <input required type="email" name="email" placeholder="email" />
          <input
            required
            type="password"
            name="password"
            placeholder="password"
          />
          <input
            required
            type="password"
            placeholder="password confirm"
            name="password-confirm"
          />
          <input required type="text" name="address" placeholder="address" />
          <input required type="text" name="phone" placeholder="phone" />
          <input required type="text" name="url" placeholder="URL" />
        </div>
        <Link to="/forgot" className="forgot-link">
          Forgot password?
        </Link>

        <button className="auth-button" type="submit">
          Login
        </button>

        <div className="notice">
          Do you have an account? <Link to="/login/rd">Login</Link>
        </div>
      </form>
    </div>
  );
};
