import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <LogoBar />

      <div className="settings-page">

        <div className="settings-grid">
          <button onClick={() => navigate("/settings/profile")}>
            Edit profile
          </button>

          <button onClick={() => navigate("/settings/password")}>
            Password and authentication
          </button>

          <button onClick={() => navigate("/settings/accessibility")}>
            Accessibility
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
