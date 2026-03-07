import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import ConfirmDialog from "../components/ConfirmDialog";
import RichEditor from "../components/RichEditor";
import { useUser } from "../context/UserContext";
import "./EntryPage.css";

function EntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const STORAGE_KEY = useMemo(
    () =>
      user?.email ? `journalEntries_${user.email}` : "journalEntries_guest",
    [user]
  );

  const [entry, setEntry] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const found = entries.find((e) => String(e.id) === String(id));

    if (found) {
      setEntry(found);
      setTitle(found.title || "");
      setContent(found.content || "");
    }
  }, [id, STORAGE_KEY, user]);

  const saveEntry = () => {
    if (!user?.email) return;

    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updatedEntries = entries.map((e) =>
      String(e.id) === String(id)
        ? {
            ...e,
            title: title.trim() || "Untitled",
            content,
          }
        : e
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    navigate("/journal");
  };

  const deleteEntry = () => {
    if (!user?.email) return;

    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const filtered = entries.filter((e) => String(e.id) !== String(id));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    navigate("/journal");
  };

  if (!entry) {
    return (
      <>
        <Header />
        <LogoBar />
        <div className="entry-page">
          <p>Entry not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <LogoBar />

      <div className="entry-page">
        <input
          className="entry-title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <RichEditor value={content} onChange={setContent} />

        <div className="entry-buttons">
          <button onClick={() => setShowLeaveConfirm(true)}>Cancel</button>
          <button onClick={saveEntry}>Save</button>
          <button onClick={() => setShowDeleteConfirm(true)}>Delete</button>
        </div>
      </div>

      {showLeaveConfirm && (
        <ConfirmDialog
          text="Leave without saving?"
          onYes={() => navigate("/journal")}
          onNo={() => {
            saveEntry();
          }}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          text="Are you sure you want to delete this entry? This action can not be undone."
          onYes={deleteEntry}
          onNo={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}

export default EntryPage;