import "./EntryCard.css";

function EntryCard({ entry, onClick }) {
  return (
    <div className="entry-card" onClick={onClick}>
      <div className="paper"></div>
      <p>{entry.title}</p>
      <small>{entry.date}</small>
    </div>
  );
}

export default EntryCard;