// Will have a header then 3 sections
// 1. Meals
// 2. Resturants
// 3. Delivery

import { Slide } from "react-slideshow-image";
import { Card } from "../components/Card";

export const Home = () => {
  const testMeal = Card({
    price: "31 L.E",
    ogPrice: "41 L.E",
    name: "Chicken shawarma",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: true,
  });

  const testRestaurant = Card({
    name: "Sultan Ayub",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
  });

  const testDelivery = Card({
    name: "Khaled Ali",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
  });

  const meals = [testMeal, testMeal, testMeal, testMeal, testMeal];
  const restaurants = [
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
  ];
  const deliveries = [
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
  ];

  return (
    <>
      <h1>Welcome</h1>

      <div className="home-sections">
        <div className="section">
          <h2>Meals</h2>
          <Slide slidesToScroll={4} slidesToShow={4} autoplay={false}>
            {meals.map((meal, index) => (
              <div key={index}>{meal}</div>
            ))}
          </Slide>
        </div>

        <div className="section">
          <h2>Restaurants</h2>
          <Slide slidesToScroll={4} slidesToShow={4} autoplay={false}>
            {restaurants.map((rest, index) => (
              <div key={index}>{rest}</div>
            ))}
          </Slide>
        </div>

        <div className="section">
          <h2>Delivery</h2>
          <Slide slidesToScroll={4} slidesToShow={4} autoplay={false}>
            {deliveries.map((delivery, index) => (
              <div key={index}>{delivery}</div>
            ))}
          </Slide>
        </div>
      </div>
    </>
  );
};
