import { Card } from "../components/Card";

export const Deliveries = () => {
  const testDelivery = Card({
    name: "Ahmed Ali",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
  });

  const deliveries = [
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
    testDelivery,
  ];

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
