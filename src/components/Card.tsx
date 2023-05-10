import { useState } from "react";

export const Card = ({
  price,
  ogPrice,
  name,
  rate,
  showTools,
  showRemove = false,
  review,
  image,
}: {
  price?: string;
  ogPrice?: string;
  name: string;
  rate: string;
  showTools: boolean;
  showRemove?: boolean;
  review?: string;
  image?: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="card">
      <img src={image || "https://via.placeholder.com/350"} alt="meal" />
      <div className="card-info">
        <div className="card-price">
          <span>{price}</span>
          <span className="og-price">{ogPrice}</span>
        </div>
        <span className="card-name">{name}</span>

        {review && (
          <div className="card-review">
            <span className="review-title">Review:</span>
            <span className="review-body">{review}</span>
          </div>
        )}

        <span className="card-rate">{rate}</span>

        {showTools && (
          <div className="card-options">
            <button className="like">
              <img src="/heart-outline-shape.png" alt="like" />
            </button>
            <div className="quantity">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button className="cart-add">
              <img src="/shopping-cart.png" alt="cart" />
            </button>
          </div>
        )}

        {showRemove && (
          <div className="card-options">
            <div className="quantity" style={{ border: "none" }}>
              <button>-</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
