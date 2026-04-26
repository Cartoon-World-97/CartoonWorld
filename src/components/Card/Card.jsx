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
          alt={cartoon.Title}
          className="cartoon-image"
        />
      </div>
    </Link>
    </div>
  );
};

export default Card;