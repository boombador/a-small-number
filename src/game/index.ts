export type ResourceType = 'people' | 'food' | 'water' | 'wood';

export type Activity = 'gather_lumber' | 'defend' | 'gather_food' | 'hunt' | 'collect_water' | 'scout';

export type ResourceMap = { [K in ResourceType]: number };

export type ResourceNode = {
  type: ResourceType;
  amount: number;
};

export type Exploration = {
  discoveredResources: ResourceNode[];
};

type Resources = {
  stored: { [K in ResourceType]: number };
  storageContainers: { [K in ResourceType]: number };
};

export type ActivityAllocations = {
  [K in Activity]: number;
};

export type Progress = {
  day: number;
  messages: string[];
};

export interface GameState {
  exploration: Exploration;
  resources: Resources;
  activityAllocations: ActivityAllocations;
  progress: Progress;
}

export type SetAllocationPayload = {
  activity: Activity;
  amount: number;
};

type GameEvent = {
  message: string;
  resourceDeltas: { [K in ResourceType]: number };
};

export const emptyResources = {
  people: 0,
  food: 0,
  water: 0,
  wood: 0,
};

export const emptyActivities = {
  gather_lumber: 0,
  defend: 0,
  gather_food: 0,
  hunt: 0,
  collect_water: 0,
  scout: 0,
};

const waterEvent = (gameState: GameState): GameEvent => {
  const luck = Math.random();
  const people = gameState.activityAllocations.collect_water;
  const water = (3 + luck) * people;
  return {
    message: `Retrieved water, stored ${water} units`,
    resourceDeltas: { ...emptyResources, water },
  };
};

const forageEvent = (gameState: GameState): GameEvent => {
  const successProbability = 0.9;
  const luck = Math.random();
  const people = gameState.activityAllocations.gather_food;
  const failed = luck > successProbability;
  if (failed) {
    return {
      message: 'No food was found, hopefully we need less than we thought',
      resourceDeltas: { ...emptyResources },
    };
  }
  const food = (1.5 + luck) * people;
  return {
    message: `Gathered some berries, stored ${food} units`,
    resourceDeltas: { ...emptyResources, food },
  };
};

const huntEvent = (gameState: GameState): GameEvent => {
  const luck = Math.random();
  const people = gameState.activityAllocations.hunt;
  const successProbability = 0.4;
  const failed = people <= 0 || luck > successProbability;
  if (failed) {
    return {
      message: 'The hunt failed',
      resourceDeltas: { ...emptyResources },
    };
  }
  const food = (10 + luck * 10) * people;
  return {
    message: `Caught some meat, stored ${food} units`,
    resourceDeltas: { ...emptyResources, food },
  };
};

const lumberEvent = (gameState: GameState): GameEvent => {
  const luck = Math.random();
  const people = gameState.activityAllocations.gather_lumber;
  const wood = (2 + luck * 2) * people;
  return {
    message: `Retrieved lumber, stored ${wood} units`,
    resourceDeltas: { ...emptyResources, wood },
  };
};

// const scoutEvent = (gameState: GameState): GameEvent => {};
// const defendEvent = (gameState: GameState): GameEvent => {};

export const calculateDaysEvents = (gameState: GameState): GameEvent[] => {
  const result = [];

  result.push(waterEvent(gameState));
  result.push(forageEvent(gameState));
  result.push(huntEvent(gameState));
  result.push(lumberEvent(gameState));
  // result.push(scoutEvent(gameState));
  // result.push(defendEvent(gameState));

  return result;
};

const applyDelta = (deltas: ResourceMap, mapToUpdate: ResourceMap): ResourceMap => {
  return Object.entries(deltas).reduce(
    (partialUpdate, [key, value]) => ({ ...partialUpdate, [key]: partialUpdate[key as ResourceType] + value }),
    mapToUpdate,
  );
};

// const result = applyDelta({ ...emptyResources, food: 5 }, { ...emptyResources });
// console.log(`Test, Should return a 5: ${result.food}`);

export const updatedResources = (resources: Resources, resourceDeltasList: ResourceMap[]): ResourceMap => {
  // TODO: factor in storage containers and discard excess resources
  return resourceDeltasList.reduce((partialResult, deltas) => applyDelta(deltas, partialResult), resources.stored);
};
