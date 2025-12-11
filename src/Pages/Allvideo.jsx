import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import "./Allvideo.css";

const Allvideos = () => {
  const videos = [
    {
      id: 1,
      title: "Adventure Quest",
      genre: "Action",
      rating: "8.5/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=1",
      description: "Epic adventures await in this thrilling action series",
      type: "TV Show",
    },
    {
      id: 2,
      title: "Magical Kingdom",
      genre: "Fantasy",
      rating: "9.2/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=2",
      description: "Enter a world of magic and wonder",
      type: "Movie",
    },
    {
      id: 3,
      title: "Space Explorers",
      genre: "Sci-Fi",
      rating: "8.8/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=3",
      description: "Journey through the cosmos with brave explorers",
      type: "Web Series",
    },
    {
      id: 4,
      title: "Ocean Mysteries",
      genre: "Adventure",
      rating: "8.7/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=4",
      description: "Dive deep into underwater adventures",
      type: "Documentary",
    },
    {
      id: 5,
      title: "Forest Friends",
      genre: "Comedy",
      rating: "8.4/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=5",
      description: "Hilarious tales from the enchanted forest",
      type: "Cartoon",
    },
    {
      id: 6,
      title: "Time Travelers",
      genre: "Adventure",
      rating: "9.0/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=6",
      description: "Travel through time in this exciting series",
      type: "TV Show",
    },
    {
      id: 7,
      title: "Dragon Tales",
      genre: "Fantasy",
      rating: "8.9/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=7",
      description: "Legendary tales of dragons and heroes",
      type: "Movie",
    },
    {
      id: 8,
      title: "Super Heroes",
      genre: "Action",
      rating: "9.1/10",
      year: "2024",
      image: "https://picsum.photos/400/250?random=8",
      description: "Heroes unite to save the world",
      type: "TV Show",
    },
  ];

  return (
    <>
      <Header />
      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">All Videos</h1>
          <p className="page-subtitle">
            Discover and binge-watch the best entertainment from every genre
          </p>
        </section>

        <section className="videos-grid">
          {videos.map((video) => (
            <Card key={video.id} cartoon={video} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Allvideos;
