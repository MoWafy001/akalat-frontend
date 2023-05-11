import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { config } from "../../config";
import { applyOrder, listDeliveries } from "../../api/restaurant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const RAssignDelivery = ({ logout }: { logout: Function }) => {
  const [deliveries, setDeliveries] = useState([]);

  let { orderId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const assign = (deliveryId: string) => {
    return () => {
      navigate("/delivery");
      applyOrder(orderId as string, deliveryId)
        .then((data) => {
          console.log(data);
          toast.success("Order assigned successfully");
          navigate("/orders");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error assigning order");
          navigate("/orders");
        });
    };
  };

  useEffect(() => {
    listDeliveries()
      .then((data) => {
        setDeliveries(
          data.record.map((delivery: any) => {
            return {
              id: delivery._id,
              name: delivery.name,
              rate: "⭐".repeat(delivery.rate),
              showTools: false,
              image: delivery.image
                ? config.api.host + delivery.image.path.replace(/\\/g, "/")
                : undefined,
              cardPagePath: `/deliveries/${delivery._id}`,
            };
          })
        );
      })
      .catch((err) => {
        // logout if unauthorized
        if (err.message === "Unauthorized") logout();
      });
  }, [logout]);

  return (
    <>
      <h1>Deliveries</h1>

      <div className="content-search">
        <button>
          <img src="/zoomer.png" alt="" />
        </button>
        <input
          type="text"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="page-elements">
        {deliveries.map((delivery: any, index) => {
          if (
            searchTerm &&
            !delivery.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
            return null;

          return (
            <div key={index} className="text-center">
              <Card {...delivery} />
              <button className="btn btn-warning" onClick={assign(delivery.id)}>
                select
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
