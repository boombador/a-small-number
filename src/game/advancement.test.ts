import { emptyResources } from './constants';
import { applyDelta } from './advancement';

it('Reflects a delta when starting with 0 counts for resources', () => {
  const result = applyDelta({ ...emptyResources, food: 5 }, { ...emptyResources });
  expect(result.food).toEqual(5);
});
