import { Card } from "../components/Card";

export const Cart = () => {
  const testMeal = Card({
    price: "30 L.E",
    ogPrice: "40 L.E",
    name: "Chicken shawarma",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    showRemove: true,
  });

  const meals = [testMeal, testMeal, testMeal];

  const orders = [
    {
      restaurant: {
        name: "Koshary El Tahrir",
        img: "https://via.placeholder.com/350x150",
      },
      meals: meals,
      total: "180 L.E",
      ogTotal: "240 L.E",
    },
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
      >
        My WishList{" "}
        <img
          src="/heart-outline-shape.png"
          alt="Heart"
          width={30}
          height={30}
        />
      </h1>

      {orders.map((order, index) => (
        <div className="card-order">
          <h2>
            <img src={order.restaurant.img} alt="rest logo" />
            {order.restaurant.name}{" "}
          </h2>
          <div className="order-details">
            <div className="order-meals">
              {order.meals.map((meal, index) => (
                <div key={index}>{meal}</div>
              ))}
            </div>
            <div className="order-total">
              <h3>Total: {order.total}</h3>
              <h3>Origianl Totatl: <span className="sliced">{order.ogTotal}</span></h3>
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
