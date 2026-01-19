import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/PlaylistCard/Card";
import ShimmerLine from "../utility/ShimmerLine";
import httpClient from "../services/httpClient";
import useLogin from "../hooks/Login";

const Playlist = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const navigate = useNavigate();
  const isLogin = useLogin();

  // Fetch playlist
  useEffect(() => {
    if (!isLogin) {
      setLoading(false);
      return;
    }

    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const response = await httpClient.post("/videoList");

        if (response.data?.videos) {
          setVideos(response.data.videos);
        } else if (Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load playlist");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [isLogin]);

  // Delete API call
  const performDelete = async (videoId) => {
    setDeleting(videoId);
    try {
      const response = await httpClient.post("/deleteList", {
        video_Id: videoId,
      });

      if (response.data?.status) {
        setVideos((prev) =>
          prev.filter((v) => v.Video_ID !== videoId)
        );
        toast.success("Video removed from playlist");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeleting(null);
    }
  };

  // Confirmation toast
  const handleDelete = (videoId) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: 12 }}>
            Remove this video from playlist?
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={closeToast}>Cancel</button>
            <button
              onClick={() => {
                performDelete(videoId);
                closeToast();
              }}
              style={{ background: "#ff3b30", color: "#fff" }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  return (
    <>
      {loading && <ShimmerLine loading />}

      <Header />

      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">My Playlist</h1>
          <p className="page-subtitle">
            Enjoy your curated collection of favorites
          </p>
        </section>

        {/* NOT LOGGED IN */}
        {!isLogin && (
          <div className="empty-state">
            <p>Please login to view your playlist</p>
            <button onClick={() => navigate("/signin")}>Login</button>
          </div>
        )}

        {/* EMPTY PLAYLIST */}
        {isLogin && !loading && videos.length === 0 && (
          <div className="empty-state">
            <p>Your playlist is empty</p>
          </div>
        )}

        {/* PLAYLIST GRID */}
        <section className="videos-grid">
          {videos.map((video) => (
            <Card
              key={video.Video_ID}
              cartoon={video}
              onDelete={() => handleDelete(video.Video_ID)}
              deleting={deleting === video.Video_ID}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Playlist;
