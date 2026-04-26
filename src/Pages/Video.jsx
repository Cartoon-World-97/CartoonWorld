import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "./Video.css";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card/Card";
import httpClient from "../services/httpClient";
import { useNavigate, useParams } from "react-router-dom";

const Video = () => {
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  /* ---------------- CHECK LOGIN ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("Jwttoken");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
  }, []);

  /* ---------------- FETCH VIDEO (ONLY IF LOGGED IN) ---------------- */
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchVideo = async () => {
      try {
        const res = await httpClient.post("/video", { id });

        if (!res.data.status) {
          navigate("/");
          return;
        }

        setVideo(res.data.Video);
        setVideos(res.data.Similar);
      } catch (err) {
        console.error("Video Fetch Error:", err);
      }
    };

    fetchVideo();
  }, [id, isLoggedIn, navigate]);

  /* ---------------- FORMAT DATE ---------------- */
  const formatDMY = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();

    return `${d}/${m}/${y}`;
  };

  /* ---------------- NOT LOGGED UI ---------------- */
  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="profile-login-prompt">
            <i className="fas fa-user-lock"></i>
            <h2>Please login to watch this video</h2>
            <p>Sign in to access your account information and watch history</p>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        <Footer />
      </>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <>
      <Header />

      <main className="main-content">
        {/* Video Player */}
        <div className="video-iframe-container">
          <iframe
            className="video-iframe"
            src={video?.Video_Url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="video-player"
          ></iframe>
        </div>

        {/* Video Details */}
        <div className="video-details">
          <div className="video-info">
            <h1 className="video-title">
              {video ? video.Title : "Loading..."}
            </h1>

            <div className="video-meta">
              <div className="meta-item">
                <span>Cartoon World</span>
              </div>

              <div className="meta-item">
                <span>
                  {video
                    ? formatDMY(video.Date)
                    : "Published Recently"}
                </span>
              </div>

              <div className="meta-item">
                <span>{video ? video.Time : "--:--"}</span>
              </div>
            </div>

            <div className="video-categories">
              <span className="category-badge">
                {video ? video.Content_Type || "General" : ""}
              </span>
            </div>

            <div className="video-description">
              {video
                ? video.Description
                : "Loading description..."}
            </div>

            <div className="video-actions">
              <button className="action-btn">
                <span>Add to Playlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Videos */}
        <section className="videos-grid my-5">
          {videos.map((video) => (
            <Card key={video.Video_ID} cartoon={video} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Video;