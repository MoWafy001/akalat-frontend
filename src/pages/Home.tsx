// Will have a header then 3 sections
// 1. Meals
// 2. Resturants
// 3. Delivery

import { Slide } from "react-slideshow-image";
import { MealCard } from "../components/MealCard";

export const Home = () => {
  const meals = [
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
    MealCard,
  ];

  return (
    <>
      <h1>Welcome</h1>

      <div className="home-sections">
        <div className="section">
          <h2>Meals</h2>
          <Slide slidesToScroll={4} slidesToShow={4} autoplay={false}>
            {meals.map((meal, index) => (
              <div key={index}>{meal()}</div>
            ))}
          </Slide>
        </div>
      </div>
    </>
  );
};
