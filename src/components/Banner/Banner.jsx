import React, { useState, useEffect } from "react";
import { Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import "./Banner.css";

const slides = [
  {
    image: "https://wallpapercave.com/dwp2x/wp14091127.jpg",
    title: "Dogy Don",
    description:
      "Join SpongeBob and Patrick on hilarious underwater adventures in Bikini Bottom. Laughter and friendship await beneath the sea!",
  },
  {
    image: "https://www.mightyraju.com/images/gallery/hobby-club.jpg",
    title: "The Mighty Raju",
    description:
      "Blossom, Bubbles, and Buttercup fight villains and save the city — all while being adorable and powerful superheroes!",
  },
  {
    image: "https://storage.googleapis.com/kaggle-datasets-images/2136537/3554162/0473eccb7645c78ad29d97fcf69a3127/dataset-cover.jpg?t=2022-04-30-12-38-18",
    title: "Tom & Jerry: The Chase Continues",
    description:
      "Experience the timeless rivalry between Tom and Jerry in their funniest and most mischievous adventures ever!",
  },
  {
    image: "https://wallpapercave.com/dwp2x/wp11640770.jpg",
    title: "Adventure Time: Motu patlu",
    description:
      "Join Finn and Jake as they explore magical kingdoms, battle strange creatures, and learn the meaning of true friendship.",
  },
  {
    image: "https://www.chhotabheem.com/image/catalog/wallpaper/Chhota_Bheem_the_rescuer.jpg",
    title: "Chota Bheem",
    description:
      "Travel through space and time with the wildest duo in the multiverse. Expect chaos, comedy, and cosmic science gone wrong!",
  },
];


const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="hero-banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="hero-slide"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="hero-overlay"></div>

        {/* Navigation buttons */}
        <button
          className={`hero-nav hero-nav-left ${isHovered ? "visible" : ""}`}
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className={`hero-nav hero-nav-right ${isHovered ? "visible" : ""}`}
          onClick={goToNext}
        >
          <ChevronRight size={24} />
        </button>

        <div className="hero-content">
          <h1 className="hero-title">{currentSlide.title}</h1>
          <p className="hero-description">{currentSlide.description}</p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary-banner">
              <Play size={20} fill="currentColor" />
              Watch Now
            </a>
            <a href="#" className="btn-secondary-banner">
              <Plus size={20} />
              Add to List
            </a>
          </div>
        </div>

        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
