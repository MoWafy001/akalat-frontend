import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listRestaurants } from "../api/user";

export const Restaurants = ({ logout }: { logout: Function }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    listRestaurants()
      .then((data) => {
        setRestaurants(
          data.record.map((restaurant: any) => {
            return Card({
              name: restaurant.name,
              rate: "⭐".repeat(restaurant.rate),
              showTools: false,
            });
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          logout();
          window.location.href = "/login";
        }
      });
  }, [logout]);

  return (
    <>
      <h1>Restaurants</h1>

      <div className="content-search">
        <button>
          <img src="/zoomer.png" alt="" />
        </button>
        <input type="text" />
      </div>

      <div className="page-elements">
        {restaurants.map((restaurant, index) => (
          <div key={index}>{restaurant}</div>
        ))}
      </div>
    </>
  );
};
