export const Card = ({
  price,
  ogPrice,
  name,
  rate,
  showTools,
}: {
  price?: string;
  ogPrice?: string;
  name: string;
  rate: string;
  showTools: boolean;
}) => {
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

        {showTools && (
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
        )}
      </div>
    </div>
  );
};
