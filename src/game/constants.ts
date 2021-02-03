import { ActivityAllocations, ResourceMap, ResourceType, ActivityType } from './types';

export const emptyResources: ResourceMap = {
  people: 0,
  food: 0,
  water: 0,
  wood: 0,
};

export const emptyActivities: ActivityAllocations = {
  gather_lumber: 0,
  defend: 0,
  gather_food: 0,
  hunt: 0,
  collect_water: 0,
  scout: 0,
};

export const resourceColors: { [K in ResourceType]: string } = {
  food: '#2B8247',
  people: '#A43740',
  water: '#5F8FBF',
  wood: '#70582E',
};

export const activityColors: { [K in ActivityType]: string } = {
  gather_lumber: resourceColors.wood,
  defend: resourceColors.people,
  gather_food: resourceColors.food,
  hunt: resourceColors.food,
  collect_water: resourceColors.water,
  scout: '#C29E3D',
};

export const cameraOrbitRadius = 2;
export const cameraOrbitHeight = 1.3;
export const upDirection = [0, 0, 1];
