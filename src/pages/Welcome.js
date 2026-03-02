import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import hair1 from "../assets/hair1.png";
import hair2 from "../assets/hair2.png";
import logo from "../assets/logo.png";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">WELCOME</h1>
      <img src={logo} alt="logo" className="welcome-logo" />

      <img src={hair1} className="hair left" alt="hair1" />
      <img src={hair2} className="hair right" alt="hair2" />

      <button
        className="start-btn"
        onClick={() => navigate("/dashboard")}
      >
        Get started
      </button>
    </div>
  );
}

export default Welcome;