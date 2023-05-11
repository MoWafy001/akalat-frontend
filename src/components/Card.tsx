import { useState } from "react";
import { addToCart, addToWishlist } from "../api/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Card = ({
  price,
  ogPrice,
  name,
  rate,
  showTools,
  showRemove = false,
  removeFunction,
  review,
  image,
  mealId,
  cardPagePath,
}: {
  price?: string;
  ogPrice?: string;
  name: string;
  rate: string;
  showTools: boolean;
  showRemove?: boolean;
  removeFunction?: any;
  review?: string;
  image?: string;
  mealId?: string;
  cardPagePath: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    console.log("Add to cart");
    await addToCart(mealId as string, quantity)
      .then((data) => {
        console.log(data);
        toast.success("Added to cart");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Couldn't add to cart");
        toast.error(err.error);
      });
  };

  const handleAddToWishlist = async () => {
    console.log("Add to wishlist");
    await addToWishlist(mealId as string)
      .then((data) => {
        console.log(data);
        toast.success("Added to wishlist");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Couldn't add to wishlist");
        toast.error(err.error);
      });
  };

  return (
    <div className="card">
      {image && (
        <img src={image || "https://via.placeholder.com/350"} alt="meal" />
      )}
      <div className="card-info">
        <div className="card-price">
          <span>{price ? price + " L.E" : ""}</span>
          <span className="og-price">{ogPrice ? ogPrice + " L.E" : ""}</span>
        </div>
        <Link
          to={cardPagePath}
          className="card-name"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {name}
        </Link>

        {review && (
          <div className="card-review">
            <span className="review-title">Review:</span>
            <span className="review-body">{review}</span>
          </div>
        )}

        <span className="card-rate">{rate}</span>

        {showTools && (
          <div className="card-options">
            <button className="like" onClick={handleAddToWishlist}>
              <img src="/heart-outline-shape.png" alt="like" />
            </button>
            <div className="quantity">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button className="cart-add" onClick={handleAddToCart}>
              <img src="/shopping-cart.png" alt="cart" />
            </button>
          </div>
        )}

        {showRemove && (
          <div className="card-options">
            <div className="quantity" style={{ border: "none" }}>
              <button onClick={removeFunction}>-</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
