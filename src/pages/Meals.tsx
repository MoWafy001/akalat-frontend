import { Card } from "../components/Card";

export const Meals = () => {
  const testMeal = Card({
    price: "30 L.E",
    ogPrice: "40 L.E",
    name: "Chicken shawarma",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: true,
  });

  const meals = [
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
    testMeal,
  ];

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
