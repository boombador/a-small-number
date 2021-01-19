import { GameCoords, Vec3Array } from './types';

export const coordsToPosition = ([x, y]: GameCoords): Vec3Array => {
  return [x, y, 0.5];
};

export const positionArgsFromCoords = (coords: GameCoords | undefined) =>
  coords ? { position: coordsToPosition(coords) } : {};

// unused so far
export const positionToCoords = (pos: Vec3Array): GameCoords => {
  return [pos[0], pos[1]];
};
