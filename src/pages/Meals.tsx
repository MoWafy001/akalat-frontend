import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listMeals } from "../api/user";

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
