import React from 'react';
import './InfoPanel.css';

const TABS = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const InfoPanel = ({ section, aboutMe, skills, journey, contact, projects, onClose, onSectionChange, onSkillSelect }) => {
  // Nombre de projets par techno, calculé à partir des tags réels
  const counts = {};
  projects.forEach((p) => p.tags?.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));

  const links = [
    { label: 'Personal website', href: contact.website },
    { label: 'GitHub', href: contact.github },
    { label: 'LinkedIn', href: contact.linkedin },
    { label: 'Résumé (PDF)', href: contact.cv },
    { label: contact.email, href: contact.email && `mailto:${contact.email}` },
  ].filter((l) => l.href);

  return (
    <aside className="info-panel" role="dialog" aria-label="About me">
      <button className="info-panel-close" onClick={onClose} aria-label="Close info panel">✕</button>

      <div className="info-panel-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={section === tab.id}
            className={`info-panel-tab ${section === tab.id ? 'active' : ''}`}
            onClick={() => onSectionChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="info-panel-content">
        {section === 'about' && (
          <div>
            <h3 className="about-title">{aboutMe.name}</h3>
            <p className="about-zodiac">{aboutMe.zodiac}</p>
            <p className="about-section">{aboutMe.intro}</p>
            <p className="about-section about-focus">{aboutMe.focus}</p>
            <h4 className="category-title">Beyond the code</h4>
            <p className="about-section">{aboutMe.hobbies}</p>
          </div>
        )}

        {section === 'journey' && (
          <ol className="timeline">
            {journey.map((j) => (
              <li key={j.title}>
                <span className="timeline-period">{j.period}</span>
                <strong>{j.title}</strong>
                <p>{j.text}</p>
              </li>
            ))}
          </ol>
        )}

        {section === 'skills' && (
          <div className="skills-categories">
            {skills.map((cat) => (
              <div key={cat.title} className={`skills-category ${cat.featured ? 'featured' : ''}`}>
                <h4 className="category-title">{cat.title}</h4>
                <div className="category-tags">
                  {cat.items.map((s) =>
                    counts[s] ? (
                      <button key={s} className="tag skill-tag skill-link" onClick={() => onSkillSelect(s)}
                        title="Show these projects on the map">
                        {s} · {counts[s]}
                      </button>
                    ) : (
                      <span key={s} className="tag skill-tag">{s}</span>
                    )
                  )}
                </div>
              </div>
            ))}
            <p className="skills-note">A number = projects using it. Click to highlight them on the map.</p>
          </div>
        )}

        {section === 'contact' && (
          <ul className="contact-list">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">↗ {l.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default InfoPanel;