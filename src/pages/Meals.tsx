import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listMeals } from "../api/user";

export const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    listMeals().then((data) => {
      setMeals(
        data.record.map((meal: any) => {
          return Card({
            name: meal.name,
            rate: "⭐".repeat(meal.rate),
            showTools: true,
          });
        })
      );
    });
  }, []);

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
