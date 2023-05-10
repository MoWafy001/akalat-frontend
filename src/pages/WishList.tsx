import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { getWishlist } from "../api/user";
import { config } from "../config";

export const WishList = () => {
  const testMeal = Card({
    price: "30 L.E",
    ogPrice: "40 L.E",
    name: "Chicken shawarma",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    showRemove: true,
    cardPagePath: "/meals/123",
  });

  // const meals = [
  //   testMeal,
  //   testMeal,
  //   testMeal,
  // ];

  const [meals, setMeals] = useState([] as any[]);

  useEffect(() => {
    getWishlist().then((data) => {
      const { record } = data;
      const { items } = record;
      setMeals(
        items.map((item: any) => {
          const meal = item.meal;
          return {
            price: meal.price,
            ogPrice: meal.originalPrice,
            name: meal.name,
            rate: "⭐ ⭐ ⭐ ⭐",
            showTools: false,
            showRemove: true,
            image: config.api.host + meal.image[0].path.replace(/\\/g, "/"),
          };
        })
      );
    });
  }, []);

  return (
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "4rem",
        }}
      >
        My WishList{" "}
        <img
          src="/heart-outline-shape.png"
          alt="Heart"
          width={30}
          height={30}
        />
      </h1>

      <div className="page-elements">
        {meals.map((meal: any, index) => (
          <div key={index}>
            <Card {...meal} />
          </div>
        ))}
      </div>
    </>
  );
};
