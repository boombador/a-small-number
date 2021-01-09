import { Resources, ResourceMap, ResourceType } from './types';

export const applyDelta = (deltas: ResourceMap, mapToUpdate: ResourceMap): ResourceMap => {
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
