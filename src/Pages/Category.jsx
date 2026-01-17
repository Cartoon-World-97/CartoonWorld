import { useState, useEffect } from "react";

import Categorycard from "../components/Categorycard/Categorycard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Subbanner from "../components/Subbanner/Subbanner";
import ShimmerLine from "../utility/ShimmerLine";
import httpClient from "../services/httpClient";

import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  /* ------------------ LOAD CATEGORIES ------------------ */
  const loadCategory = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await httpClient.post(
        "/category",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.status) {
        setCategories(res.data.categories || []);
      }
    } catch (error) {
      console.error("Category load error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ INITIAL LOAD ------------------ */
  useEffect(() => {
    const init = async () => {
      await loadCategory();
      setInitialLoad(false);
    };
    init();
  }, []);

  return (
    <>
      {initialLoad && <ShimmerLine loading />}

      <Header />

      <main className="main-content">
        <Subbanner
          title="🎬 Explore Categories"
          description="Discover amazing cartoons across different genres and themes"
        />

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Browse by Genre</h2>
          </div>

          <div className="row">
            {categories.map((cat) => (
              <Categorycard
                key={cat.Category_ID}
                title={cat.Category_Name}
                description={cat.Description}
                icon={
                  cat.icon ? (
                    <i className={`${cat.icon} category-icon`} />
                  ) : null
                }
              />
            ))}
          </div>

          {loading && <ShimmerLine loading />}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Category;
