import { useEffect, useRef, useState } from "react";
import "./Header.css";
import journalIcon from "../assets/journal.png";
import cameraIcon from "../assets/camera.png";
import calendarIcon from "../assets/calendar.png";
import pfpIcon from "../assets/pfp.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setOpenMenu(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <img
        src={journalIcon}
        alt="journal"
        onClick={() => navigate("/journal")}
      />

      <img
        src={cameraIcon}
        alt="camera"
        onClick={() => navigate("/photo")}
      />

      <img
        src={calendarIcon}
        alt="calendar"
        onClick={() => navigate("/calendar")}
      />

      <div className="pfp-menu-wrapper" ref={menuRef}>
        <img
          src={pfpIcon}
          alt="profile"
          onClick={() => setOpenMenu((prev) => !prev)}
        />

        {openMenu && (
          <div className="pfp-dropdown">
            <button onClick={() => navigate("/signup")}>Sign up</button>
            <button onClick={() => navigate("/login")}>Log in</button>

            <div className="pfp-divider"></div>

            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={() => navigate("/settings")}>Settings</button>
            <button onClick={() => navigate("/help")}>Help</button>
            <button onClick={() => navigate("/request-feature")}>
              Request a feature
            </button>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
