import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Star from '../Star/Star';
import Starfield from '../Starfield/Starfield';
import ProjectModal from '../ProjectModal/ProjectModal';
import InfoPanel from '../InfoPanel/InfoPanel';
import { projects, centralStar, groups, aboutMe, skills, journey, contact } from '../../data/projects.js';
import './StarMap.css';

const allStars = [centralStar, ...projects];
const byId = Object.fromEntries(allStars.map((s) => [s.id, s]));
const groupOf = (s) => groups.find((g) => g.id === s.group);
const allTags = [...new Set(projects.flatMap((p) => p.tags || []))].sort((a, b) =>
  a === 'Web' ? -1 : b === 'Web' ? 1 : a.localeCompare(b)
);

// Liens : Beth → chaque projet (hub) + tracé de chaque constellation (group)
const links = [
  ...projects.map((p) => ({ key: `h${p.id}`, from: 0, to: p.id, kind: 'hub' })),
  ...groups.flatMap((g) =>
    g.members.slice(1).map((id, i) => ({ key: `g${g.id}${id}`, from: g.members[i], to: id, kind: 'group', group: g.id, featured: g.featured }))
  ),
];

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const NARROW = '(max-width: 768px)';

const StarMap = () => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredId, setHoveredId] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW).matches);
  const [zoom, setZoom] = useState({ id: null, x: 50, y: 50, on: false });
  const [warpKey, setWarpKey] = useState(0);
  const timer = useRef(null);

  const posOf = useCallback((s) => (narrow && s.mobilePosition ? s.mobilePosition : s.position), [narrow]);

  useEffect(() => {
    const mq = window.matchMedia(NARROW);
    const onChange = (e) => setNarrow(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const matches = useCallback(
    (s) => !activeTag || s.type === 'central' || s.tags?.includes(activeTag),
    [activeTag]
  );

  const handleStarClick = useCallback((star) => {
    clearTimeout(timer.current);
    setWarpKey((k) => k + 1);
    if (star.id === 0) {
      setSelectedStar(null);
      setZoom((z) => ({ ...z, on: false }));
      setActiveSection('about');
      setShowInfoPanel(true);
      return;
    }
    const p = posOf(star);
    setShowInfoPanel(false);
    setZoom({ id: star.id, x: p.x, y: p.y, on: true });
    timer.current = setTimeout(() => setSelectedStar(star), prefersReduced() ? 0 : 550);
  }, [posOf]);

  const closeModal = useCallback(() => {
    clearTimeout(timer.current);
    setSelectedStar(null);
    setZoom((z) => ({ ...z, on: false }));
  }, []);

  // Échap + flèches (focus de l'étoile voisine la plus proche dans la direction)
  useEffect(() => {
    const dirs = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (selectedStar || zoom.on) closeModal();
        else if (showInfoPanel) setShowInfoPanel(false);
        return;
      }
      const d = dirs[e.key];
      const current = document.activeElement?.dataset?.starId;
      if (!d || current === undefined || selectedStar || showInfoPanel) return;
      const from = posOf(byId[current]);
      let best = null;
      let bestScore = Infinity;
      for (const s of allStars) {
        if (String(s.id) === current || !matches(s)) continue;
        const p = posOf(s);
        const dx = p.x - from.x;
        const dy = p.y - from.y;
        const along = dx * d[0] + dy * d[1];
        if (along <= 0) continue;
        const score = along + 2 * Math.abs(dx * d[1] - dy * d[0]);
        if (score < bestScore) { bestScore = score; best = s; }
      }
      if (best) {
        e.preventDefault();
        document.querySelector(`[data-star-id="${best.id}"]`)?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedStar, zoom.on, showInfoPanel, closeModal, posOf, matches]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const selectTag = (tag) => setActiveTag((t) => (t === tag ? null : tag));

  const focus = useMemo(() => {
    const set = new Set();
    if (hoveredId !== null) {
      set.add(hoveredId);
      links.forEach((l) => {
        if (l.from === hoveredId || l.to === hoveredId) set.add(l.from).add(l.to);
      });
    }
    return set;
  }, [hoveredId]);
  const isLit = (l) => hoveredId !== null && (l.from === hoveredId || l.to === hoveredId);

  return (
    <div className={`star-map-container ${hoveredId !== null ? 'has-focus' : ''}`}>
      <Starfield warpKey={warpKey} />

      <header className="hud">
        <h1>{aboutMe.name}</h1>
        <p>Web Developer · Portfolio</p>
        {contact.website && (
          <a className="hud-link" href={contact.website} target="_blank" rel="noopener noreferrer">
            ↗ Personal website
          </a>
        )}
      </header>

      <nav className="filters" aria-label="Filter projects by technology">
        <button className={`chip ${!activeTag ? 'on' : ''}`} aria-pressed={!activeTag} onClick={() => setActiveTag(null)}>All</button>
        {allTags.map((t) => (
          <button key={t} className={`chip ${activeTag === t ? 'on' : ''}`} aria-pressed={activeTag === t} onClick={() => selectTag(t)}>
            {t}
          </button>
        ))}
      </nav>

      <div className={`constellation ${zoom.on ? 'zoomed' : ''}`} style={{ transformOrigin: `${zoom.x}% ${zoom.y}%` }}>
        <svg className="star-connections" width="100%" height="100%" aria-hidden="true">
          {groups.map((g) => {
            const pts = g.members.map((id) => posOf(byId[id]));
            const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length;
            const cy = pts.reduce((a, p) => a + p.y, 0) / pts.length;
            return (
              <text key={g.id} x={`${cx}%`} y={`${cy}%`} className={`group-label g-${g.id} ${g.featured ? 'featured' : ''}`}>
                {g.name}
              </text>
            );
          })}
          {links.map((l) => {
            let a = posOf(byId[l.from]);
            let b = posOf(byId[l.to]);
            // Les pointillés défilent de (x1,y1) vers (x2,y2). Si l'étoile survolée est
            // l'extrémité "to", on inverse les points : le flux part toujours de l'étoile survolée.
            if (isLit(l) && l.to === hoveredId) [a, b] = [b, a];
            const off = !matches(byId[l.from]) || !matches(byId[l.to]);
            return (
              <line
                key={l.key}
                x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                className={`link link-${l.kind} ${l.group ? `g-${l.group}` : ''} ${l.featured ? 'featured' : ''} ${isLit(l) ? 'lit' : ''} ${off ? 'filtered' : ''}`}
              />
            );
          })}
        </svg>

        {allStars.map((star, i) => {
          const p = posOf(star);
          const g = groupOf(star);
          return (
            <Star
              key={star.id}
              star={star}
              index={i}
              position={p}
              featured={!!g?.featured}
              previewUp={p.y > 60}
              isActive={zoom.on && zoom.id === star.id}
              isDim={(hoveredId !== null && !focus.has(star.id)) || !matches(star)}
              onClick={handleStarClick}
              onHover={setHoveredId}
            />
          );
        })}
      </div>

      {!selectedStar && !showInfoPanel && !zoom.on && (
        <p className="hint">Click a star to explore · click Beth to know me ^^</p>
      )}

      {selectedStar && <ProjectModal project={selectedStar} onClose={closeModal} />}

      {showInfoPanel && (
        <InfoPanel
          section={activeSection}
          aboutMe={aboutMe}
          skills={skills}
          journey={journey}
          contact={contact}
          projects={projects}
          onClose={() => setShowInfoPanel(false)}
          onSectionChange={setActiveSection}
          onSkillSelect={(tag) => { setActiveTag(tag); setShowInfoPanel(false); }}
        />
      )}
    </div>
  );
};

export default StarMap;