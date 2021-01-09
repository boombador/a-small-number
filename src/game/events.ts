import { GameState, GameEvent } from './types';
import { emptyResources } from './constants';

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

export const consumeEvent = (gameState: GameState): GameEvent => {
  const people = gameState.resources.stored;
  return {
    message: `Consumed food and water for ${people} people`,
    resourceDeltas: { ...emptyResources, food: -people, water: -people },
  };
};

export const calculateDaysEvents = (gameState: GameState): GameEvent[] => {
  const result = [];

  result.push(waterEvent(gameState));
  result.push(forageEvent(gameState));
  result.push(huntEvent(gameState));
  result.push(lumberEvent(gameState));
  result.push(consumeEvent(gameState));

  return result;
};
