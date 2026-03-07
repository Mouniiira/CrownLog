import { useState } from "react";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./Settings.css";
import { useUser } from "../context/UserContext";

function EditProfile() {
  const { user, updateUser } = useUser();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const handleSave = () => {
    updateUser(form);
    alert("Profile updated");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="settings-page">
        <h2>Edit profile</h2>

        <div className="profile-editor">
          <img
            src={form.avatar}
            className="profile-preview"
            alt="avatar"
          />

          <label className="upload-btn">
            Change profile picture
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>

          <label>
            Change name
            <input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>

          <label>
            Change email
            <input
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </label>

          <button className="save-btn" onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProfile;