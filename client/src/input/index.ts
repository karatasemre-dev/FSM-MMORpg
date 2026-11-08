import { combineInputs, type Vec2 } from '../game/movement';
import { createJoystick } from './joystick';
import { createKeyboardInput } from './keyboard';

/** Tüm girdi kaynaklarını (joystick + klavye) tek bir hareket vektöründe birleştirir. */
export function createInput(container: HTMLElement): { getVector(): Vec2 } {
  const joystick = createJoystick(container);
  const keyboard = createKeyboardInput();
  return {
    getVector: () => combineInputs(joystick.getVector(), keyboard.getVector()),
  };
}
