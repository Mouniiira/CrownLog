import { useState } from "react";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./Profile.css";
import { useUser } from "../context/UserContext";
import ConfirmDialog from "../components/ConfirmDialog";

function Profile() {
  const { user } = useUser();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const styles =
    JSON.parse(
      localStorage.getItem(
        user?.email ? `photoStyles_${user.email}` : "photoStyles_guest"
      )
    ) || [];

  const mostWorn =
    styles.length > 0
      ? styles.reduce((max, style) =>
          (style.timesWorn || 0) > (max.timesWorn || 0) ? style : max
        )
      : null;

  const handleDeleteRequest = () => {
    console.log(`Delete request email sent to ${user?.email}`);
    setShowDeleteConfirm(false);
    setShowSuccessPopup(true);
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-pfp-wrap">
              <img src={user?.avatar} alt="profile" className="profile-pfp" />
            </div>

            <h2 className="profile-name">
              {user?.name || "No user logged in"}
            </h2>

            <div className="profile-info">
              <p>
                <strong>Member since:</strong> {user?.memberSince || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <p>
                <strong>Most worn hairstyle:</strong>{" "}
                {mostWorn ? mostWorn.name : "None yet"}
              </p>
            </div>

            <button
              className="delete-btn"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          text="Are you sure you want to permanently delete your account? Your account and all its data will be lost."
          onYes={handleDeleteRequest}
          onNo={() => setShowDeleteConfirm(false)}
        />
      )}

      {showSuccessPopup && (
        <ConfirmDialog
          text="Request sent. Check your email to confirm you want to delete your CrownLog account."
          onYes={() => setShowSuccessPopup(false)}
          mode="info"  
        />
      )}
    </>
  );
}

export default Profile;
