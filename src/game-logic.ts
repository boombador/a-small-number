
const createConstants = keys => keys.map(s => s.toUpperCase()).reduce((constants, key) => Object.assign({}, constants, {[key]: key}), {});

// Resource Types
const PEOPLE = 'PEOPLE';
const FOOD = 'FOOD';
const WATER = 'WATER';
const WOOD = 'WOOD';

// Activity Types
const RETRIEVE_WATER = 'RETRIEVE_WATER';
const FORAGE = 'FORAGE';
const HUNT = 'HUNT';
const CHOP_WOOD = 'CHOP_WOOD';
const SCOUT = 'SCOUT';
const DEFEND_BASE = 'DEFEND_BASE';

const updateResourceStorage = (resource, delta, gameState) => {
    // doesn't handle corner cases or lacking capacity yet
    gameState.resources.stored[resource] += delta;
};

const gatherFoodSuccess = gameState => {
    const foundFood = 1.5 + Math.random();
    updateResourceStorage(FOOD, foundFood, gameState),
};

const gatherWaterSuccess = gameState => {
    const foundWater = 2 + Math.random();
    updateResourceStorage(WATER, foundWater, gameState),
};

const gameEvents = {
    [SCOUT]: [],
    [FORAGE]: [
        {
            title: 'Gathered Berries',
            effect: gatherFoodSuccess,
        }
    ],
    [RETRIEVE_WATER]: [
        {
            title: 'Retrieved Water',
            effect: gatherWaterSuccess,
        }
    ],
    [HUNT]: [],
    [CHOP_WOOD]: [],
    [SCOUT]: [],
    [DEFEND_BASE]: [],
};

const sampleGameState = {
    discoveredResourceNodes: [
        {
            type: WATER,
            amount: 100,
        },
        {
            type: FOOD,
            amount: 100,
        },
        {
            type: WOOD,
            amount: 100,
        },
    ],
    resources: {
        stored: {
            [PEOPLE]: 100,
            [FOOD]: 100,
            [WATER]: 100,
            [WOOD]: 10,
        },
        storageContainers: {
            [PEOPLE]: 1,
            [FOOD]: 1,
            [WATER]: 2,
            [WOOD]: 0,
        },
    },
    dailyPlanning: {
        activityAllocations: {
            // activities are assumed 0 allocation if not mentioned
            [FORAGE]: 50,
            [RETRIEVE_WATER]: 10,
        },
    },
};

export default sampleGameState;