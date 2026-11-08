import * as THREE from 'three';
import {
  headingFromDirection,
  inputToWorld,
  stepPosition,
  turnToward,
  type Bounds,
  type Vec2,
} from './game/movement';
import { WORLD_SIZE } from './scene';

const TURN_RATE = 12; // radyan/sn
const HEIGHT = 1.8;
const RADIUS = 0.4;
const half = WORLD_SIZE / 2 - RADIUS;
const BOUNDS: Bounds = { minX: -half, maxX: half, minZ: -half, maxZ: half };

export interface Player {
  readonly mesh: THREE.Group;
  /** Oyuncunun dünya konumu (yalnızca okunur kullanın). */
  readonly position: THREE.Vector3;
  heading: number;
  update(input: Vec2, dt: number): void;
}

/** Kapsül karakter (placeholder) + yönü gösteren küçük "burun". */
export function createPlayer(scene: THREE.Scene): Player {
  const mesh = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(RADIUS, HEIGHT - RADIUS * 2, 4, 12),
    new THREE.MeshStandardMaterial({ color: 0x4fc3f7 }),
  );
  body.position.y = HEIGHT / 2;
  body.castShadow = true;

  const nose = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.45),
    new THREE.MeshStandardMaterial({ color: 0xffd54f }),
  );
  nose.position.set(0, HEIGHT * 0.7, RADIUS + 0.15);
  nose.castShadow = true;

  mesh.add(body, nose);
  scene.add(mesh);

  const player: Player = {
    mesh,
    position: mesh.position,
    heading: 0,
    update(input, dt) {
      const next = stepPosition({ x: mesh.position.x, z: mesh.position.z }, input, dt, BOUNDS);
      mesh.position.x = next.x;
      mesh.position.z = next.z;

      if (Math.hypot(input.x, input.y) > 0) {
        const target = headingFromDirection(inputToWorld(input));
        player.heading = turnToward(player.heading, target, TURN_RATE, dt);
        mesh.rotation.y = player.heading;
      }
    },
  };
  return player;
}
