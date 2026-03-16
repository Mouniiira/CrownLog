import "./LogoBar.css";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

function LogoBar() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "";
    if (path === "/journal") return "Journal entries";
    if (path.startsWith("/entry")) return "Journal entries";
    if (path === "/photo") return "Photo Booth";
    if (path.startsWith("/photo/")) return "Photo Booth";
    if (path === "/calendar") return "Calendar";
    if (path === "/profile") return "Profile";
    if (path === "/settings") return "Settings";
    if (path === "/request-feature") return "Request a Feature";

    return "";
  };

  return (
    <div className="logo-bar">
      <img src={logo} alt="logo" className="logo-img" />

      <div className="logo-title">
        {getPageTitle()}
      </div>
    </div>
  );
}

export default LogoBar;
