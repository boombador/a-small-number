import { GameState, GameEvent, ActivityType } from './types';
import { emptyResources } from './constants';

const peopleAllocated = (activity: ActivityType, gameState: GameState): number =>
  gameState.activityAllocations[activity];

const noPeopleAllocated = (activity: ActivityType, gameState: GameState): boolean =>
  peopleAllocated(activity, gameState) <= 0;

const determineWaterEvents = (gameState: GameState): GameEvent[] => {
  if (noPeopleAllocated('collect_water', gameState)) {
    return [];
  }

  const luck = Math.random();
  const people = gameState.activityAllocations.collect_water;
  const water = Math.round((3 + luck) * people);
  return [
    {
      message: `Retrieved water, stored ${water} units`,
      resourceDeltas: { ...emptyResources, water },
    },
  ];
};

const determineForageEvents = (gameState: GameState): GameEvent[] => {
  if (noPeopleAllocated('gather_food', gameState)) {
    return [];
  }

  const successProbability = 0.9;
  const luck = Math.random();
  const people = gameState.activityAllocations.gather_food;
  const failed = luck > successProbability;
  if (failed) {
    return [
      {
        message: 'No food was found, hopefully we need less than we thought',
        resourceDeltas: { ...emptyResources },
      },
    ];
  }
  const food = Math.round((1.5 + luck) * people);
  return [
    {
      message: `Gathered some berries, stored ${food} units`,
      resourceDeltas: { ...emptyResources, food },
    },
  ];
};

const determineHuntEvents = (gameState: GameState): GameEvent[] => {
  if (noPeopleAllocated('hunt', gameState)) {
    return [];
  }

  const luck = Math.random();
  const people = gameState.activityAllocations.hunt;
  const successProbability = 0.4;
  const failed = luck > successProbability;
  if (failed) {
    return [
      {
        message: 'The hunt failed',
        resourceDeltas: { ...emptyResources },
      },
    ];
  }
  const food = Math.round((10 + luck * 10) * people);
  return [
    {
      message: `Caught some meat, stored ${food} units`,
      resourceDeltas: { ...emptyResources, food },
    },
  ];
};

const determineLumberEvents = (gameState: GameState): GameEvent[] => {
  if (noPeopleAllocated('gather_lumber', gameState)) {
    return [];
  }
  const luck = Math.random();
  const wood = Math.round((2 + luck * 2) * peopleAllocated('gather_lumber', gameState));
  return [
    {
      message: `Retrieved lumber, stored ${wood} units`,
      resourceDeltas: { ...emptyResources, wood },
    },
  ];
};

export const determineConsumeEvents = (gameState: GameState): GameEvent[] => {
  const people = gameState.resources.stored.people;
  return [
    {
      message: `Consumed food and water for ${people} people`,
      resourceDeltas: { ...emptyResources, food: -people, water: -people },
    },
  ];
};

export const calculateDaysEvents = (gameState: GameState): GameEvent[] => {
  return [
    ...determineWaterEvents(gameState),
    ...determineForageEvents(gameState),
    ...determineHuntEvents(gameState),
    ...determineLumberEvents(gameState),
    ...determineConsumeEvents(gameState),
  ];
};
