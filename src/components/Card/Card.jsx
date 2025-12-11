// import { useState } from 'react';
import { Play } from 'lucide-react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ cartoon }) => {
//   const [isHovered, setIsHovered] = useState(false);

  return (
    <div
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
      className='cartoon-card '
    //   className={`cartoon-card ${isHovered ? 'hovered' : ''}`}
    >
    <Link to ={`/video/${cartoon.Video_ID}`}>
      <div className="image-wrapper">
        <img
          src={cartoon.image}
          alt={cartoon.title}
          className="cartoon-image"
        />
        {/* <div className="play-button">
          <Play size={24} fill="white" color="white" style={{ marginLeft: '3px' }} />
        </div>
        <div className="rating-badge">
          <span className="star">⭐</span>
          <span>{cartoon.rating}</span>
        </div> */}
      </div>

      {/* <div className="card-content">
        <h3 className="card-title">{cartoon.title}</h3>
        <p className="card-meta">
          {cartoon.year} • {cartoon.genre}
        </p>
        <p className="card-description">
          {cartoon.description}
        </p>
      </div> */}
    </Link>
    </div>
  );
};

export default Card;