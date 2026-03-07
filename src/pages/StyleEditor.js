import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import { useUser } from "../context/UserContext";
import "./StyleEditor.css";

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

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

const emptyStyle = () => ({
  id: Date.now(),
  name: "",
  fav: false,
  wantedImage: "",
  gotImage: "",
  materials: [],
  tutorialUrl: "",
  timesWorn: 0,
  createdAt: new Date().toLocaleDateString(),
});

function StyleEditor({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const STORAGE_KEY = user?.email
    ? `photoStyles_${user.email}`
    : "photoStyles_guest";

  const [style, setStyle] = useState(emptyStyle());
  const [materialsInput, setMaterialsInput] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    if (mode !== "edit") {
      setStyle(emptyStyle());
      return;
    }

    const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const found = all.find((s) => String(s.id) === String(id));
    if (found) setStyle(found);
  }, [mode, id, STORAGE_KEY, user]);

  const embedUrl = useMemo(() => toYouTubeEmbed(style.tutorialUrl), [style.tutorialUrl]);

  const onPickImage = async (file, which) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setStyle((prev) => ({ ...prev, [which]: dataUrl }));
  };

  const addMaterial = () => {
    const m = materialsInput.trim();
    if (!m) return;
    setStyle((prev) => ({ ...prev, materials: [...(prev.materials || []), m] }));
    setMaterialsInput("");
  };

  const removeMaterial = (idx) => {
    setStyle((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== idx),
    }));
  };

  const save = () => {
    if (!user?.email) return;

    const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (mode === "new") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...all, style]));
    } else {
      const updated = all.map((s) =>
        String(s.id) === String(style.id) ? style : s
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    navigate("/photo");
  };

  const cancel = () => {
    navigate("/photo");
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="se">
        <div className="se-card">
          <div className="se-top">
            <input
              className="se-name"
              placeholder="Style name"
              value={style.name}
              onChange={(e) => setStyle((p) => ({ ...p, name: e.target.value }))}
            />

            <button
              type="button"
              className={`se-fav ${style.fav ? "on" : ""}`}
              onClick={() => setStyle((p) => ({ ...p, fav: !p.fav }))}
              aria-label="favourite"
              title="Favourite"
            >
              ♥
            </button>
          </div>

          <div className="se-divider" />

          <h3 className="se-section-title">What I wanted vs what I got</h3>

          <div className="se-compare">
            <div className="se-photo">
              <label className="se-photo-box">
                {style.wantedImage ? (
                  <img src={style.wantedImage} alt="wanted" />
                ) : (
                  <div className="se-photo-placeholder">📷</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPickImage(e.target.files?.[0], "wantedImage")}
                  hidden
                />
              </label>
              <div className="se-photo-label">Wanted</div>
            </div>

            <div className="se-photo">
              <label className="se-photo-box">
                {style.gotImage ? (
                  <img src={style.gotImage} alt="got" />
                ) : (
                  <div className="se-photo-placeholder">📷</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPickImage(e.target.files?.[0], "gotImage")}
                  hidden
                />
              </label>
              <div className="se-photo-label">Got</div>
            </div>
          </div>

          <div className="se-materials">
            <div className="se-materials-head">
              <h3 className="se-section-title">Material needed</h3>

              <button type="button" className="se-plus" onClick={addMaterial} title="Add material">
                +
              </button>
            </div>

            <div className="se-materials-input">
              <input
                value={materialsInput}
                onChange={(e) => setMaterialsInput(e.target.value)}
                placeholder="e.g. gel, comb, rubber bands..."
              />
              <button type="button" onClick={addMaterial}>Add</button>
            </div>

            <ul className="se-list">
              {(style.materials || []).map((m, idx) => (
                <li key={`${m}-${idx}`}>
                  {m}
                  <button type="button" onClick={() => removeMaterial(idx)}>x</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="se-row">
            <div className="se-label">Video tutorial</div>

            <input
              className="se-url"
              placeholder="Paste YouTube link"
              value={style.tutorialUrl}
              onChange={(e) => setStyle((p) => ({ ...p, tutorialUrl: e.target.value }))}
            />
          </div>

          {embedUrl && (
            <div className="se-video">
              <iframe
                src={embedUrl}
                title="Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="se-row se-counter-row">
            <div className="se-label">Times worn:</div>
            <div className="se-counter">
              <button
                type="button"
                onClick={() => setStyle((p) => ({ ...p, timesWorn: Math.max(0, (p.timesWorn || 0) - 1) }))}
              >
                -
              </button>
              <span>{style.timesWorn ?? 0}</span>
              <button
                type="button"
                onClick={() => setStyle((p) => ({ ...p, timesWorn: (p.timesWorn || 0) + 1 }))}
              >
                +
              </button>
            </div>
          </div>

          <div className="se-actions">
            <button type="button" className="se-btn ghost" onClick={cancel}>
              Cancel
            </button>
            <button type="button" className="se-btn" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StyleEditor;
