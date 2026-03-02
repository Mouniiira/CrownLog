import "./LogoBar.css";
import logo from "../assets/logo.png";

function LogoBar() {
  return (
    <div className="logo-bar">
      <img src={logo} alt="logo" />
    </div>
  );
}

export default LogoBar;