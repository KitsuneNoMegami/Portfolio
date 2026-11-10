import React from 'react';
import './Star.css';

// Une couleur par techno principale : la constellation devient lisible d'un coup d'œil
const TAG_COLORS = {
  C: '#ffec8b',
  Java: '#ff9a9e',
  TypeScript: '#6dd5fa',
  GDScript: '#a78bfa',
  PHP: '#c4b5fd',
  Web: '#7ee0c3',
};

const Star = ({ star, depth, index, isActive, isDim, onClick, onHover }) => {
  const isCentral = star.type === 'central';
  const color = TAG_COLORS[star.tags?.[0]] || '#6dd5fa';

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(star);
  };

  return (
    <div
      className={`star ${isCentral ? 'central-star' : 'project-star'} ${isActive ? 'active' : ''} ${isDim ? 'dim' : ''}`}
      style={{ '--depth': depth, '--i': index, '--c': color }}
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
        {isCentral && star.image ? (
          <img src={star.image} alt="" className="central-image" />
        ) : null}
      </span>

      <span className="star-label">
        <span className="star-name">{star.name}</span>
        {star.tags?.length > 0 && (
          <span className="star-tags">
            {star.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </span>
        )}
      </span>
    </div>
  );
};

export default Star;