import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { listDeliveries } from "../api/user";

export const Deliveries = ({ logout }: { logout: Function }) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    listDeliveries()
      .then((data) => {
        setDeliveries(
          data.record.map((delivery: any) => {
            return Card({
              name: delivery.name,
              rate: "⭐".repeat(delivery.rate),
              showTools: false,
            });
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
        <input type="text" />
      </div>

      <div className="page-elements">
        {deliveries.map((delivery, index) => (
          <div key={index}>{delivery}</div>
        ))}
      </div>
    </>
  );
};
