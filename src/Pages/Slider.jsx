import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Slider.css";
import Card from "../components/Card/Card";
import Titlecard from "../components/Titlecard/Titlecard";
import { Link } from "react-router-dom";

const Slider = ({ cartoons, heading, istitleCard, isCard }) => {
  const [itemsPerView, setItemsPerView] = useState(7);
  const [isHovered, setIsHovered] = useState(false);

  const sliderRef = useRef(null);

  // Drag states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Responsive items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        if (istitleCard) setItemsPerView(5);
        else if (isCard) setItemsPerView(7);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [istitleCard, isCard]);

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Button scroll
  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth * 0.8;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="slider-section mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} // ✅ FIXED
    >
      <div className="section-header">
        <h2 className="section-title">{heading}</h2>

        <Link
          href="#"
          className="view-all"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
          }}
        >
          View All &gt;
        </Link>
      </div>

      <div className="slider-container">
        {/* Prev Button */}
        <button
          onClick={() => scroll("prev")}
          className="nav-button prev-button"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={() => scroll("next")}
          className="nav-button next-button"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.3s ease",
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider */}
        <div
          className="slider-wrapper"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => handleMouseDown(e.touches[0])}
          onTouchMove={(e) => handleMouseMove(e.touches[0])}
          onTouchEnd={handleMouseUp}
          style={{
            overflowX: "auto",
            display: "flex",
            gap: "10px",
            cursor: isDragging ? "grabbing" : "grab",
            scrollBehavior: "smooth",
          }}
        >
          {cartoons.map((cartoon) => (
            <div
              key={cartoon.Video_ID}
              className="slide-item"
              style={{
                flex: `0 0 calc(${100 / itemsPerView}% - ${
                  (20 * (itemsPerView - 1)) / itemsPerView
                }px)`,
              }}
            >
              {isCard && <Card cartoon={cartoon} />}
              {istitleCard && <Titlecard cartoon={cartoon} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;