import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { getWishlist, removeFromWishlist } from "../api/user";
import { config } from "../config";
import { toast } from "react-toastify";

export const WishList = () => {
  const [meals, setMeals] = useState([] as any[]);

  const generateCardRemove = (mealId: string) => {
    return async () => {
      await removeFromWishlist(mealId)
        .then((data) => {
          toast.success("Removed from wishlist");
          setMeals((prev) => {
            return prev.filter((meal) => meal._id !== mealId);
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Couldn't remove from wishlist");
          toast.error(err.error);
        });
    };
  };

  useEffect(() => {
    getWishlist().then((data) => {
      const { record } = data;
      const { items } = record;
      setMeals(
        items.map((item: any) => {
          const meal = item.meal;
          return {
            _id: meal._id,
            price: meal.price,
            ogPrice: meal.originalPrice,
            name: meal.name,
            rate: "⭐ ⭐ ⭐ ⭐",
            showTools: false,
            showRemove: true,
            removeFunction: generateCardRemove(meal._id),
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
