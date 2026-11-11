import { useEffect, useRef } from 'react';

// Fond d'espace en canvas : chaque étoile a une profondeur z (0.08 = proche, 1 = lointaine).
// La projection x/z crée une vraie perspective : parallaxe souris, dérive lente vers l'avant,
// "warp" quand on clique une étoile, étoiles filantes occasionnelles.
const COLORS = ['255,255,255', '200,225,255', '109,213,250', '255,236,139', '255,154,158'];
// INTERRUPTEUR : true = le fond suit le curseur (parallaxe), false = fond fixe
const CURSOR_PARALLAX = true;
// Décalage maximal de la caméra, en unités du monde (pas en pixels).
// En pixels à l'écran : amp * focal / z -> grand pour les étoiles proches (z petit).
const AMP = 0.03;

const rand = (a, b) => a + Math.random() * (b - a);

const Starfield = ({ warpKey = 0 }) => {
  const canvasRef = useRef(null);
  const warpRef = useRef(0);

  useEffect(() => {
    if (warpKey) warpRef.current = 1;
  }, [warpKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, focal = 1, raf, last = performance.now();
    let stars = [];
    let shooting = null;
    let nextShoot = rand(3000, 7000);
    const cam = { x: 0, y: 0 };            // position lissée de la caméra
    const pointer = { x: 0, y: 0 };         // curseur normalisé, de -1 à 1
    const root = canvas.parentElement;      // .starfield : porte --mx/--my pour les nébuleuses

    // 1) Lecture de la souris : (clientX / largeur - 0.5) * 2  ->  -1 (gauche) .. 1 (droite)
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (CURSOR_PARALLAX && !reduced) window.addEventListener('pointermove', onMove);

    // x/y sont choisis pour que la projection soit uniforme sur l'écran, quel que soit z
    const makeStar = (z) => {
      const zz = z ?? rand(0.1, 1);
      return {
        z: zz,
        x: rand(-0.62, 0.62) * (w / focal) * zz * 1.2,
        y: rand(-0.62, 0.62) * (h / focal) * zz * 1.2,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        p: rand(0, 6.28),
        f: rand(0.6, 2.4),
        s: rand(0.6, 1.5),
      };
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      focal = Math.max(w, h) * 0.5;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(1000, Math.floor((w * h) / 2600));
      stars = Array.from({ length: count }, () => makeStar());
    };
    resize();
    window.addEventListener('resize', resize);

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // 2) Lissage : la caméra rattrape le curseur avec un léger retard (dt * 3 ~ 1/3 s)
      const ease = Math.min(1, dt * 3);
      cam.x += (pointer.x * AMP - cam.x) * ease;
      cam.y += (pointer.y * AMP - cam.y) * ease;
      // 3) Mêmes valeurs (-1..1) pour les nébuleuses CSS
      root.style.setProperty('--mx', (cam.x / AMP).toFixed(3));
      root.style.setProperty('--my', (cam.y / AMP).toFixed(3));

      warpRef.current = Math.max(0, warpRef.current - dt * 1.4);
      const warp = warpRef.current;
      const speed = reduced ? 0 : 0.008 + warp * warp * 1.2; // unités de z par seconde

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.z -= speed * dt;
        if (s.z < 0.08) Object.assign(s, makeStar(1));

        const k = focal / s.z;
        const sx = w / 2 + (s.x - cam.x) * k;
        const sy = h / 2 + (s.y - cam.y) * k;
        if (sx < -30 || sx > w + 30 || sy < -30 || sy > h + 30) continue;

        const fade = Math.min(1, (1 - s.z) * 12, (s.z - 0.08) / 0.07);
        const twinkle = reduced ? 1 : 0.78 + 0.22 * Math.sin((now / 1000) * s.f + s.p);
        const a = (0.25 + 0.75 * (1 - s.z)) * twinkle * fade;
        const r = Math.min(2.8, (s.s * 0.45) / Math.pow(s.z, 0.7));

        if (warp > 0.05) {
          const z2 = Math.min(1.3, s.z + warp * 0.25);
          const k2 = focal / z2;
          ctx.strokeStyle = `rgba(${s.c},${a})`;
          ctx.lineWidth = Math.max(0.6, r);
          ctx.beginPath();
          ctx.moveTo(w / 2 + (s.x - cam.x) * k2, h / 2 + (s.y - cam.y) * k2);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          if (r > 1.5) {
            ctx.fillStyle = `rgba(${s.c},${a * 0.15})`;
            ctx.beginPath();
            ctx.arc(sx, sy, r * 3, 0, 6.2832);
            ctx.fill();
          }
          ctx.fillStyle = `rgba(${s.c},${a})`;
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, 6.2832);
          ctx.fill();
        }
      }

      // étoile filante
      if (!reduced) {
        nextShoot -= dt * 1000;
        if (!shooting && nextShoot <= 0) {
          const ang = rand(0.35, 0.7);
          const sp = rand(700, 1100);
          shooting = { x: rand(w * 0.3, w), y: rand(0, h * 0.4), vx: -Math.cos(ang) * sp, vy: Math.sin(ang) * sp, t: 0 };
          nextShoot = rand(5000, 11000);
        }
        if (shooting) {
          const m = shooting;
          m.t += dt;
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          const life = m.t / 0.9;
          if (life >= 1) {
            shooting = null;
          } else {
            const tail = 0.12;
            const tx = m.x - m.vx * tail;
            const ty = m.y - m.vy * tail;
            const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
            g.addColorStop(0, `rgba(255,255,255,${Math.sin(life * Math.PI)})`);
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(tx, ty);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      <div className="nebula nebula-far" />
      <div className="nebula nebula-near" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Starfield;