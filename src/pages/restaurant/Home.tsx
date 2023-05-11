// Will have a header then 3 sections
// 1. Meals
// 2. Resturants
// 3. Delivery

import Slider from "react-slick";

import { useEffect, useState } from "react";
import { config } from "../../config";
import { Card } from "../../components/Card";
import { listDeliveries, listMeals } from "../../api/restaurant";

export const RHome = ({
  logout,
  searchTerm,
}: {
  logout: Function;
  searchTerm: string;
}) => {
  const [meals, setMeals] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    listMeals()
      .then((data) => {
        setMeals(
          data.record.map((meal: any) => {
            return {
              name: meal.name,
              rate: "⭐".repeat(meal.rate),
              showTools: true,
              price: meal.price,
              ogPrice: meal.originalPrice,
              image: meal.image.length
                ? config.api.host + meal.image[0].path.replace(/\\/g, "/")
                : undefined,
              mealId: meal._id,
              cardPagePath: `/meals/${meal._id}`,
            };
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
            return {
              name: delivery.name,
              rate: "⭐".repeat(delivery.rate),
              showTools: false,
              image: delivery.image
                ? config.api.host + delivery.image.path.replace(/\\/g, "/")
                : undefined,
              cardPagePath: `/deliveries/${delivery._id}`,
            };
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();
      });
  }, [logout, setMeals, setDeliveries]);

  return (
    <>
      <h1>Welcome</h1>

      <div className="home-sections">
        <div className="section">
          <h2>Meals</h2>
          <Slider slidesToScroll={4} slidesToShow={4} autoplay={true}>
            {meals.map((meal: any, index) => {
              if (
                searchTerm &&
                !meal.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return null;

              return (
                <div key={index}>
                  <Card {...meal} />
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="section">
          <h2>Delivery</h2>
          <Slider
            slidesToScroll={deliveries.length < 4 ? deliveries.length : 4}
            slidesToShow={deliveries.length < 4 ? deliveries.length : 4}
            autoplay={true}
          >
            {deliveries.map((delivery: any, index) => {
              if (
                searchTerm &&
                !delivery.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return null;

              return (
                <div key={index}>
                  <Card {...delivery} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};
