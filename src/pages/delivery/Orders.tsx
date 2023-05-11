import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import Slider from "react-slick";
import { config } from "../../config";
import { checkout, getOrders } from "../../api/delivery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const DOrders = () => {
  const [orders, setOrders] = useState([] as any[]);
  const [activeOrderType, setActiveOrderType] = useState("pending");
  const navigate = useNavigate();

  const handleCheckout = (
    userId: string,
    restaurantId: string,
    orderId: string
  ) => {
    return () => {
      navigate(`/restaurants/${restaurantId}`);
      checkout(userId, restaurantId, orderId)
        .then((data) => {
          console.log(data);
          toast.success("Order checked out successfully");
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error checking out order");
          navigate(`/`);
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
            user: order.user,
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

                <span>
                  User Accepted:{" "}
                  {order.acceptedUser === "accepted" ? (
                    <span className="text-info">True</span>
                  ) : (
                    <span className="text-danger">False</span>
                  )}
                </span>
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

                {order.acceptedUser === "accepted" && (
                  <span
                    className="status to-accept"
                    onClick={handleCheckout(
                      order.user._id,
                      order.restaurant._id,
                      order.id
                    )}
                  >
                    Checkout
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
