import { useEffect, useRef, useState } from "react";
import { getCurrentUser, updateCurrentUser } from "../api/user";
import { toast } from "react-toastify";
import { config } from "../config";

export const Account = ({ logout }: { logout: Function }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "toz",
    email: "toz@gmail.com",
    address: "toz street",
    phone: "0123456789",
    image: "https://via.placeholder.com/350x150",
  });

  const [editMode, setEditMode] = useState(false);

  const handleUpdate = () => {
    const { name, email, address, phone } = currentUser;

    updateCurrentUser({ name, address, phone, email })
      .then(() => {
        setEditMode(false);
        toast.success("Account updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update account");
        if (err.message === "Unauthorized") logout();
      });
  };

  useEffect(() => {
    getCurrentUser().then((data) => {
      setCurrentUser({
        ...data.record,
        image: config.api.host + data.record.image.path.replace(/\\/g, "/"),
      });
    });
  }, []);

  return (
    <>
      <h1>Account</h1>

      <div className="account-content">
        <div
          className="edit-button"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <img src="/edit-interface-symbol.png" alt="edit" />
        </div>

        <div className="prof-image">
          <img src={currentUser.image} alt="profile" />
        </div>

        <div className="account-info">
          <div className="account-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={currentUser.name}
              disabled={!editMode}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
            />
          </div>
          <div className="account-field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={currentUser.email}
              disabled={!editMode}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />
          </div>
          <div className="account-field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={currentUser.address}
              disabled={!editMode}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, address: e.target.value })
              }
            />
          </div>
          <div className="account-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={currentUser.phone}
              disabled={!editMode}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, phone: e.target.value })
              }
            />
          </div>

          {editMode && (
            <div className="account-field">
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
