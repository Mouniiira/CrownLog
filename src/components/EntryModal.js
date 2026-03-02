import "./EntryModal.css";

function EntryModal({ entry, close, deleteEntry }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{entry.title}</h3>
        <p>Created: {entry.date}</p>

        <button onClick={close}>Edit</button>
        <button onClick={() => deleteEntry(entry.id)}>Delete</button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}

export default EntryModal;