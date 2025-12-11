import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "./Video.css";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card/Card";
import httpClient from "../services/httpClient";
import { useNavigate, useParams } from "react-router-dom";

const Video = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await httpClient.post("/video", { id });

        if (!res.data.status) {
          navigate("/");
          return;
        }

        setVideo(res.data.Video);
        setVideos(res.data.Similar);
        console.log(res.data.Video);
      } catch (err) {
        console.error("Video Fetch Error:", err);
      }
    };

    fetchVideo();
  }, [id]);
const formatDMY = (dateString) => {
  const date = new Date(dateString);

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
};

  return (
    <>
      <Header />

      <main className="main-content">
        <div className="video-iframe-container">
          <iframe
            className="video-iframe"
            src={video?.Video_Url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-details">
          <div className="video-info">
            <h1 className="video-title">
              {video ? video.Title : "Loading..."}
            </h1>

            <div className="video-meta">
              <div className="meta-item">
                <i className="fas fa-user"></i>
                <span>Cartoon World</span>
              </div>

              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{video ? formatDMY(video.Date) : "Published Recently"}</span>
              </div>

              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{video ? video.Time : "--:--"}</span>
              </div>
            </div>
            <div className="video-categories">
              <span className="category-badge">
                {video ? video.Content_Type || "General" : ""}
              </span>
            </div>

            <div className="video-description">
              {video ? video.Description : "Loading description..."}
            </div>

            <div className="video-actions">
              <button className="action-btn">
                <i className="fas fa-plus"></i>
                <span>Add to Playlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* RELATED VIDEOS SECTION (unchanged) */}
        {/* <section
          className="video-list-section"
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
            </a>
          </div>
          <div className="videos-list" id="relatedVideos">
            <div className="video-list-item fade-in">
              <div className="video-list-thumbnail">
                <img
                  src="https://www.mightyraju.com/images/gallery/hobby-club.jpg"
                  alt="The Dragon Awakens"
                />
                <span className="video-list-duration">12:34</span>
              </div>
              <div className="video-list-content">
                <h3 className="video-list-title">The Dragon Awakens</h3>
                <div className="video-list-channel">
                  Dragon’s Quest Official
                </div>
                <div className="video-list-meta">
                  <div className="video-list-views">
                    <i className="fas fa-eye"></i>
                    <span>1.2M</span>
                  </div>
                  <div className="video-list-date">
                    <i className="fas fa-calendar"></i>
                    <span>Oct 2025</span>
                  </div>
                </div>
              </div>
              <button className="play-button">
                <i className="fas fa-play"></i>
              </button>
            </div>

            <div className="video-list-item fade-in">
              <div className="video-list-thumbnail">
                <img
                  src="https://wallpapercave.com/dwp2x/wp11640770.jpg"
                  alt="Battle for the Crystal Peaks"
                />
                <span className="video-list-duration">09:58</span>
              </div>
              <div className="video-list-content">
                <h3 className="video-list-title">
                  Battle for the Crystal Peaks
                </h3>
                <div className="video-list-channel">
                  Dragon’s Quest Official
                </div>
                <div className="video-list-meta">
                  <div className="video-list-views">
                    <i className="fas fa-eye"></i>
                    <span>856K</span>
                  </div>
                  <div className="video-list-date">
                    <i className="fas fa-calendar"></i>
                    <span>Sep 2025</span>
                  </div>
                </div>
              </div>
              <button className="play-button">
                <i className="fas fa-play"></i>
              </button>
            </div>
          </div>
        </section> */}

         <section className="videos-grid my-5">
          {videos.map((video, index) => {
            if (index === videos.length - 1) {
              return (
                <div key={video.Video_ID}>
                  <Card cartoon={video} />
                </div>
              );
            }
            return <Card key={video.Video_ID} cartoon={video} />;
          })}

          {/* {loading && [...Array(8)].map((_, i) => <ShimmerCard key={i} />)} */}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Video;
