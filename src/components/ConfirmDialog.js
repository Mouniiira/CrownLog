import "./ConfirmDialog.css";

function ConfirmDialog({ text, onYes, onNo }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p className="confirm-text">{text}</p>

        <div className="confirm-buttons">
          <button className="confirm-btn yes-btn" onClick={onYes}>
            Yes
          </button>

          <button className="confirm-btn no-btn" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
