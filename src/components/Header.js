import "./Header.css";
import journalIcon from "../assets/journal.png";
import cameraIcon from "../assets/camera.png";
import calendarIcon from "../assets/calendar.png";
import pfpIcon from "../assets/pfp.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

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

      <img
        src={pfpIcon}
        alt="profile"
        onClick={() => navigate("/profile")}
      />
    </div>
  );
}

export default Header;
