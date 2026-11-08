import * as THREE from 'three';
import { GAME_ROOM_NAME } from '@fsm/shared';

// Faz 0: kurulumun çalıştığını kanıtlayan boş sahne + dönen küp.
const container = document.getElementById('app');
if (!container) throw new Error('#app bulunamadı');

const renderer = new THREE.WebGLRenderer({ antialias: true });
// iPad'de pil ve performans için piksel oranını sınırla.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101820);

// İzometrik görünüm: ortografik kamera, köşegen bakış açısı.
const VIEW_SIZE = 6;
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(5, 10, 3);
scene.add(sun);

const grid = new THREE.GridHelper(20, 20, 0x335566, 0x223344);
grid.position.y = -1;
scene.add(grid);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: 0x4fc3f7 }),
);
scene.add(cube);

function resize(): void {
  const width = container!.clientWidth;
  const height = container!.clientHeight;
  const aspect = width / height;
  // Kısa kenar her zaman VIEW_SIZE kadar görünsün (dikey/yatay fark etmez).
  const halfW = aspect >= 1 ? VIEW_SIZE * aspect : VIEW_SIZE;
  const halfH = aspect >= 1 ? VIEW_SIZE : VIEW_SIZE / aspect;
  camera.left = -halfW;
  camera.right = halfW;
  camera.top = halfH;
  camera.bottom = -halfH;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
resize();

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  cube.rotation.x += dt * 0.6;
  cube.rotation.y += dt * 0.9;
  renderer.render(scene, camera);
});

console.info(`FSM MMORPG istemci hazır. Oda adı (shared): ${GAME_ROOM_NAME}`);
