import React from 'react';
import './TitleCard.css';
import { Link } from 'react-router-dom';

const TitleCard = ({ cartoon }) => {
  return (
    <div className="tc-card">
      <Link to ={`/video?Id=${cartoon.id}`}>
      <div className="tc-imageWrapper">
        <img
          src={cartoon.image}
          alt={cartoon.title}
          className="tc-image"
        />
      </div>
      </Link>

        <div className="tc-content">
        <h3 className="tc-title p-2">{cartoon.title}</h3>
        {/* <p className="card-meta">
          {cartoon.year} • {cartoon.genre}
        </p> */}
        {/* <p className="card-description">
          {cartoon.description}
        </p> */}
      </div>
    </div>
  );
};

export default TitleCard;
