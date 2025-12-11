import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Slider.css";
import Card from "../components/Card/Card";
import Titlecard from "../components/Titlecard/Titlecard";

const Slider = ({ istitleCard, isCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(7);
  const [isHovered, setIsHovered] = useState(false);
  const cartoons = [
    {
      id: 1,
      title: "Adventure Quest",
      genre: "Action",
      rating: "8.5/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=1",
      description: "Epic adventures await in this thrilling action series",
    },
    {
      id: 2,
      title: "Magical Kingdom",
      genre: "Fantasy",
      rating: "9.2/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=2",
      description: "Enter a world of magic and wonder",
    },
    {
      id: 3,
      title: "Space Explorers",
      genre: "Sci-Fi",
      rating: "8.8/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=3",
      description: "Journey through the cosmos with brave explorers",
    },
    {
      id: 4,
      title: "Ocean Mysteries",
      genre: "Adventure",
      rating: "8.7/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=4",
      description: "Dive deep into underwater adventures",
    },
    {
      id: 5,
      title: "Forest Friends",
      genre: "Comedy",
      rating: "8.4/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=5",
      description: "Hilarious tales from the enchanted forest",
    },
    {
      id: 6,
      title: "Time Travelers",
      genre: "Adventure",
      rating: "9.0/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=6",
      description: "Travel through time in this exciting series",
    },
    {
      id: 7,
      title: "Dragon Tales",
      genre: "Fantasy",
      rating: "8.9/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=7",
      description: "Legendary tales of dragons and heroes",
    },
    {
      id: 8,
      title: "Super Heroes",
      genre: "Action",
      rating: "9.1/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=8",
      description: "Heroes unite to save the world",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        if (istitleCard) {
          setItemsPerView(4);
        } else if (isCard) {
          setItemsPerView(7);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, cartoons.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <section
      className="slider-section mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="section-header">
        <h2 className="section-title">Trending Now</h2>
        <a
          href="#"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
          }}
          className="view-all"
        >
          View All &gt;

          {/* <i className="fas fa-arrow-right"></i> */}
        </a>
      </div>
      <div className="slider-container">
        <button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className={`nav-button prev-button ${canGoPrevious ? "active" : ""}`}
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`nav-button next-button ${canGoNext ? "active" : ""}`}
           style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
          }}
        >
          <ChevronRight size={24} />
        </button>

        <div className="slider-wrapper">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              gap: "20px",
            }}
          >
            {cartoons.map((cartoon) => (
              <div
                key={cartoon.id}
                className="slide-item"
                style={{
                  flex: `0 0 calc(${100 / itemsPerView}% - ${
                    (20 * (itemsPerView - 1)) / itemsPerView
                  }px)`,
                }}
              >
                {isCard && <Card cartoon={cartoon} />}
                {istitleCard && <Titlecard cartoon={cartoon} />}
                {/* <Card cartoon={cartoon} /> */}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="indicators">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`indicator ${currentIndex === index ? "active" : ""}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Slider;
