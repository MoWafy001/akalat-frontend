export const MealCard = () => {
  const price = "30 L.E";
  const ogPrice = "40 L.E";
  const name = "Chicken shawarma";
  const rate = "⭐ ⭐ ⭐ ⭐";

  return (
    <div className="card">
      <img src="https://via.placeholder.com/350" alt="meal" />
      <div className="card-info">
        <div className="card-price">
          <span>{price}</span>
          <span className="og-price">{ogPrice}</span>
        </div>
        <span className="card-name">{name}</span>
        <span className="card-rate">{rate}</span>
        <div className="card-options">
          <button className="like">
            <img src="/heart-outline-shape.png" alt="like" />
          </button>
          <div className="quantity">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
          <button className="cart-add">
            <img src="/shopping-cart.png" alt="cart" />
          </button>
        </div>
      </div>
    </div>
  );
};
