import { useEffect, useState } from "react";
import Slider from "react-slick";
import { config } from "../../config";
import { toast } from "react-toastify";

export const RNewMeal = ({ logout }: { logout: Function }) => {
  const [images, setImages] = useState<any[]>([]);

  const handleCreate = (e: any) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const description = form.description.value;
    const price = form.price.value;
    const originalPrice = form.originalPrice.value;

    const images = form.images.files;

    const restaurant = JSON.parse(localStorage.getItem("user") as string);
    const id = restaurant._id;

    fetch(form.action, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        originalPrice,
        restaurant: id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Meal added successfully");
          return res.json();
        } else {
          toast.error("Something went wrong");
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        // upload images
        for (let i = 0; i < images.length; i++) {
          const data = new FormData();
          data.append("image", images[i], Date.now() + images[i].name);
          return fetch(
            config.api.restaurant.meal.addImage + `?_id=${res.record._id}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: data,
            }
          ).then((res) => {
            if (res.ok) {
              toast.success("Images added successfully");
              return res.json();
            } else {
              toast.error("Something went wrong");
            }
          });
        }
      });
  };

  return (
    <>
      <h1>Add Meal</h1>

      <form
        action={config.api.restaurant.meal.create}
        method="POST"
        className="content new-meal"
        onSubmit={handleCreate}
      >
        <div className="row">
          <div className="col col-6">
            <Slider slidesToShow={1} slidesToScroll={1} autoplay={true}>
              {images.map((image) => (
                <img src={URL.createObjectURL(image)} alt="meal" />
              ))}
            </Slider>
          </div>
          <div className="col col-6 add-images">
            <input
              type="file"
              multiple
              hidden
              name="images"
              id="new-images"
              onChange={(e: any) => {
                setImages(Array.from(e.target.files));
              }}
            />
            <label className="new-btn" htmlFor="new-images">
              Select Images
            </label>
          </div>
        </div>

        <div className="input-field">
          <label htmlFor="new-name">Name</label>
          <input type="text" id="new-name" name="name" />
        </div>

        <div className="input-field">
          <label htmlFor="new-desc">Description</label>
          <textarea id="new-desc" name="description"></textarea>
        </div>

        <div className="input-field">
          <label htmlFor="new-price">Price</label>
          <input type="text" id="new-price" name="price" />
        </div>

        <div className="input-field">
          <label htmlFor="new-og-price">Original Price</label>
          <input type="text" id="new-og-price" name="originalPrice" />
        </div>

        <div className="row">
          <button className="new-btn col col-4 mx-auto mt-3 mb-3">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
