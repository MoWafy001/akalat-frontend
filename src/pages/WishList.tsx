import { Card } from "../components/Card";

export const WishList = () => {
  const testMeal = Card({
    price: "30 L.E",
    ogPrice: "40 L.E",
    name: "Chicken shawarma",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    showRemove: true,
  });

  const meals = [
    testMeal,
    testMeal,
    testMeal,
  ];

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
      >My WishList <img src="/heart-outline-shape.png" alt="Heart" width={30} height={30} /></h1>

      <div className="page-elements">
        {meals.map((meal, index) => (
          <div key={index}>{meal}</div>
        ))}
      </div>
    </>
  );
};
