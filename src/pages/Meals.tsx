import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listMeals } from "../api/user";
import { config } from "../config";

export const Meals = ({ logout }: { logout: Function }) => {
  const [meals, setMeals] = useState([]);

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
  }, [logout]);

  return (
    <>
      <h1>Meals</h1>

      <div className="content-search">
        <button>
          <img src="/zoomer.png" alt="" />
        </button>
        <input type="text" />
      </div>

      <div className="page-elements">
        {meals.map((meal, index) => (
          <div key={index}>{meal}</div>
        ))}
      </div>
    </>
  );
};
