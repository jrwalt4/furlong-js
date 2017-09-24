import { Value } from './Value';
import { UNITLESS, FEET, METER, SQUARE_FEET, ACRES } from './UnitList';

let v1: Value, v2: Value;

interface IMatchers extends jest.Matchers<void> {
  toEqualValue(value: Value): void;
}

expect.extend({
  toEqualValue(recieved: Value, argument: Value) {
    return {
      pass: recieved.equals(argument),
      message: () => `Expected ${recieved.format()} to equal ${argument.format()}`
    };
  }
});

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

it('Tests equivalence', () => {
  let v12 = new Value(10, FEET);
  expect(v1.equals(v12)).toBeTruthy();
  let v22 = new Value(10, METER);
  expect(v2.equals(v22)).toBeTruthy();
  let areaSqFt = new Value(43560, SQUARE_FEET);
  let areaAcres = new Value(1, ACRES);
  expect(areaAcres.equals(areaSqFt)).toBeTruthy();
});

it('Adds values', () => {
  (expect(v1.add(v2)) as IMatchers).toEqualValue(new Value(10 + 10 / 0.3048, FEET));
});

it('Subtracts values', () => {
  expect(v1.subtract(v2).toNumber()).toBeCloseTo(10 - 10 / 0.3048, 0.001);
});

it('Multiplies values', () => {
  expect(v1.multiply(v2).toNumber(SQUARE_FEET)).toBeCloseTo(10 * 10 / 0.3048, 0.001);
});

it('Divides values', () => {
  expect(v1.divide(v2).toNumber(UNITLESS)).toBeCloseTo(0.3048, 0.001);
});

it('Casts to another unit', () => {
  expect(v1.to(METER).toNumber()).toBeCloseTo(10 * 0.3048, 0.001);
});

it('Prints the value', () => {
  expect(v1.format()).toEqual('10 ft');
});
