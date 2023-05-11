import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listMeals } from "../api/user";
import { config } from "../config";

export const Meals = ({ logout }: { logout: Function }) => {
  const [meals, setMeals] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listMeals()
      .then((data) => {
        setMeals(
          data.record.map((meal: any) => {
            return {
              name: meal.name,
              rate: "⭐".repeat(meal.rate),
              showTools: true,
              image: meal.image.length
                ? config.api.host + meal.image[0].path.replace(/\\/g, "/")
                : undefined,
              cardPagePath: `/meals/${meal._id}`,
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
      <h1>Meals</h1>

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
      </div>
    </>
  );
};
