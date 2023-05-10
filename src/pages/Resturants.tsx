import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listRestaurants } from "../api/user";
import { config } from "../config";

export const Restaurants = ({ logout }: { logout: Function }) => {
  const [restaurants, setRestaurants] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listRestaurants()
      .then((data) => {
        setRestaurants(
          data.record.map((restaurant: any) => {
            return {
              name: restaurant.name,
              rate: "⭐".repeat(restaurant.rate),
              showTools: false,
              image: restaurant.image
                ? config.api.host + restaurant.image.path.replace(/\\/g, "/")
                : undefined,
              cardPagePath: `/restaurants/${restaurant._id}`,
            };
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();
      });
  }, [logout]);

  return (
    <>
      <h1>Restaurants</h1>

      <div className="content-search">
        <button>
          <img src="/zoomer.png" alt="" />
        </button>
        <input
          type="text"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="page-elements">
        {restaurants.map((restaurant: any, index) => {
          if (
            searchTerm &&
            !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
            return null;

          return (
            <div key={index}>
              <Card {...restaurant} />
            </div>
          );
        })}
      </div>
    </>
  );
};
