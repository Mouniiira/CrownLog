import { useEffect, useRef } from "react";
import "./RichEditor.css";

export default function RichEditor({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="re-wrapper">
      <div className="re-toolbar">
        <button type="button" onClick={() => exec("bold")} title="Bold">
          <b>B</b>
        </button>

        <button type="button" onClick={() => exec("italic")} title="Italic">
          <i>I</i>
        </button>

        <button type="button" onClick={() => exec("underline")} title="Underline">
          <u>U</u>
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "h2")}
          title="Title"
        >
          T
        </button>

        <input
          type="color"
          onChange={(e) => exec("foreColor", e.target.value)}
          title="Text colour"
        />
      </div>

      <div
        ref={ref}
        className="re-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
}
