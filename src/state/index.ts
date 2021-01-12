import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateDaysEvents, updatedResources, GameState, SetAllocationPayload } from '../game';

const initialState: GameState = {
  exploration: {
    discoveredResources: [],
  },
  resources: {
    stored: {
      people: 50,
      food: Math.round(Math.random() * 100),
      water: Math.round(Math.random() * 100),
      wood: Math.round(Math.random() * 40),
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
    failed: false,
  },
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
      const { food, water } = state.resources.stored;
      state.progress.failed = food < 0 || water < 0;

      // TODO: validate allocations and replace with corrected versions
      // - resource nodes may run out
      // - people count may change
      // - projects may complete
      //state.activityAllocations = validatedAllocations(state);
    },
  },
});

export const { incrementAllocation, decrementAllocation, advanceDay } = gameStateSlice.actions;

export default gameStateSlice.reducer;

export const gameStateSelector = (state: { gameState: GameState }): GameState => state.gameState;
