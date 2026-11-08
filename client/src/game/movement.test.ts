import { describe, expect, it } from 'vitest';
import {
  MAX_DT,
  PLAYER_SPEED,
  applyDeadZone,
  clampLength,
  combineInputs,
  inputToWorld,
  normalizeAngle,
  stepPosition,
  turnToward,
} from './movement';

const BIG = { minX: -1000, maxX: 1000, minZ: -1000, maxZ: 1000 };
const ORIGIN = { x: 0, z: 0 };

describe('applyDeadZone', () => {
  it('ölü bölge içindeki girdiyi sıfırlar', () => {
    expect(applyDeadZone({ x: 0.05, y: 0.05 })).toEqual({ x: 0, y: 0 });
  });
  it('tam girdiyi 1 uzunlukta bırakır', () => {
    const v = applyDeadZone({ x: 1, y: 0 });
    expect(Math.hypot(v.x, v.y)).toBeCloseTo(1);
  });
});

describe('combineInputs', () => {
  it('çapraz girdi uzunluğunu 1e sınırlar', () => {
    const v = combineInputs({ x: 1, y: 0 }, { x: 0, y: 1 });
    expect(Math.hypot(v.x, v.y)).toBeCloseTo(1);
  });
});

describe('clampLength', () => {
  it('kısa vektörü değiştirmez', () => {
    expect(clampLength({ x: 0.3, y: 0.4 })).toEqual({ x: 0.3, y: 0.4 });
  });
});

describe('inputToWorld', () => {
  it('ekranda yukarı = dünyada kameradan uzağa (-x, -z)', () => {
    const w = inputToWorld({ x: 0, y: 1 });
    expect(w.x).toBeLessThan(0);
    expect(w.z).toBeLessThan(0);
    expect(w.x).toBeCloseTo(w.z);
  });
  it('ekranda sağ = dünyada (+x, -z)', () => {
    const w = inputToWorld({ x: 1, y: 0 });
    expect(w.x).toBeGreaterThan(0);
    expect(w.z).toBeLessThan(0);
  });
  it('uzunluğu korur', () => {
    const w = inputToWorld({ x: 0.6, y: 0.8 });
    expect(Math.hypot(w.x, w.z)).toBeCloseTo(1);
  });
});

describe('stepPosition', () => {
  it('çapraz ve düz hareket aynı hızda gider', () => {
    const straight = stepPosition(ORIGIN, { x: 0, y: 1 }, 0.1, BIG);
    const diagonal = stepPosition(ORIGIN, combineInputs({ x: 1, y: 0 }, { x: 0, y: 1 }), 0.1, BIG);
    expect(Math.hypot(straight.x, straight.z)).toBeCloseTo(Math.hypot(diagonal.x, diagonal.z));
  });
  it('kare hızından bağımsızdır (1 sn toplam mesafe aynı)', () => {
    let a = ORIGIN;
    for (let i = 0; i < 60; i++) a = stepPosition(a, { x: 0, y: 1 }, 1 / 60, BIG);
    let b = ORIGIN;
    for (let i = 0; i < 10; i++) b = stepPosition(b, { x: 0, y: 1 }, 1 / 10, BIG);
    expect(Math.hypot(a.x, a.z)).toBeCloseTo(PLAYER_SPEED, 1);
    expect(Math.hypot(b.x, b.z)).toBeCloseTo(PLAYER_SPEED, 1);
  });
  it('çok büyük dt MAX_DT ile sınırlanır', () => {
    const p = stepPosition(ORIGIN, { x: 0, y: 1 }, 5, BIG);
    expect(Math.hypot(p.x, p.z)).toBeCloseTo(PLAYER_SPEED * MAX_DT);
  });
  it('girdi yokken yerinde durur', () => {
    expect(stepPosition({ x: 3, z: 4 }, { x: 0, y: 0 }, 0.1, BIG)).toEqual({ x: 3, z: 4 });
  });
  it('zemin sınırında durur', () => {
    const bounds = { minX: -1, maxX: 1, minZ: -1, maxZ: 1 };
    let p = ORIGIN;
    for (let i = 0; i < 200; i++) p = stepPosition(p, { x: 0, y: 1 }, 0.1, bounds);
    expect(p.x).toBeGreaterThanOrEqual(-1);
    expect(p.z).toBeGreaterThanOrEqual(-1);
  });
});

describe('turnToward / normalizeAngle', () => {
  it('açıyı [-PI, PI] aralığına getirir', () => {
    for (const a of [3 * Math.PI, -3 * Math.PI, 7.5, -7.5, 0.3]) {
      const n = normalizeAngle(a);
      expect(Math.abs(n)).toBeLessThanOrEqual(Math.PI + 1e-9);
      // Aynı yöne bakmalı (sin/cos eşit)
      expect(Math.cos(n)).toBeCloseTo(Math.cos(a), 9);
      expect(Math.sin(n)).toBeCloseTo(Math.sin(a), 9);
    }
  });
  it('en kısa yoldan döner', () => {
    const next = turnToward(Math.PI - 0.1, -Math.PI + 0.1, 1, 0.05);
    expect(next).toBeGreaterThan(Math.PI - 0.1); // saat yönü tersine geçiş yok, kısa yoldan
  });
  it('hedefe ulaşınca fazla dönmez', () => {
    expect(turnToward(0, 0.01, 100, 0.1)).toBeCloseTo(0.01);
  });
});
