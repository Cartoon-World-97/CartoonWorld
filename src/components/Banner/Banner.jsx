import React, { useState, useEffect } from "react";
import { Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import "./Banner.css";
import { Link } from "react-router-dom";
import httpClient from "../../services/httpClient";

const Banner = ({ banner = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  /* ---------------- ADD TO PLAYLIST ---------------- */
  const playlistadd = async (videoId) => {
    if (!videoId) return;

    try {
      const response = await httpClient.post("/addList", {
        video_Id: videoId,
      });

      if (response.data?.status) {
        toast.success(response.data.message || "Added to playlist");
      } else {
        toast.error(response.data?.message || "Failed to add");
      }
    } catch (error) {
      toast.error("An error occurred while adding the video.");
    }
  };

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!banner.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banner.length]);

  if (!banner.length) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? banner.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banner.length);
  };

  const currentSlide = banner[currentIndex];
  const videoId = currentSlide?.Video_ID; // ✅ use ONE key

  return (
    <section
      className="hero-banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="hero-slide"
        style={{
          backgroundImage: `url(${
            currentSlide?.image || currentSlide?.Program_Img_Path
          })`,
        }}
      >
        <div className="hero-overlay" />

        {/* Navigation */}
        <button
          className={`hero-nav hero-nav-left ${isHovered ? "visible" : ""}`}
          onClick={goToPrevious}
        >
          <ChevronLeft size={26} />
        </button>

        <button
          className={`hero-nav hero-nav-right ${isHovered ? "visible" : ""}`}
          onClick={goToNext}
        >
          <ChevronRight size={26} />
        </button>

        {/* Content */}
        <div className="hero-content">
          <h1 className="hero-title">{currentSlide?.Title}</h1>
          <p className="hero-description">{currentSlide?.Description}</p>

          <div className="hero-buttons">
            <Link
              to={`/video/${videoId}`}
              className="btn-primary-banner"
            >
              <Play size={18} fill="currentColor" />
              Watch Now
            </Link>

            <button
              className="btn-secondary-banner"
              onClick={() => playlistadd(videoId)}
            >
              <Plus size={18} />
              Add to List
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="hero-indicators">
          {banner.map((_, index) => (
            <button
              key={index}
              className={`indicator ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
