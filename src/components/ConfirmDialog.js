import "./ConfirmDialog.css";

function ConfirmDialog({ text, onYes, onNo }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p>{text}</p>
        <div className="confirm-buttons">
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;