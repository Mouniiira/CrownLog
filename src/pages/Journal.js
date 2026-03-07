import { useState, useEffect } from "react";
import "./Journal.css";
import EntryCard from "../components/EntryCard";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import EntryPreviewModal from "../components/EntryPreviewModal";
import { useUser } from "../context/UserContext";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useUser();

  const STORAGE_KEY = user?.email
    ? `journalEntries_${user.email}`
    : "journalEntries_guest";

  useEffect(() => {
    if (!user?.email) return;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setEntries(saved);
  }, [STORAGE_KEY, user]);

  useEffect(() => {
    if (!user?.email) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, STORAGE_KEY, user]);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      title: "New Entry",
      content: "",
      date: new Date().toLocaleDateString(),
    };
    setEntries((prev) => [...prev, newEntry]);
    setSelected(newEntry);
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => String(e.id) !== String(id)));
    setSelected(null);
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="journal">
        <h2>Journal entries</h2>

        <div className="entry-grid">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onClick={() => setSelected(entry)}
            />
          ))}

          <div className="add-card" onClick={addEntry}>
            +
          </div>
        </div>

        {selected && (
          <EntryPreviewModal
            entry={selected}
            onClose={() => setSelected(null)}
            onDelete={deleteEntry}
          />
        )}
      </div>
    </>
  );
}

export default Journal;
