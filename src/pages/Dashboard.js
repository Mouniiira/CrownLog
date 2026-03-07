import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import { useUser } from "../context/UserContext";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useUser();

  return (
    <>
      <Header />
      <LogoBar />

      <div className="dashboard-page">
        <h1 className="dashboard-welcome">
          Welcome{user?.name ? `, ${user.name}` : ""}!
        </h1>

        <p className="dashboard-subtext">
          Ready to log your next hairstyle?
        </p>
      </div>
    </>
  );
}

export default Dashboard;
