import { useState } from "react";
import Header from "../components/Header";
import LogoBar from "../components/LogoBar";
import { useUser } from "../context/UserContext";
import "./Dashboard.css";

import slide1 from "../assets/hair1.png";
import slide2 from "../assets/hair2.png";
import slide3 from "../assets/logo.png";

function Dashboard() {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(1);

  const slides = [
    { id: 1, image: slide1, alt: "Hairstyle 1" },
    { id: 2, image: slide2, alt: "Hairstyle 2" },
    { id: 3, image: slide3, alt: "Hairstyle 3" },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

  return (
    <>
      <Header />
      <LogoBar />

      <div className="dashboard-page">
        <h1 className="dashboard-welcome">
          Welcome{user?.name ? `, ${user.name}` : ""}!
        </h1>

        <p className="dashboard-subtext">
          Ready to log your next hairstyle?
        </p>

        <div className="carousel">
          <div className="carousel-card side left-card">
            <img src={slides[prevIndex].image} alt={slides[prevIndex].alt} />
          </div>

          <button className="carousel-arrow left-arrow" onClick={prevSlide}>
            &#8249;
          </button>

          <div className="carousel-card main-card">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].alt}
            />
          </div>

          <button className="carousel-arrow right-arrow" onClick={nextSlide}>
            &#8250;
          </button>

          <div className="carousel-card side right-card">
            <img src={slides[nextIndex].image} alt={slides[nextIndex].alt} />
          </div>
        </div>

        <div className="carousel-dots">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
