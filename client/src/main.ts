import * as THREE from 'three';
import { createIsoCamera } from './camera';
import { createInput } from './input';
import { startLoop } from './loop';
import { createPlayer } from './player';
import { createScene } from './scene';

// Faz 1: yerel oyuncu hareketi (sunucu yok). Joystick/WASD ile karakteri gezdir.
const container = document.getElementById('app');
if (!container) throw new Error('#app bulunamadı');

const { renderer, scene, sun } = createScene(container);
const iso = createIsoCamera();
const player = createPlayer(scene);
const input = createInput(container);
const SUN_OFFSET = new THREE.Vector3(5, 10, 3);

function resize(): void {
  const width = container!.clientWidth;
  const height = container!.clientHeight;
  iso.resize(width, height);
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
resize();
iso.snapTo(player.position);

startLoop(
  renderer,
  (dt) => {
    player.update(input.getVector(), dt);
    iso.follow(player.position, dt);
    // Gölge kamerası oyuncuyla birlikte kayar.
    sun.position.copy(player.position).add(SUN_OFFSET);
    sun.target.position.copy(player.position);
  },
  () => renderer.render(scene, iso.camera),
);

// Yalnızca geliştirme modunda: otomatik testler için.
if (import.meta.env.DEV) {
  (window as unknown as { __fsm: unknown }).__fsm = { player };
}
