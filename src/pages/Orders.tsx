import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Slider from "react-slick";
import { acceptOrder, getOrders } from "../api/user";
import { config } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([] as any[]);
  const [activeOrderType, setActiveOrderType] = useState("pending");
  const navigate = useNavigate();

  const handleAcceptOrder = (
    deliveryId: string,
    restaurantId: string,
    orderId: string
  ) => {
    return () => {
      navigate(`/meals`);
      acceptOrder(deliveryId, restaurantId, orderId)
        .then((data) => {
          console.log(data);
          toast.success("Order accepted successfully");
          navigate(`/orders`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error accepting order");
          navigate(`/orders`);
        });
    };
  };

  useEffect(() => {
    getOrders().then((data) => {
      const orders = data.records;
      setOrders(
        orders.map((order: any) => {
          return {
            id: order._id,
            status: order.status,
            acceptedUser: order.acceptedUser,
            restaurant: {
              _id: order.restaurant._id,
              name: order.restaurant.name,
              img:
                config.api.host +
                order.restaurant.image.path.replace(/\\/g, "/"),
            },
            delivery: order.delivery,
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
                restaurantName: meal.restaurant && meal.restaurant.name,
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
                <div
                  className="restauran d-flex justify-content-center align-items-center gap-2t"
                  style={{
                    width: "fit-content",
                  }}
                >
                  <img src={order.restaurant.img} alt="rest logo" />
                  <h4>{order.restaurant.name}</h4>
                </div>

                {order.delivery && (
                  <div
                    className="delivery d-flex justify-content-center align-items-center gap-2 mx-5"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <img
                      src={
                        config.api.host +
                        order.delivery.image.path.replace(/\\/g, "/")
                      }
                      alt="rest logo"
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <h4>{order.delivery.name}</h4>
                  </div>
                )}

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

                {(order.acceptedUser !== "pending" && (
                  <span className="status accepted">Accepted</span>
                )) ||
                  (order.delivery && (
                    <span
                      className="status to-accept"
                      onClick={handleAcceptOrder(
                        order.delivery._id,
                        order.restaurant._id,
                        order.id
                      )}
                    >
                      click to accept
                    </span>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
