import * as THREE from 'three';

export const WORLD_SIZE = 100; // zemin kenar uzunluğu (birim)

export interface GameScene {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  sun: THREE.DirectionalLight;
}

/** Renderer, sahne, ışık ve zemini kurar. */
export function createScene(container: HTMLElement): GameScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  // iPad'de pil ve performans için piksel oranını sınırla.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101820);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  const shadowRange = 14;
  Object.assign(sun.shadow.camera, {
    left: -shadowRange,
    right: shadowRange,
    top: shadowRange,
    bottom: -shadowRange,
    near: 1,
    far: 60,
  });
  scene.add(sun, sun.target);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE),
    new THREE.MeshStandardMaterial({ color: 0x1b2a38 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(WORLD_SIZE, WORLD_SIZE, 0x335566, 0x223344);
  grid.position.y = 0.01; // zeminle çakışıp titremesin
  scene.add(grid);

  return { renderer, scene, sun };
}
