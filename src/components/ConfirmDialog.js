import "./ConfirmDialog.css";

function ConfirmDialog({ text, onYes, onNo, mode = "confirm" }) {
  return (
    <div className="cd-overlay">
      <div className="cd-box">
        <p className="cd-text">{text}</p>

        <div className="cd-buttons">
          {mode === "confirm" ? (
            <>
              <button className="cd-btn yes" onClick={onYes}>
                Yes
              </button>
              <button className="cd-btn no" onClick={onNo}>
                No
              </button>
            </>
          ) : (
            <button className="cd-btn ok" onClick={onYes}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
