import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";

const Playlist = () => {
   const video = {
  Video_ID: "vid123",
  title: "The Adventures of ChatGPT",
    image: "https://picsum.photos/300/170",

  rating: 4.5,
  year: 2025,
  genre: "Animation",
  description: "Join ChatGPT on a fun-filled journey through AI adventures and coding challenges!"
};


  return (
    <>
      <Header />
      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">My Playlist</h1>
          <p className="page-subtitle">
            Enjoy your curated collection of favorites
          </p>
        </section>

        <section className="videos-grid">
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
             <Card key={video.Video_ID} cartoon={video} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Playlist;
