import { clampLength, type Vec2 } from '../game/movement';

const KEY_MAP: Record<string, Vec2> = {
  KeyW: { x: 0, y: 1 },
  ArrowUp: { x: 0, y: 1 },
  KeyS: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: -1 },
  KeyA: { x: -1, y: 0 },
  ArrowLeft: { x: -1, y: 0 },
  KeyD: { x: 1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

/** WASD / ok tuşları. Girdi vektörü: x = sağ, y = yukarı. */
export function createKeyboardInput(): { getVector(): Vec2 } {
  const pressed = new Set<string>();

  window.addEventListener('keydown', (e) => {
    if (e.code in KEY_MAP) {
      pressed.add(e.code);
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', (e) => pressed.delete(e.code));
  // Sekme/pencere odağı kaybolunca takılı tuş kalmasın.
  window.addEventListener('blur', () => pressed.clear());

  return {
    getVector(): Vec2 {
      let x = 0;
      let y = 0;
      for (const code of pressed) {
        x += KEY_MAP[code].x;
        y += KEY_MAP[code].y;
      }
      return clampLength({ x, y });
    },
  };
}
