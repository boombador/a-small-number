
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

interface ResourceState {
    stored: {
        [key: string]: number
    },
    storageContainers: {
        [key: string]: number
    },
}

interface ResourceNode {
    type: string,
    amount: number,
}

// is an array interface necessary? found this solution on SO
interface ResourceNodeArray {
    [index: number]: ResourceNode
}

interface ExplorationState {
    discoveredResources: ResourceNodeArray
}

interface PlanningState {
    activityAllocations: {
        [key: string]: number
    }
}

interface GameState {
    resources: ResourceState,
    exploration: ExplorationState,
    dailyPlanning: PlanningState,
}

interface EffectFunc {
    (gameState : GameState): GameState
}

const updateResourceStorage = (resource : string, delta : number, gameState : GameState): GameState => {
    // doesn't handle corner cases or lacking capacity yet
    gameState.resources.stored[resource] += delta;
    return gameState;
};

const gatherFoodSuccess : EffectFunc = gameState => {
    const foundFood = 1.5 + Math.random();
    return updateResourceStorage(FOOD, foundFood, gameState);
};

const gatherWaterSuccess : EffectFunc = gameState => {
    const foundWater = 2 + Math.random();
    return updateResourceStorage(WATER, foundWater, gameState);
};

interface Outcome {
    title: string,
    effect: EffectFunc,
}

interface EventDefinitions {
    [key: string]: Outcome[]
}

const gameEvents : EventDefinitions = {
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

const sampleGameState : GameState = {
    exploration: {
        discoveredResources: [
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
    },
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

const selectOutcomes = (possibleOutcomes: Outcome[]): Outcome[] => {
    // TODO: figure out if only one outcome is selected or
    // multiple are allowed. Return an array to maintain flexibility
    return possibleOutcomes.slice(0, 1); // just drop all but first event for now
};

const noOutcomes : Outcome[] = [];

const advanceDay = (gameState : GameState) => {
    const pendingEvents = Object.entries(gameState.dailyPlanning.activityAllocations)
        .reduce((partialPendingEvents, [activity, personnelCount]) => {
            const possibleOutcomes : Outcome[] = gameEvents[activity];
            return partialPendingEvents.concat(selectOutcomes(possibleOutcomes))
        }, noOutcomes);

    return pendingEvents.reduce(
        (state, event) => {
            console.log(event.title);
            return event.effect(state)
        },
        gameState);
};

advanceDay(sampleGameState);

export default sampleGameState;