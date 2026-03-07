import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === form.email.toLowerCase() &&
        user.password === form.password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    navigate("/profile");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotMessage("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email.toLowerCase() === forgotEmail.toLowerCase()
    );

    if (!foundUser) {
      setForgotMessage("No account was found with that email.");
      return;
    }

    setForgotMessage(
      "Password reset email sent successfully. This is a demo popup for now."
    );
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="auth-page">
        <div className="auth-card">
          <h2>Log in</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </label>

            <button
              type="button"
              className="forgot-link"
              onClick={() => {
                setShowForgotModal(true);
                setForgotEmail("");
                setForgotMessage("");
              }}
            >
              Forgot password?
            </button>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-btn">
              Log in
            </button>
          </form>
        </div>
      </div>

      {showForgotModal && (
        <div
          className="auth-modal-overlay"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="auth-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Forgot password</h3>
            <p>Enter your email to receive a reset email.</p>

            <form onSubmit={handleForgotPassword} className="auth-form">
              <label>
                Email
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </label>

              {forgotMessage && (
                <p className="auth-message">{forgotMessage}</p>
              )}

              <div className="auth-modal-actions">
                <button
                  type="button"
                  className="auth-secondary-btn"
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="auth-btn">
                  Send email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;