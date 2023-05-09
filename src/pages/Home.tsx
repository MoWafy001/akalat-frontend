// Will have a header then 3 sections
// 1. Meals
// 2. Resturants
// 3. Delivery

import { Card } from "../components/Card";
import Slider from "react-slick";

import { useEffect, useState } from "react";
import { listDeliveries, listMeals, listRestaurants } from "../api/user";
import { config } from "../config";

export const Home = ({ logout }: { logout: Function }) => {
  const [meals, setMeals] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    listMeals()
      .then((data) => {
        setMeals(
          data.record.map((meal: any) => {
            return Card({
              name: meal.name,
              rate: "⭐".repeat(meal.rate),
              showTools: true,
              image: meal.image
                ? config.api.host + meal.image[0].path.replace(/\\/g, "/")
                : undefined,
            });
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();
      });

    listRestaurants()
      .then((data) => {
        setRestaurants(
          data.record.map((restaurant: any) => {
            return Card({
              name: restaurant.name,
              rate: "⭐".repeat(restaurant.rate),
              showTools: false,
              image: restaurant.image
                ? config.api.host + restaurant.image.path.replace(/\\/g, "/")
                : undefined,
            });
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();
      });

    listDeliveries()
      .then((data) => {
        setDeliveries(
          data.record.map((delivery: any) => {
            return Card({
              name: delivery.name,
              rate: "⭐".repeat(delivery.rate),
              showTools: false,
              image: delivery.image
                ? config.api.host + delivery.image.path.replace(/\\/g, "/")
                : undefined,
            });
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();
      });
  }, [logout, setMeals, setRestaurants, setDeliveries]);

  return (
    <>
      <h1>Welcome</h1>

      <div className="home-sections">
        <div className="section">
          <h2>Meals</h2>
          <Slider slidesToScroll={4} slidesToShow={4} autoplay={true}>
            {meals.map((meal, index) => (
              <div key={index}>{meal}</div>
            ))}
          </Slider>
        </div>

        <div className="section">
          <h2>Restaurants</h2>
          <Slider slidesToScroll={4} slidesToShow={4} autoplay={false}>
            {restaurants.map((rest, index) => (
              <div key={index}>{rest}</div>
            ))}
          </Slider>
        </div>

        <div className="section">
          <h2>Delivery</h2>
          <Slider slidesToScroll={4} slidesToShow={4} autoplay={false}>
            {deliveries.map((delivery, index) => (
              <div key={index}>{delivery}</div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
