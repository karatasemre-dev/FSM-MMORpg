/**
 * Hareket hesapları. Three.js veya DOM'a bağımlı DEĞİL: saf fonksiyonlar.
 * Böylece test edilebilir ve ileride sunucuya taşınabilir.
 *
 * Dünya ekseni: x = sağ, z = ekrana doğru (kameraya yakın). Girdi vektörü ekran
 * yönündedir: x = sağ, y = yukarı.
 */

export interface Vec2 {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export const PLAYER_SPEED = 5; // birim/sn
export const MAX_DT = 0.1; // sn; sekme arka plandan dönünce zıplamayı önler
export const DEAD_ZONE = 0.1;

const SQRT1_2 = Math.SQRT1_2;

/** Vektörün uzunluğunu en fazla 1'e sınırlar. */
export function clampLength(v: Vec2, max = 1): Vec2 {
  const len = Math.hypot(v.x, v.y);
  if (len <= max || len === 0) return { x: v.x, y: v.y };
  return { x: (v.x / len) * max, y: (v.y / len) * max };
}

/** Ölü bölgeyi uygular; kalan aralığı 0..1'e yeniden ölçekler. */
export function applyDeadZone(v: Vec2, deadZone = DEAD_ZONE): Vec2 {
  const len = Math.hypot(v.x, v.y);
  if (len <= deadZone) return { x: 0, y: 0 };
  const scaled = Math.min((len - deadZone) / (1 - deadZone), 1);
  return { x: (v.x / len) * scaled, y: (v.y / len) * scaled };
}

/** Birden çok girdi kaynağını toplar ve uzunluğu 1'e sınırlar (çapraz hızlanma olmaz). */
export function combineInputs(...inputs: Vec2[]): Vec2 {
  const sum = inputs.reduce((acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y }), { x: 0, y: 0 });
  return clampLength(sum);
}

/**
 * Ekran yönündeki girdiyi (yukarı = ekranda yukarı) dünya yönüne çevirir.
 * Kamera (+1,+1,+1) tarafından baktığı için ekran-yukarı = dünyada (-x, -z).
 */
export function inputToWorld(v: Vec2): { x: number; z: number } {
  return {
    x: (v.x - v.y) * SQRT1_2,
    z: (-v.x - v.y) * SQRT1_2,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Konumu bir kare ilerletir. `dt` saniyedir, MAX_DT ile sınırlanır. */
export function stepPosition(
  pos: { x: number; z: number },
  input: Vec2,
  dt: number,
  bounds: Bounds,
  speed = PLAYER_SPEED,
): { x: number; z: number } {
  const safeDt = clamp(dt, 0, MAX_DT);
  const dir = inputToWorld(clampLength(input));
  return {
    x: clamp(pos.x + dir.x * speed * safeDt, bounds.minX, bounds.maxX),
    z: clamp(pos.z + dir.z * speed * safeDt, bounds.minZ, bounds.maxZ),
  };
}

/** Açıyı [-PI, PI] aralığına getirir. */
export function normalizeAngle(angle: number): number {
  const twoPi = Math.PI * 2;
  return ((((angle + Math.PI) % twoPi) + twoPi) % twoPi) - Math.PI;
}

/** `current` açısını en kısa yoldan `target` açısına, saniyede `rate` radyanla çevirir. */
export function turnToward(current: number, target: number, rate: number, dt: number): number {
  const diff = normalizeAngle(target - current);
  const maxStep = rate * clamp(dt, 0, MAX_DT);
  if (Math.abs(diff) <= maxStep) return normalizeAngle(target);
  return normalizeAngle(current + Math.sign(diff) * maxStep);
}

/** Hareket yönünden bakış açısı (Y ekseni etrafında dönüş). */
export function headingFromDirection(dir: { x: number; z: number }): number {
  return Math.atan2(dir.x, dir.z);
}
