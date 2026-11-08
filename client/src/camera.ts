import * as THREE from 'three';

const VIEW_SIZE = 6; // kısa kenarda görünen yarım yükseklik (birim)
const OFFSET = new THREE.Vector3(10, 10, 10); // izometrik bakış yönü
const FOLLOW_SPEED = 8; // yüksek = daha sıkı takip

export interface IsoCamera {
  camera: THREE.OrthographicCamera;
  /** Kamera odağını hedefe doğru yumuşakça kaydırır. */
  follow(target: THREE.Vector3, dt: number): void;
  /** Odağı anında hedefe taşır (başlangıç için). */
  snapTo(target: THREE.Vector3): void;
  resize(width: number, height: number): void;
}

export function createIsoCamera(): IsoCamera {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
  const focus = new THREE.Vector3();

  function apply(): void {
    camera.position.copy(focus).add(OFFSET);
    camera.lookAt(focus);
  }
  apply();

  return {
    camera,
    follow(target, dt) {
      // Kare hızından bağımsız yumuşatma.
      const t = 1 - Math.exp(-FOLLOW_SPEED * Math.min(dt, 0.1));
      focus.lerp(target, t);
      apply();
    },
    snapTo(target) {
      focus.copy(target);
      apply();
    },
    resize(width, height) {
      const aspect = width / height;
      // Kısa kenar her zaman VIEW_SIZE kadar görünsün (dikey/yatay fark etmez).
      const halfW = aspect >= 1 ? VIEW_SIZE * aspect : VIEW_SIZE;
      const halfH = aspect >= 1 ? VIEW_SIZE : VIEW_SIZE / aspect;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    },
  };
}
