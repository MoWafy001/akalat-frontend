import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { config } from "../../config";
import { listDeliveries } from "../../api/restaurant";
import { Link } from "react-router-dom";

export const RDeliveries = ({ logout }: { logout: Function }) => {
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

      {/* add review button */}
      <div className="sec2 row mb-4">
        <Link
          to="/deliveries/new"
          className="btn btn-warning col col-3 p-3 mx-auto"
        >
          Add Delivery
        </Link>
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
