import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/PlaylistCard/Card";
import ShimmerCard from "../utility/ShimmerCard";
import ShimmerLine from "../utility/ShimmerLine";
import httpClient from "../services/httpClient";
import useLogin from "../hooks/Login";

const Playlist = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // Track which video is being deleted
  const navigate = useNavigate();
  const isLogin = useLogin();

  // Fetch playlist
  useEffect(() => {
    // Only fetch if user is logged in
    if (!isLogin) {
      setLoading(false);
      return;
    }

    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const response = await httpClient.post("/videoList");
        
        // Handle response structure - API returns 'videos' array
        if (response.data.status && response.data.videos) {
          setVideos(response.data.videos);
        } else if (response.data.content) {
          setVideos(response.data.content);
        } else if (response.data.results) {
          setVideos(response.data.results);
        } else if (response.data.Vidoes) {
          setVideos(response.data.Vidoes);
        } else if (Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        
        // Check if error is due to authentication
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Token invalid or expired, clear storage
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to load playlist");
        }
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [isLogin]);

  // Perform the actual deletion
  const performDelete = async (videoId) => {
    setDeleting(videoId);
    
    try {
      const response = await httpClient.post("/deleteList", {
        "video_Id": videoId
      });

      // Check if deletion was successful
      if (response.data.status || response.status === 200) {
        // Remove video from local state
        setVideos(prevVideos => prevVideos.filter(video => video.Video_ID !== videoId));
        
        // Show success toast
        toast.success("Video removed from playlist successfully!");
      } else {
        console.error("Failed to delete video:", response.data.message);
        toast.error("Failed to remove video from playlist. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      
      // Check if error is due to authentication
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        navigate("/signin");
      } else {
        toast.error("An error occurred while removing the video. Please try again.");
      }
    } finally {
      setDeleting(null);
    }
  };

  // Handle delete video with toast confirmation
  const handleDelete = (videoId) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>
            Are you sure you want to remove this video from your playlist?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                closeToast();
              }}
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                performDelete(videoId);
                closeToast();
              }}
              style={{
                padding: '8px 16px',
                background: '#ff3b30',
                border: 'none',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#e03228';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ff3b30';
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
        icon: "⚠️"
      }
    );
  };

  // Handle login button click
  const handleLoginClick = () => {
    navigate("/signin");
  };

  return (
    <>
      {loading && <ShimmerLine loading={loading} />}
      
      <Header />
      
      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">My Playlist</h1>
          <p className="page-subtitle">
            Enjoy your curated collection of favorites
          </p>
        </section>

        <section className="videos-grid">
          {loading ? (
            // Show shimmer cards while loading
            [...Array(12)].map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : !isLogin ? (
            // Show login button when not logged in
            <div className="text-center" style={{ gridColumn: '1 / -1' }}>
              <button 
                onClick={handleLoginClick}
                style={{
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.4)';
                }}
              >
                Login
              </button>
            </div>
          ) : videos.length === 0 ? (
            // Show empty state when logged in but no videos
            <div className="text-center py-5" style={{ gridColumn: '1 / -1' }}>
              <i className="fas fa-list" style={{ fontSize: '4rem', color: 'rgba(255, 255, 255, 0.3)', marginBottom: '20px' }}></i>
              <p className="no-results">Your playlist is empty.</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                Start adding your favorite videos to see them here!
              </p>
            </div>
          ) : (
            // Display playlist videos
            videos.map((video) => (
              <Card 
                key={video.Video_ID} 
                cartoon={video} 
                onDelete={handleDelete}
                isDeleting={deleting === video.Video_ID}
              />
            ))
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Playlist;