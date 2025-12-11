import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card/Card";
import ShimmerCard from "../utility/ShimmerCard";
import httpClient from "../services/httpClient";
import "./Search.css";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import ShimmerLine from "../utility/ShimmerLine";
import { Type } from "lucide-react";

const Search = () => {
  const { searchQuery } = useContext(SearchContext);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  const observer = useRef(null);

  /** ---------------------------------------------------
   *  API CALL - Load Videos
   * --------------------------------------------------- */
  const loadVideos = async (pageNumber = 1) => {
    if (!searchQuery) return;

    setLoading(true);

    try {
      const res = await httpClient.post("/search", {
        query: searchQuery,
        limit: 10,
        page: pageNumber,
        type:'search'
      });

      const newVideos = res.data.results || res.data.Vidoes || [];

      // Set initial shimmer
      if (pageNumber === 1) {
        setVideos(newVideos);
      } else {
        setVideos((prev) => [...prev, ...newVideos]);
      }

      // Pagination logic
      setHasMore(newVideos.length === 10);
    } catch (err) {
      console.error("Search Error:", err);
      setHasMore(false);
    }

    setLoading(false);
    setInitialLoad(false);
  };

  /** ---------------------------------------------------
   *  RESET when searchQuery changes
   * --------------------------------------------------- */
  useEffect(() => {
    if (!searchQuery) return;

    setInitialLoad(true);
    setVideos([]);
    setPage(1);
    setHasMore(true);

    loadVideos(1);
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) return; 
    loadVideos(page);
  }, [page]);
  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  useEffect(() => {
    if (!searchQuery) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {initialLoad && <ShimmerLine loading={loading} />}

      <Header />

      <main className="main-content">
        {/* No results */}
        {!loading && videos.length === 0 && !initialLoad && (
          <div className="text-center no-data">
            <p className="no-results">No results found.</p>
          </div>
        )}
        <section className="videos-grid">
          {videos.map((video, index) => {
            if (index === videos.length - 1) {
              return (
                <div ref={lastVideoRef} key={video.Video_ID}>
                  <Card cartoon={video} />
                </div>
              );
            }
            return <Card key={video.Video_ID} cartoon={video} />;
          })}

          {loading && [...Array(8)].map((_, i) => <ShimmerCard key={i} />)}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Search;
