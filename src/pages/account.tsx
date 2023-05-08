export const Account = () => {
  const name = "toz";
  const email = "toz@gmail.com";
  const address = "toz street";
  const phone = "0123456789";

  return (
    <>
      <h1>Account</h1>

      <div className="account-content">
        <div className="edit-button">
          <img src="/edit-interface-symbol.png" alt="edit" />
        </div>

        <div className="prof-image">
          <img src="https://picsum.photos/200" alt="profile" />
        </div>

        <div className="account-info">
          <div className="account-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} disabled />
          </div>
          <div className="account-field">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} disabled />
          </div>
          <div className="account-field">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} disabled />
          </div>
          <div className="account-field">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" value={phone} disabled />
          </div>
        </div>
      </div>
    </>
  );
};
