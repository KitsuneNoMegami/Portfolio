import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import Star from '../Star/Star';
import Starfield from '../Starfield/Starfield';
import ProjectModal from '../ProjectModal/ProjectModal';
import InfoPanel from '../InfoPanel/InfoPanel';
import { projects, centralStar, connections, aboutMe, skills } from '../../data/projects.js';
import './StarMap.css';

const allStars = [centralStar, ...projects];

// Profondeur de chaque étoile (0.7 – 1.3), déterministe : les "proches" bougent plus et sont plus grosses
const depthOf = (s) => (s.type === 'central' ? 0.5 : 0.7 + ((s.id * 7) % 5) * 0.15);
const PARALLAX = 28; // px de décalage max pour depth = 1

// Liens "hub" (données) + liens entre projets partageant une techno (hors "Web", trop générique)
const tagLinks = [];
projects.forEach((a, i) =>
  projects.slice(i + 1).forEach((b) => {
    const shared = (a.tags || []).filter((t) => t !== 'Web' && b.tags?.includes(t));
    if (shared.length) tagLinks.push({ key: `t${a.id}-${b.id}`, from: a.id, to: b.id, kind: 'tag' });
  })
);
const links = [
  ...connections.map((c) => ({ key: `h${c.to}`, from: c.from, to: c.to, kind: 'hub', color: c.color })),
  ...tagLinks,
];

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const StarMap = () => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredId, setHoveredId] = useState(null);
  const [zoom, setZoom] = useState({ id: null, x: 50, y: 50, on: false });
  const [warpKey, setWarpKey] = useState(0);

  const containerRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const anchorRefs = useRef({});
  const lineRefs = useRef({});
  const timer = useRef(null);

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
    setShowInfoPanel(false);
    setZoom({ id: star.id, x: star.position.x, y: star.position.y, on: true });
    // on laisse la caméra "voler" vers l'étoile avant d'ouvrir la fiche
    timer.current = setTimeout(() => setSelectedStar(star), prefersReduced() ? 0 : 550);
  }, []);

  const closeModal = useCallback(() => {
    clearTimeout(timer.current);
    setSelectedStar(null);
    setZoom((z) => ({ ...z, on: false }));
  }, []);

  // Parallaxe : une seule boucle rAF déplace les étoiles ET recolle les lignes dessus
  useLayoutEffect(() => {
    const el = containerRef.current;
    let w = el.clientWidth;
    let h = el.clientHeight;
    let raf;
    const smooth = { x: 0, y: 0 };
    const reduced = prefersReduced();

    const ro = new ResizeObserver(() => {
      w = el.clientWidth;
      h = el.clientHeight;
    });
    ro.observe(el);

    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove);

    const tick = () => {
      smooth.x += (pointer.current.x - smooth.x) * 0.06;
      smooth.y += (pointer.current.y - smooth.y) * 0.06;
      el.style.setProperty('--mx', smooth.x.toFixed(3));
      el.style.setProperty('--my', smooth.y.toFixed(3));

      const pos = {};
      for (const s of allStars) {
        const d = depthOf(s);
        const x = (s.position.x / 100) * w + (reduced ? 0 : -smooth.x * PARALLAX * d);
        const y = (s.position.y / 100) * h + (reduced ? 0 : -smooth.y * PARALLAX * d);
        pos[s.id] = { x, y };
        const a = anchorRefs.current[s.id];
        if (a) a.style.transform = `translate(${x}px, ${y}px)`;
      }
      for (const l of links) {
        const ln = lineRefs.current[l.key];
        const a = pos[l.from];
        const b = pos[l.to];
        if (ln && a && b) {
          ln.setAttribute('x1', a.x);
          ln.setAttribute('y1', a.y);
          ln.setAttribute('x2', b.x);
          ln.setAttribute('y2', b.y);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (selectedStar || zoom.on) closeModal();
      else if (showInfoPanel) setShowInfoPanel(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedStar, zoom.on, showInfoPanel, closeModal]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Survol : on allume les liens de l'étoile et on estompe le reste
  const focus = new Set();
  if (hoveredId !== null) {
    focus.add(hoveredId);
    links.forEach((l) => {
      if (l.from === hoveredId || l.to === hoveredId) focus.add(l.from).add(l.to);
    });
  }
  const isLit = (l) => hoveredId !== null && (l.from === hoveredId || l.to === hoveredId);

  return (
    <div
      className={`star-map-container ${hoveredId !== null ? 'has-focus' : ''}`}
      ref={containerRef}
    >
      <Starfield pointerRef={pointer} warpKey={warpKey} />

      <header className="hud">
        <h1>{aboutMe.name}</h1>
        <p>Web Developer · Portfolio</p>
      </header>

      <div
        className={`constellation ${zoom.on ? 'zoomed' : ''}`}
        style={{ transformOrigin: `${zoom.x}% ${zoom.y}%` }}
      >
        <svg className="star-connections" width="100%" height="100%" aria-hidden="true">
          {links.map((l) => (
            <line
              key={l.key}
              ref={(el) => { lineRefs.current[l.key] = el; }}
              className={`link link-${l.kind} ${isLit(l) ? 'lit' : ''}`}
              style={l.color ? { stroke: l.color } : undefined}
            />
          ))}
        </svg>

        {allStars.map((star, i) => (
          <div
            key={star.id}
            className="star-anchor"
            ref={(el) => { anchorRefs.current[star.id] = el; }}
          >
            <Star
              star={star}
              depth={depthOf(star)}
              index={i}
              isActive={zoom.on && zoom.id === star.id}
              isDim={hoveredId !== null && !focus.has(star.id)}
              onClick={handleStarClick}
              onHover={setHoveredId}
            />
          </div>
        ))}
      </div>

      {!selectedStar && !showInfoPanel && !zoom.on && (
        <p className="hint">Click a star to explore · click Beth to know me</p>
      )}

      {selectedStar && <ProjectModal project={selectedStar} onClose={closeModal} />}

      {showInfoPanel && (
        <InfoPanel
          section={activeSection}
          aboutMe={aboutMe}
          skills={skills}
          onClose={() => setShowInfoPanel(false)}
          onSectionChange={setActiveSection}
        />
      )}
    </div>
  );
};

export default StarMap;