import React from 'react';
import './Titlecard.css';
import { Link } from 'react-router-dom';

const TitleCard = ({ cartoon }) => {
  return (
    <div className="tc-card">
      <Link to ={`/video?Id=${cartoon.id}`}>
      <div className="tc-imageWrapper">
        <img
          src={cartoon.image}
          alt={cartoon.Title}
          className="tc-image"
        />
      </div>
      </Link>

        <div className="tc-content">
        <h3 className="tc-title p-2">{cartoon.Title}</h3>
      </div>
    </div>
  );
};

export default TitleCard;
