export type ResourceType = 'people' | 'food' | 'water' | 'wood';

export type ActivityType = 'gather_lumber' | 'defend' | 'gather_food' | 'hunt' | 'collect_water' | 'scout';

export type ResourceMap = { [K in ResourceType]: number };

export type ActivityAllocations = { [K in ActivityType]: number };

export type ResourceNode = {
  type: ResourceType;
  amount: number;
};

export type Exploration = {
  discoveredResources: ResourceNode[];
};

export type Resources = {
  stored: ResourceMap;
  storageContainers: ResourceMap;
};

export type Progress = {
  day: number;
  messages: string[];
  failed: boolean;
};

export interface GameState {
  exploration: Exploration;
  resources: Resources;
  activityAllocations: ActivityAllocations;
  progress: Progress;
}

export type SetAllocationPayload = {
  activity: ActivityType;
  amount: number;
};

export type GameEvent = {
  message: string;
  resourceDeltas: ResourceMap;
};

export type GameCoords = [number, number];
