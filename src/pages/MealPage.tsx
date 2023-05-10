import Slider from "react-slick";
import { Card } from "../components/Card";

export const MealPage = () => {
  const testRestaurant = {
    name: "Sultan Ayub",
    rate: "⭐ ⭐ ⭐ ⭐",
    showTools: false,
    review: "Good restaurant",
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

  return (
    <div className="card-page container">
      <div className="sec1 row d-flex p-2 justify-center align-center">
        <div className="col col-2 text-center p-1">
          <Slider slidesToScroll={1} slidesToShow={1}>
            <img src="https://via.placeholder.com/350" alt="" />
            <img src="https://via.placeholder.com/350" alt="" />
            <img src="https://via.placeholder.com/350" alt="" />
            <img src="https://via.placeholder.com/350" alt="" />
            <img src="https://via.placeholder.com/350" alt="" />
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
            <h2 className="fs-1">Card Name</h2>
          </div>
          <div className="row fs-3">
            <p>⭐ ⭐ ⭐ ⭐</p>
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
          <p>resturant name</p>
        </div>
      </div>

      {/* add review button */}
      <div className="sec2 row">
        <button className="btn btn-warning col col-4 mx-auto my-4`">
          Add Review
        </button>
      </div>

      {/* reviews */}
      <div className="page-elements my-5">
        {restaurants.map((restaurant, index) => (
          <div key={index}>
            <Card {...restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};
