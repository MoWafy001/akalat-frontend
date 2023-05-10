import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Slider from "react-slick";
import { getOrders } from "../api/user";
import { config } from "../config";

export const Orders = () => {
  const [orders, setOrders] = useState([] as any[]);
  const [activeOrderType, setActiveOrderType] = useState("pending");

  useEffect(() => {
    getOrders().then((data) => {
      const orders = data.records;
      setOrders(
        orders.map((order: any) => {
          return {
            status: order.status,
            acceptedUser: order.acceptedUser,
            restaurant: {
              name: order.restaurant.name,
              img:
                config.api.host +
                order.restaurant.image.path.replace(/\\/g, "/"),
            },
            meals: order.items.map((item: any) => {
              const meal = item.meal;
              return {
                price: meal.price,
                ogPrice: meal.originalPrice,
                name: meal.name,
                rate: "⭐".repeat(meal.rate),
                showTools: false,
                showRemove: false,
                image: config.api.host + meal.image[0].path.replace(/\\/g, "/"),
                cardPagePath: `/meals/${meal._id}`,
              };
            }),
            total: order.total,
            ogTotal: order.originalTotal,
            startDate: order.startDate,
            defaultEndDate: order.defaultEndDate,
          };
        })
      );
    });
  }, []);

  return (
    <>
      <h1>My Orders</h1>

      {/* pending or accepted */}
      <div className="order-type-choice">
        <div
          className={
            "choice" + (activeOrderType === "pending" ? " active" : "")
          }
          onClick={() => setActiveOrderType("pending")}
        >
          Pending
        </div>
        <div
          className={
            "choice" + (activeOrderType === "accepted" ? " active" : "")
          }
          onClick={() => setActiveOrderType("accepted")}
        >
          Accepted
        </div>
      </div>

      <div className="orders">
        {orders
          .filter((order) => order.status === activeOrderType)
          .map((order, index) => (
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
                  <span className="date-val">
                    Start Date: {order.startDate}
                  </span>
                  <span className="date-val">
                    Default End Date: {order.defaultEndDate}
                  </span>
                </div>
              </div>
              <div className="col">
                <Slider
                  slidesToScroll={(order.meals.length > 1 && 2) || 1}
                  slidesToShow={(order.meals.length > 1 && 2) || 1}
                  autoplay={true}
                >
                  {order.meals.map((meal: any, index: number) => (
                    <div key={index} className="order-items-cards">
                      <Card {...meal} />
                    </div>
                  ))}
                </Slider>

                {order.acceptedUser !== "pending" && (
                  <span className="status accepted">Accepted</span>
                )
                ||
                <span className="status to-accept">click to accept</span>
                }
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
