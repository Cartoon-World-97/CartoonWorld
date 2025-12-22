import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ cartoon, onDelete, isDeleting }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('no terger');
    
    // if (onDelete && !isDeleting) {
      onDelete(cartoon.Video_ID);
    // }
  };

  return (
    <div className='cartoon-card' style={{ opacity: isDeleting ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
      <Link to={`/video/${cartoon.Video_ID}`}>
        <div className="image-wrapper">
          <img
            src={cartoon.image}
            alt={cartoon.title}
            className="cartoon-image"
          />
        </div>
      </Link>
      <button 
        className="delete-button"
        onClick={handleDelete}
        aria-label="Delete"
        disabled={isDeleting}
        style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
      >
        {isDeleting ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </button>
    </div>
  );
};

export default Card;