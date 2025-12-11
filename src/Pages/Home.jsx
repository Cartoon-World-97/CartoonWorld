import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Home.css";
import Banner from "../components/Banner/Banner";
import CartoonSlider from "./Slider";
const Home = () => {
  return (
    <div>
      <Header />
        <Banner/>
      <main className="main-content">
        <CartoonSlider istitleCard={true} isCard={false} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={true} isCard={false} />
        <CartoonSlider istitleCard={false} isCard={true} />
        <CartoonSlider istitleCard={false} isCard={true} />

      </main>
      <Footer/>
    </div>
  );
};

export default Home;
