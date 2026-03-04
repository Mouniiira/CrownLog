import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import "./PhotoBooth.css";

function PhotoBooth() {
  const [styles, setStyles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("styles")) || [];
    setStyles(saved);
  }, []);

  const goNew = () => navigate("/photo/new");
  const goEdit = (id) => navigate(`/photo/${id}`);

  return (
    <>
      <Header />
      <LogoBar />

      <div className="pb">
        <h2 className="pb-title">Photo booth</h2>

        <div className="pb-grid">
          {styles.map((s) => (
            <div key={s.id} className="pb-card" onClick={() => goEdit(s.id)}>
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
                  {s.fav ? <span className="pb-heart">♡</span> : null}
                </div>
                <div className="pb-sub">Times worn: {s.timesWorn ?? 0}</div>
              </div>
            </div>
          ))}

          <div className="pb-add" onClick={goNew}>
            +
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotoBooth;