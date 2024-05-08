import Slider from "react-slick";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { getMeal, getRestaurant } from "../../api/delivery";
import { config } from "../../config";

export const DCardPage = ({ logout }: { logout: Function }) => {
  const typeMap = new Map([
    ["meals", "meal"],
    ["restaurants", "restaurant"],
  ]);

  let [type, id] = window.location.pathname.split("/").slice(1);
  type = typeMap.get(type) || "meal";

  const [data, setData] = useState<any>({
    name: "Sultan Ayub",
    rate: "⭐ ⭐ ⭐ ⭐",
    images: [
      "https://via.placeholder.com/350",
      "https://via.placeholder.com/350",
      "https://via.placeholder.com/350",
      "https://via.placeholder.com/350",
    ],
    sideInfo: "Sultan Ayub",
  });

  const testRestaurant = {
    name: "Sultan Ayub",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    review: "Good restaurant",
    cardPagePath: "/meals/123",
  };

  const restaurants = [
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
    testRestaurant,
  ];

  useEffect(() => {
    switch (type) {
      case "meal":
        getMeal(id)
          .then((data) => {
            const { record } = data;
            setData({
              name: record.name,
              rate: "⭐".repeat(record.rate),
              images: record.image?.map((image: any) => {
                return config.api.host + image.path.replace(/\\/g, "/");
              }),
              sideInfo: record.restaurant.name,
            });
          })
          .catch((err) => {
            // logout if unauthorized
            if (err.message === "Unauthorized") logout();
          });
        break;

      default:
        getRestaurant(id).then((data) => {
          const { record } = data;
          setData({
            name: record.name,
            rate: "⭐".repeat(record.rate),
            images: [config.api.host + record.image.path.replace(/\\/g, "/")],
            sideInfo: record.address,
          });
        });
    }
  }, [id, type]);

  return (
    <div
      className="card-page container"
      style={{
        marginBottom: "100px",
        marginTop: "100px",
      }}
    >
      <div className="sec1 row d-flex p-2 justify-center align-center">
        <div className="col col-2 text-center p-1">
          <Slider slidesToScroll={1} slidesToShow={1} autoplay={true}>
            {data.images.map((image: string, index: number) => (
              <img src={image} alt="" key={index} className="card-page-image" />
            ))}
          </Slider>
        </div>

        <div
          className="col col-8"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* font size big */}
          <div className="row">
            <h2 className="fs-1">{data.name}</h2>
          </div>
          <div className="row fs-3">
            <p>{data.rate}</p>
          </div>
        </div>

        {/* verical alignment */}
        <div
          className="col col-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{data.sideInfo}</p>
        </div>
      </div>

      {/* add review button */}
      {/* <div className="sec2 row">
        <button className="btn btn-warning col col-4 mx-auto my-4`">
          Add Review
        </button>
      </div> */}

      {/* reviews */}
      {/* <div className="page-elements my-5">
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <Card {...restaurant} />
          </div>
        ))}
      </div> */}
    </div>
  );
};
