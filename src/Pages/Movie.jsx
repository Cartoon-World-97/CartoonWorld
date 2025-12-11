import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import CartoonSlider from "./Slider";
import "./Movie.css";
const Movie = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">Movie</h1>
          <p className="page-subtitle">Watch your favorite films anytime</p>
        </section>

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

export default Movie;
