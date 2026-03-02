import { useState, useEffect } from "react";
import "./Journal.css";
import EntryCard from "../components/EntryCard";
import EntryModal from "../components/EntryModal";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("entries"));
    if (saved) setEntries(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      title: "New Entry",
      date: new Date().toLocaleDateString()
    };
    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
    setSelected(null);
  };

  return (
    <>
          <Header />
          <LogoBar />
    <div className="journal">
      <h2>Journal entries</h2>

      <div className="entry-grid">
        {entries.map(entry => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onClick={() => setSelected(entry)}
          />
        ))}

        <div className="add-card" onClick={addEntry}>+</div>
      </div>

      {selected && (
        <EntryModal
          entry={selected}
          close={() => setSelected(null)}
          deleteEntry={deleteEntry}
        />
      )}
    </div>
    </>
  );
}

export default Journal;