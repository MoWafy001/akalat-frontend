import { useEffect, useState } from "react";
import Slider from "react-slick";
import { config } from "../../config";
import { toast } from "react-toastify";

export const RNewDelivery = ({ logout }: { logout: Function }) => {
  const [images, setImages] = useState<any[]>([]);

  const handleCreate = (e: any) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const gender = form.gender.value;

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
        email,
        password,
        phone,
        gender,
        address,
        restaurant: id,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success("Meal added successfully");
          return res.json();
        } else {
          toast.error("Something went wrong");
          toast.error((await res.json()).error)
          throw new Error("Something went wrong");
        }
      })
      .then(async (res) => {
        // upload images
        for (let i = 0; i < images.length; i++) {
          const data = new FormData();
          data.append("image", images[i], Date.now() + images[i].name);
          await fetch(
            config.api.restaurant.delivery.addImage + `?_id=${res.record._id}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: data,
            }
          ).then((res) => {
            if (res.ok) {
              toast.success("Image added successfully");
              return res.json();
            } else {
              toast.error("Something went wrong");
            }
          });
        }
        toast.success("ALl images added successfully");
      });
  };

  return (
    <>
      <h1>Add Meal</h1>

      <form
        action={config.api.restaurant.delivery.create}
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
          <label htmlFor="new-dname">Name</label>
          <input type="text" id="new-dname" name="name" />
        </div>

        <div className="input-field">
          <label htmlFor="new-demail">Email</label>
          <input type="emaile" id="new-demail" name="email" />
        </div>
        <div className="input-field">
          <label htmlFor="new-dpassword">Password</label>
          <input type="text" id="new-dpassword" name="password" />
        </div>
        <div className="input-field">
          <label htmlFor="new-daddress">Address</label>
          <input type="text" id="new-daddress" name="address" />
        </div>
        <div className="input-field">
          <label htmlFor="new-dphone">Phone</label>
          <input type="text" id="new-dphone" name="phone" />
        </div>
        <div className="input-field">
          <label htmlFor="new-dgender-male">Male</label>
          <input
            type="radio"
            id="new-dgender-male"
            name="gender"
            value="male"
          />

          <label htmlFor="new-dgender-female">Female</label>
          <input
            type="radio"
            id="new-dgender-female"
            name="gender"
            value="female"
          />
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
