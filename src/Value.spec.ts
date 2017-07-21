import { Value } from './Value';
import { UNITLESS, FEET, METER } from './BaseUnits';

let v1: Value, v2: Value;

beforeEach(() => {
  v1 = new Value(10, FEET);
  v2 = new Value(10, METER);
});

it('Creates a value', () => {
  let creatorFn = () => {
    return new Value(10, UNITLESS);
  };
  expect(creatorFn).not.toThrow();
});

it('Adds another value', () => {
  expect(v1.add(v2).toNumber()).toEqual(10 + 10/0.3048);
});

it('Casts to another unit', () => {
  expect(v1.to(METER).toNumber()).toBeCloseTo(10*0.3048,0.001);
});
