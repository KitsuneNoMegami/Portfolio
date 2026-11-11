import React from 'react';
import './Star.css';

const TAG_COLORS = {
  C: '#ffec8b', Java: '#ff9a9e', TypeScript: '#6dd5fa',
  GDScript: '#a78bfa', PHP: '#c4b5fd', Web: '#7ee0c3',
};

const Star = ({ star, position, featured, previewUp, isActive, isDim, onClick, onHover, index }) => {
  const isCentral = star.type === 'central';
  const color = TAG_COLORS[star.tags?.[0]] || '#6dd5fa';

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(star);
  };

  return (
    <div
      className={`star ${isCentral ? 'central-star' : 'project-star'} ${featured ? 'featured' : ''} ${isActive ? 'active' : ''} ${isDim ? 'dim' : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%`, '--depth': 1, '--i': index, '--c': color }}
      data-star-id={star.id}
      onClick={handleClick}
      onPointerEnter={() => onHover(star.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(star.id)}
      onBlur={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={star.name}
    >
      <span className="star-core">
        {isCentral && star.image ? <img src={star.image} alt="" className="central-image" /> : null}
      </span>

      <span className="star-label">
        <span className="star-name">{star.name}</span>
        {star.tags?.length > 0 && (
          <span className="star-tags">
            {star.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </span>
        )}
      </span>

      {!isCentral && (
        <span className={`star-preview ${previewUp ? 'up' : 'below'}`}>
          {star.image && <img src={star.image} alt="" loading="lazy" />}
          <span>{star.description}</span>
        </span>
      )}
    </div>
  );
};

export default Star;