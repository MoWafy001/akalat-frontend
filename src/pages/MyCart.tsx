import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { getCart } from "../api/user";
import { config } from "../config";

export const Cart = ({ logout }: { logout: Function }) => {
  const testMeal = Card({
    price: "30 L.E",
    ogPrice: "40 L.E",
    name: "Chicken shawarma",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    showRemove: true,
    cardPagePath: "/meals/123",
  });

  const meals = [testMeal, testMeal, testMeal];

  // const orders = [
  //   {
  //     restaurant: {
  //       name: "Koshary El Tahrir",
  //       img: "https://via.placeholder.com/350x150",
  //     },
  //     meals: meals,
  //     total: "180 L.E",
  //     ogTotal: "240 L.E",
  //   },
  // ];

  const [orders, setOrders] = useState(
    [] as {
      restaurant: {
        name: string;
        img: string;
      };
      meals: any[];
      total: string;
      ogTotal: string;
    }[]
  );

  useEffect(() => {
    getCart()
      .then((data) => {
        const record = data.record;
        const { items, restaurant, total, originalTotal } = record;
        setOrders([
          {
            restaurant: {
              name: restaurant ? restaurant.name : "",
              img: restaurant
                ? config.api.host + restaurant.image.path.replace(/\\/g, "/")
                : "",
            },
            meals: items.map((item: any) => {
              const meal = item.meal;
              return {
                price: meal.price,
                ogPrice: meal.originalPrice,
                name: meal.name,
                rate: "⭐".repeat(meal.rate),
                showTools: false,
                showRemove: true,
                image: meal.image
                  ? config.api.host + meal.image[0].path.replace(/\\/g, "/")
                  : undefined,
                cardPagePath: `/meals/${meal._id}`,
              };
            }),
            total: total,
            ogTotal: originalTotal,
          },
        ]);
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();

        console.log(err);
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
        My Cart
        <img src="/shopping-cart.png" alt="Heart" width={30} height={30} />
      </h1>

      {orders.map((order, index) => (
        <div className="card-order" key={index}>
          <h2>
            <img src={order.restaurant.img} alt="" />
            {order.restaurant.name}{" "}
          </h2>
          <div className="order-details">
            <div className="order-meals">
              {order.meals.map((meal: any, index) => (
                <div key={index}>
                  <Card {...meal} />
                </div>
              ))}
            </div>
            <div className="order-total">
              <h3>Total: {order.total}</h3>
              <h3>
                Origianl Totatl: <span className="sliced">{order.ogTotal}</span>
              </h3>
            </div>
            <div className="order-options">
              <button>Flush</button>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
