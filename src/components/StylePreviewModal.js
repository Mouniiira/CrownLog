import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import "./StylePreviewModal.css";

function toYouTubeEmbed(url) {
  if (!url) return "";

  const u = url.trim();

  const idMatch =
    u.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/) ||
    u.match(/[?&]v=([a-zA-Z0-9_-]{6,})/) ||
    u.match(/\/embed\/([a-zA-Z0-9_-]{6,})/);

  const id = idMatch ? idMatch[1] : "";
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function StylePreviewModal({ style, onClose, onDelete }) {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const embedUrl = toYouTubeEmbed(style.tutorialUrl);

  const handleYesDelete = () => {
    onDelete(style.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <div className="spm-overlay" onClick={onClose}>
        <div className="spm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="spm-header">
            <h3 className="spm-title">
              {style.name || "Untitled"}
              {style.fav ? <span className="spm-heart">♥</span> : null}
            </h3>
            <div className="spm-date">
              Created: {style.createdAt || style.date}
            </div>
          </div>

          <div className="spm-section-title">What I wanted vs what I got</div>
          <div className="spm-compare">
            <div className="spm-imgBox">
              {style.wantedImage ? (
                <img src={style.wantedImage} alt="wanted" />
              ) : (
                <div className="spm-empty">No wanted image</div>
              )}
            </div>

            <div className="spm-imgBox">
              {style.gotImage ? (
                <img src={style.gotImage} alt="got" />
              ) : (
                <div className="spm-empty">No got image</div>
              )}
            </div>
          </div>

          <div className="spm-section">
            <div className="spm-section-title left">Material needed</div>
            {style.materials?.length ? (
              <ul className="spm-list">
                {style.materials.map((m, idx) => (
                  <li key={`${m}-${idx}`}>{m}</li>
                ))}
              </ul>
            ) : (
              <div className="spm-muted">No materials listed.</div>
            )}
          </div>

          <div className="spm-section">
            <div className="spm-section-title left">Tutorial followed</div>

            {embedUrl ? (
              <div className="spm-video">
                <iframe
                  src={embedUrl}
                  title="Tutorial followed"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="spm-muted">No valid YouTube link.</div>
            )}
          </div>

          <div className="spm-times">
            <span>Times worn:</span>
            <b>{style.timesWorn ?? 0}</b>
          </div>

          <div className="spm-buttons">
            <button className="spm-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="spm-btn"
              onClick={() => navigate(`/photo/${style.id}`)}
            >
              Edit
            </button>
            <button
              className="spm-btn danger"
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
          onNo={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}

export default StylePreviewModal;