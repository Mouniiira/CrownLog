import { useState } from "react";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import { useUser } from "../context/UserContext";
import "./PasswordAuth.css";

function PasswordAuth() {
  const { user, setUser } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const account = users.find((u) => u.email === user.email);

    if (!account) {
      setMessage("Account not found.");
      return;
    }

    if (account.password !== currentPassword) {
      setMessage("Current password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    account.password = newPassword;

    const updatedUsers = users.map((u) =>
      u.email === account.email ? account : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(account));

    setUser(account);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setMessage("Password updated successfully.");
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="password-page">

        <form className="password-form" onSubmit={handlePasswordChange}>
          <label>
            Current password
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>

          <label>
            New password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Confirm new password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="password-save">
            Update password
          </button>

          {message && <p className="password-message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default PasswordAuth;