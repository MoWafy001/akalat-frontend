import { Slide } from "react-slideshow-image";
import { Card } from "../components/Card";

export const Reviews = () => {
  const testRestaurant = Card({
    name: "Sultan Ayub",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    review: "Good restaurant",
  });

  const restaurants = [
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
  ];

  return (
    <>
      <h1>My Reviews</h1>

      <div className="order-type-choice">
        <div className="active choice">Restaurant</div>
        <div className="choice">Delivery</div>
        <div className="choice">Meal</div>
      </div>

      <div className="page-elements">
        {restaurants.map((restaurant, index) => (
          <div key={index}>{restaurant}</div>
        ))}
      </div>
    </>
  );
};
