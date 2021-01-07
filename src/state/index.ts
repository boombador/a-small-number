import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResourceType = 'people' | 'food' | 'water' | 'wood';

type ResourceNode = {
  type: ResourceType;
  amount: number;
};

type Resources = {
  [K in ResourceType]: number;
};

type Activity = 'gather_lumber' | 'defend' | 'gather_food' | 'hunt' | 'collect_water' | 'scout';

type Allocations = {
  [K in Activity]: number;
};

type Projects = {
  available: string[];
  active: string[];
  completed: string[];
  locked: string[];
};

type Progress = {
  day: number;
};

export interface GameState {
  resourceNodes: ResourceNode[];
  resources: Resources;
  allocations: Allocations;
  projects: Projects;
  progress: Progress;
}

const initialState: GameState = {
  resourceNodes: [],
  resources: {
    people: 0,
    food: 0,
    water: 0,
    wood: 0,
  },
  allocations: {
    gather_lumber: 0,
    defend: 0,
    gather_food: 0,
    hunt: 0,
    collect_water: 0,
    scout: 0,
  },
  projects: {
    available: [],
    active: [],
    completed: [],
    locked: [],
  },
  progress: {
    day: 1,
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

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    incrementResourceAmount: (state, { payload }: PayloadAction<SetResourcePayload>) => {
      state.resources[payload.resource] += payload.amount;
    },
    decrementResourceAmount: (state, { payload }: PayloadAction<SetResourcePayload>) => {
      state.resources[payload.resource] -= payload.amount;
    },

    incrementAllocation: (state, { payload }: PayloadAction<SetAllocationPayload>) => {
      state.allocations[payload.activity] += payload.amount;
    },
    decrementAllocation: (state, { payload }: PayloadAction<SetAllocationPayload>) => {
      state.allocations[payload.activity] -= payload.amount;
    },

    advanceDay: (state) => {
      state.progress.day++;
    },
  },
});

export const {
  incrementResourceAmount,
  decrementResourceAmount,
  incrementAllocation,
  decrementAllocation,
  advanceDay,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;

export const gameStateSelector = (state: { gameState: GameState }): GameState => state.gameState;
