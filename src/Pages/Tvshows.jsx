import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import CartoonSlider from "./Slider";
import './Tvshows.css'
const Tvshows = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">TV Shows</h1>
          <p className="page-subtitle">Binge-watch your favorite animated series</p>
        </section>

        {/* <div className="status-tabs">
          <Link to="#" className="status-tab active" data-status="all">
            All Shows
          </Link>
          <Link to="#" className="status-tab" data-status="ongoing">
            Ongoing
          </Link>
          <Link to="#" className="status-tab" data-status="completed">
            Completed
          </Link>
          <Link to="#" className="status-tab" data-status="upcoming">
            Upcoming
          </Link>
        </div>
        <section className="shows-section">
          <div className="shows-grid" id="showsGrid"></div>
        </section> */}
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />
    
      </main>
      <Footer />
    </>
  );
};

export default Tvshows;
