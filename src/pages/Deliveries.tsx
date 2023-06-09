import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listDeliveries } from "../api/user";
import { config } from "../config";

export const Deliveries = ({ logout }: { logout: Function }) => {
  const [deliveries, setDeliveries] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listDeliveries()
      .then((data) => {
        setDeliveries(
          data.record.map((delivery: any) => {
            return {
              name: delivery.name,
              rate: "⭐".repeat(delivery.rate),
              showTools: false,
              image: delivery.image
                ? config.api.host + delivery.image.path.replace(/\\/g, "/")
                : undefined,
              cardPagePath: `/deliveries/${delivery._id}`,
              restaurantName: delivery.restaurant && delivery.restaurant.name,
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
            <div key={index}>
              <Card {...delivery} />
            </div>
          );
        })}
      </div>
    </>
  );
};
