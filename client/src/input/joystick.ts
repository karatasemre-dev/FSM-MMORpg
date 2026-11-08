import { applyDeadZone, clampLength, type Vec2 } from '../game/movement';

const MAX_RADIUS = 64; // px; başparmak tabandan en fazla bu kadar uzaklaşır
const BASE_SIZE = MAX_RADIUS * 2; // px (>= 96, parmak boyutuna uygun)
const KNOB_SIZE = 56; // px

/**
 * Yüzen sanal joystick. Ekranın sol yarısına dokunulan yerde belirir.
 * Yalnızca joystick'i başlatan parmağı (pointerId) izler; diğer parmaklar yok sayılır.
 */
export function createJoystick(container: HTMLElement): { getVector(): Vec2 } {
  const zone = document.createElement('div');
  Object.assign(zone.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '50%',
    height: '100%',
    touchAction: 'none',
    zIndex: '10',
  });

  const base = document.createElement('div');
  Object.assign(base.style, {
    position: 'fixed',
    width: `${BASE_SIZE}px`,
    height: `${BASE_SIZE}px`,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
    border: '2px solid rgba(255,255,255,0.35)',
    display: 'none',
    pointerEvents: 'none',
    zIndex: '11',
  });

  const knob = document.createElement('div');
  Object.assign(knob.style, {
    position: 'absolute',
    width: `${KNOB_SIZE}px`,
    height: `${KNOB_SIZE}px`,
    left: `${(BASE_SIZE - KNOB_SIZE) / 2 - 2}px`,
    top: `${(BASE_SIZE - KNOB_SIZE) / 2 - 2}px`,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.55)',
  });
  base.appendChild(knob);
  container.append(zone, base);

  let activeId: number | null = null;
  let originX = 0;
  let originY = 0;
  let vector: Vec2 = { x: 0, y: 0 };

  function reset(): void {
    activeId = null;
    vector = { x: 0, y: 0 };
    base.style.display = 'none';
    knob.style.transform = 'translate(0px, 0px)';
  }

  zone.addEventListener('pointerdown', (e) => {
    if (activeId !== null) return; // zaten bir parmak joystick'te
    e.preventDefault();
    activeId = e.pointerId;
    zone.setPointerCapture(e.pointerId);
    originX = e.clientX;
    originY = e.clientY;
    base.style.left = `${originX - BASE_SIZE / 2}px`;
    base.style.top = `${originY - BASE_SIZE / 2}px`;
    base.style.display = 'block';
  });

  zone.addEventListener('pointermove', (e) => {
    if (e.pointerId !== activeId) return;
    e.preventDefault();
    const dx = e.clientX - originX;
    const dy = e.clientY - originY;
    // Ekran Y aşağı büyür; girdi vektöründe yukarı = +y.
    const raw = clampLength({ x: dx / MAX_RADIUS, y: -dy / MAX_RADIUS });
    knob.style.transform = `translate(${raw.x * MAX_RADIUS}px, ${-raw.y * MAX_RADIUS}px)`;
    vector = applyDeadZone(raw);
  });

  const end = (e: PointerEvent): void => {
    if (e.pointerId === activeId) reset();
  };
  zone.addEventListener('pointerup', end);
  zone.addEventListener('pointercancel', end);
  zone.addEventListener('lostpointercapture', end);
  window.addEventListener('blur', reset);

  return {
    getVector: () => vector,
  };
}
