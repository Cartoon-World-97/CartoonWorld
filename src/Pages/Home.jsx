import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Banner/Banner";
import CartoonSlider from "./Slider";
import ShimmerLine from "../utility/ShimmerLine";
import httpClient from "../services/httpClient";
import { useEffect, useState, useRef, useCallback } from "react";

const Home = () => {
  const [sections, setSections] = useState([]);
  const [bannervideos, setBannervideos] = useState([]);

  const [page, setPage] = useState(1);
  const [sectionsLoading, setSectionsLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const observer = useRef(null);

  /* ------------------ LOAD SECTIONS ------------------ */
  const loadHomeSections = async (pageNumber = 1) => {
    if (sectionsLoading) return;

    setSectionsLoading(true);

    try {
      const res = await httpClient.get("/", {
        params: { page: pageNumber, limit: 3 },
      });

      const newSections = res.data?.results || [];
      const more = res.data?.has_more ?? false;

      setSections((prev) =>
        pageNumber === 1 ? newSections : [...prev, ...newSections]
      );

      setHasMore(more);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setSectionsLoading(false);
    }
  };

  /* ------------------ LOAD BANNER ------------------ */
  const loadBanner = async () => {
    if (bannerLoading) return;

    setBannerLoading(true);

    try {
      const res = await httpClient.post("/banner");
      if (res.data?.status) {
        setBannervideos(res.data?.Banner_Suggestions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBannerLoading(false);
    }
  };

  /* ------------------ INITIAL LOAD ------------------ */
  useEffect(() => {
    const init = async () => {
      await Promise.all([loadBanner(), loadHomeSections(1)]);
      setInitialLoad(false);
    };
    init();
  }, []);

  /* ------------------ PAGINATION ------------------ */
  useEffect(() => {
    if (page === 1) return;
    loadHomeSections(page);
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

      {!bannerLoading && bannervideos.length > 0 && (
        <Banner banner={bannervideos} />
      )}

      <main className="main-content">
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

export default Home;
