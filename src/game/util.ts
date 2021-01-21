import { GameCoords, Vec3Array } from './types';

export const positionToCoords = (pos: Vec3Array): GameCoords => [pos[0], pos[1]];

export const coordsToPosition = ([x, y]: GameCoords, verticalOffset = 0.5): Vec3Array => [x, y, verticalOffset];

export const positionArgsFromCoords = (coords: GameCoords | undefined): { position?: Vec3Array } =>
  coords ? { position: coordsToPosition(coords) } : {};
