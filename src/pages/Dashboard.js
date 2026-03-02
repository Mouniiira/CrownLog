import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./Dashboard.css";

function Dashboard() {
  const username = "Mounira";

  return (
    <>
      <Header />
      <LogoBar />

      <div className="dashboard">
        <h2>Welcome, {username}!</h2>
      </div>
    </>
  );
}

export default Dashboard;