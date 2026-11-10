import React from 'react';
import './InfoPanel.css';

const InfoPanel = ({ section, aboutMe, skills, onClose, onSectionChange }) => {
  const tabs = [
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' }
  ];

  const handleTabClick = (tabId) => {
    onSectionChange(tabId);
  };

  return (
    <div className="info-panel">
      <button
        className="info-panel-close"
        onClick={onClose}
        aria-label="Close info panel"
      >
        ✕
      </button>

      <div className="info-panel-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`info-panel-tab ${section === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-current={section === tab.id ? 'true' : 'false'}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="info-panel-content">
        {section === 'about' && (
          <div className="about-content">
            <h3 className="about-title">
              {aboutMe.name}
              <span className="about-zodiac">{aboutMe.zodiac}</span>
            </h3>

            <div className="about-section">
              <p>{aboutMe.intro}</p>
            </div>

            <div className="about-section">
              <p>{aboutMe.hobbies}</p>
            </div>
          </div>
        )}

        {section === 'skills' && (
          <div className="skills-content">
            <h3 className="skills-title">My Skills</h3>

            <div className="skills-categories">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skills-category">
                  <h4 className="category-title">{category}</h4>
                  <div className="category-tags">
                    {items.map((skill, index) => (
                      <span key={index} className="tag skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;