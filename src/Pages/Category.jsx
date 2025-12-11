import Categorycard from "../components/Categorycard/Categorycard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Subbanner from "../components/Subbanner/Subbanner";
import "./Category.css";
const Category = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Subbanner title='🎬 Explore Categories' description='Discover amazing cartoons across different genres and themes'/>
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Browse by Genre</h2>
            <a href="#" className="view-all">
              View All <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          <div className="category-grid">
            <Categorycard title='Action & Adventure' description='Sweet and romantic stories with beautiful animation' icon= <i className="fas fa-heart category-icon"></i> />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Category;
