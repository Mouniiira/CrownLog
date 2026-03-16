import "./EntryCard.css";

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function EntryCard({ entry, onClick }) {
  const previewText = stripHtml(entry.content).slice(0, 100);

  return (
    <div className="entry-wrapper" onClick={onClick}>
      <div className="entry-card">
        <div className="entry-card-content">
          <p className="entry-preview">
            {previewText || "No content yet..."}
          </p>
        </div>
      </div>

      <div className="entry-info">
        <p className="entry-title">{entry.title}</p>
        <small className="entry-date">{entry.date}</small>
      </div>
    </div>
  );
}

export default EntryCard;