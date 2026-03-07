import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import "./EntryPreviewModal.css";

function EntryPreviewModal({ entry, onClose, onDelete }) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleYesDelete = () => {
    onDelete(entry.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleNoDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="epm-overlay" onClick={onClose}>
        <div className="epm-modal" onClick={(e) => e.stopPropagation()}>
          <h3 className="epm-title">{entry.title}</h3>
          <p className="epm-date">Created: {entry.date}</p>

          <div
            className="epm-content"
            dangerouslySetInnerHTML={{
              __html: entry.content || "<i>No content yet.</i>",
            }}
          />

          <div className="epm-buttons">
            <button className="epm-btn" onClick={onClose}>
              Cancel
            </button>

            <button
              className="epm-btn"
              onClick={() => navigate(`/entry/${entry.id}`)}
            >
              Edit
            </button>

            <button
              className="epm-btn danger"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          text="Are you sure you want to delete this entry? This action can not be undone."
          onYes={handleYesDelete}
          onNo={handleNoDelete}
        />
      )}
    </>
  );
}

export default EntryPreviewModal;
