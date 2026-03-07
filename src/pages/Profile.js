import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./Profile.css";
import { useUser } from "../context/UserContext";

function Profile() {
  const { user } = useUser();

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

  return (
    <>
      <Header />
      <LogoBar />

      <div className="profile-page">
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
              {mostWorn
                ? `${mostWorn.name} (${mostWorn.timesWorn || 0} times)`
                : "None yet"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
