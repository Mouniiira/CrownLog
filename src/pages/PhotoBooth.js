import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import StylePreviewModal from "../components/StylePreviewModal";
import { useUser } from "../context/UserContext";
import "./PhotoBooth.css";

function PhotoBooth() {
  const [styles, setStyles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [favOnly, setFavOnly] = useState(false);

  const navigate = useNavigate();
  const { user } = useUser();

  const STORAGE_KEY = user?.email
    ? `photoStyles_${user.email}`
    : "photoStyles_guest";

  useEffect(() => {
    if (!user?.email) return;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setStyles(saved);
  }, [STORAGE_KEY, user]);

  useEffect(() => {
    if (!user?.email) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));
  }, [styles, STORAGE_KEY, user]);

  const visibleStyles = useMemo(() => {
    return favOnly ? styles.filter((s) => s.fav) : styles;
  }, [styles, favOnly]);

  const goNew = () => navigate("/photo/new");

  const deleteStyle = (id) => {
    setStyles((prev) => prev.filter((s) => String(s.id) !== String(id)));
    setSelected(null);
  };

  return (
    <>
      <Header />
      <LogoBar />

      <div className="pb">
        <div className="pb-top">
          <h2 className="pb-title">Photo booth</h2>

          <button
            className={`pb-filter ${favOnly ? "on" : ""}`}
            onClick={() => setFavOnly((v) => !v)}
          >
            {favOnly ? "★ Favourites" : "☆ All"}
          </button>
        </div>

        <div className="pb-grid">
          {visibleStyles.map((s) => (
            <div key={s.id} className="pb-card" onClick={() => setSelected(s)}>
              <div className="pb-thumb">
                {s.gotImage ? (
                  <img src={s.gotImage} alt="style" />
                ) : (
                  <div className="pb-empty">No photo</div>
                )}
              </div>
              <div className="pb-meta">
                <div className="pb-name">
                  {s.name || "Untitled"}
                  {s.fav ? <span className="pb-heart">♥</span> : null}
                </div>
                <div className="pb-sub">Times worn: {s.timesWorn ?? 0}</div>
              </div>
            </div>
          ))}

          <div className="pb-add" onClick={goNew}>+</div>
        </div>

        {selected && (
          <StylePreviewModal
            style={selected}
            onClose={() => setSelected(null)}
            onDelete={deleteStyle}
          />
        )}
      </div>
    </>
  );
}

export default PhotoBooth;
