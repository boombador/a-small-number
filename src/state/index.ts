import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResourceType = 'people' | 'food' | 'water' | 'wood';

type ResourceNode = {
  type: ResourceType;
  amount: number;
};

type Exploration = {
  discoveredResources: ResourceNode[];
};

type Resources = {
  stored: { [K in ResourceType]: number };
  storageContainers: { [K in ResourceType]: number };
};

type Activity = 'gather_lumber' | 'defend' | 'gather_food' | 'hunt' | 'collect_water' | 'scout';

type ActivityAllocations = {
  [K in Activity]: number;
};

type Progress = {
  day: number;
  messages: string[];
};

export interface GameState {
  exploration: Exploration;
  resources: Resources;
  activityAllocations: ActivityAllocations;
  progress: Progress;
}

const initialState: GameState = {
  exploration: {
    discoveredResources: [],
  },
  resources: {
    stored: {
      people: 0,
      food: 0,
      water: 0,
      wood: 0,
    },
    storageContainers: {
      people: 0,
      food: 0,
      water: 0,
      wood: 0,
    },
  },
  activityAllocations: {
    gather_lumber: 0,
    defend: 0,
    gather_food: 0,
    hunt: 0,
    collect_water: 0,
    scout: 0,
  },
  progress: {
    day: 1,
    messages: [],
  },
};

type SetResourcePayload = {
  resource: ResourceType;
  amount: number;
};

type SetAllocationPayload = {
  activity: Activity;
  amount: number;
};

type GameEvent = {
  message: string;
  resourceDeltas: { [K in ResourceType]: number };
};

const emptyResources = {
  people: 0,
  food: 0,
  water: 0,
  wood: 0,
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
  const wood = 0;
  return {
    message: `Retrieved lumber, stored ${wood} units`,
    resourceDeltas: { ...emptyResources, wood },
  };
};

// const scoutEvent = (gameState: GameState): GameEvent => {};
// const defendEvent = (gameState: GameState): GameEvent => {};

const calculateDaysEvents = (gameState: GameState): GameEvent[] => {
  const result = [];

  result.push(waterEvent(gameState));
  result.push(forageEvent(gameState));
  result.push(huntEvent(gameState));
  result.push(lumberEvent(gameState));
  // result.push(scoutEvent(gameState));
  // result.push(defendEvent(gameState));

  return result;
};

const updatedResources = (
  resources: Resources,
  resourceDeltasList: { [K in ResourceType]: number }[],
): { [K in ResourceType]: number } => {
  // TODO: process deltas to get updated resource counts for next day
  // TODO: factor in storage containers and discard excess resources
  return resources.stored;
};

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    incrementAllocation: (state, { payload }: PayloadAction<SetAllocationPayload>) => {
      state.activityAllocations[payload.activity] += payload.amount;
    },
    decrementAllocation: (state, { payload }: PayloadAction<SetAllocationPayload>) => {
      state.activityAllocations[payload.activity] -= payload.amount;
    },

    advanceDay: (state) => {
      const daysEvents = calculateDaysEvents(state);

      state.progress.messages = daysEvents.map((x) => x.message);
      state.resources.stored = updatedResources(
        state.resources,
        daysEvents.map((x) => x.resourceDeltas),
      );
      state.progress.day++;

      // reset state for start of day
      state.activityAllocations = {
        gather_lumber: 0,
        defend: 0,
        gather_food: 0,
        hunt: 0,
        collect_water: 0,
        scout: 0,
      };
    },
  },
});

export const { incrementAllocation, decrementAllocation, advanceDay } = gameStateSlice.actions;

export default gameStateSlice.reducer;

export const gameStateSelector = (state: { gameState: GameState }): GameState => state.gameState;
