import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CartoonSlider from "./Slider";
import ShimmerLine from "../utility/ShimmerLine";
import httpClient from "../services/httpClient";

import "./Tvshows.css";

const Tvshows = () => {
  const [sections, setSections] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sectionsLoading, setSectionsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const observer = useRef(null);

  /* ------------------ LOAD TV SHOW SECTIONS ------------------ */
  const loadTvShowSections = async (pageNumber = 1) => {
    if (sectionsLoading) return;

    setSectionsLoading(true);

    try {
      const res = await httpClient.post(
        "/page",
        {
          page: pageNumber,
          limit: 10,
          pageName: "Shows",   // 🔥 changed only this
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newSections = res.data.data;
      const more = res.data?.hasMore ?? false;

      setSections((prev) =>
        pageNumber === 1 ? newSections : [...prev, ...newSections]
      );

      setHasMore(more);
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setSectionsLoading(false);
    }
  };

  /* ------------------ INITIAL LOAD ------------------ */
  useEffect(() => {
    const init = async () => {
      await loadTvShowSections(1);
      setInitialLoad(false);
    };
    init();
  }, []);

  /* ------------------ PAGINATION ------------------ */
  useEffect(() => {
    if (page === 1) return;
    loadTvShowSections(page);
  }, [page]);

  /* ------------------ INFINITE SCROLL ------------------ */
  const lastSectionRef = useCallback(
    (node) => {
      if (sectionsLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [sectionsLoading, hasMore]
  );

  return (
    <>
      {initialLoad && <ShimmerLine loading />}

      <Header />

      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">TV Shows</h1>
          <p className="page-subtitle">
            Binge-watch your favorite animated series
          </p>
        </section>

        {sections.map((section, index) => {
          const isTitleCard = Number(section.Is_title_Card) === 1;

          const slider = (
            <CartoonSlider
              heading={section.Name}
              cartoons={section.Videos}
              istitleCard={isTitleCard}
              isCard={!isTitleCard}
            />
          );

          if (index === sections.length - 1) {
            return (
              <div ref={lastSectionRef} key={index}>
                {slider}
              </div>
            );
          }

          return <div key={index}>{slider}</div>;
        })}

        {sectionsLoading && <ShimmerLine loading />}
      </main>

      <Footer />
    </>
  );
};

export default Tvshows;
