import * as THREE from 'three';

/** Oyun döngüsü: her karede `update(dt)` ve ardından `render()` çağırır. dt saniyedir. */
export function startLoop(
  renderer: THREE.WebGLRenderer,
  update: (dt: number) => void,
  render: () => void,
): void {
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    update(clock.getDelta());
    render();
  });
}
