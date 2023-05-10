import { Card } from "../components/Card";
import Slider from "react-slick";

export const Orders = () => {
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

  const orders = [
    {
      restaurant: {
        name: "Koshary El Tahrir",
        img: "https://via.placeholder.com/350x150",
      },
      meals: meals,
      total: "180 L.E",
      ogTotal: "240 L.E",
      startDate: "5-7-2027,01:30 pm",
      defaultEndDate: "5-7-2027,04:30 pm",
    },
    {
      restaurant: {
        name: "Koshary El Tahrir",
        img: "https://via.placeholder.com/350x150",
      },
      meals: meals,
      total: "180 L.E",
      ogTotal: "240 L.E",
      startDate: "5-7-2027,01:30 pm",
      defaultEndDate: "5-7-2027,04:30 pm",
    },
  ];

  return (
    <>
      <h1>My Orders</h1>

      {/* pending or accepted */}
      <div className="order-type-choice">
        <div className="active choice">Pending</div>
        <div className="choice">Accepted</div>
      </div>

      <div className="orders">
        {orders.map((order, index) => (
          <div className="card-order" key={index}>
            <div className="col">
              <div className="restaurant">
                <img src={order.restaurant.img} alt="rest logo" />
                <h4>{order.restaurant.name}</h4>
              </div>
              <div className="total">
                <span className="total-val">Total: {order.total}</span>
                <span className="total-val">
                  Original Total:{" "}
                  <span className="sliced">{order.ogTotal}</span>
                </span>
              </div>
              <div className="date">
                <span className="date-val">Start Date: {order.startDate}</span>
                <span className="date-val">
                  Default End Date: {order.defaultEndDate}
                </span>
              </div>
            </div>
            <div className="col">
              <Slider slidesToScroll={2} slidesToShow={2} autoplay={true}>
                {order.meals.map((meal, index) => (
                  <div key={index}>{meal}</div>
                ))}
              </Slider>
              <span className="status">Accepted</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
