import { Value } from './Value';
import { UNITLESS, FEET, METER, SQUARE_FEET, ACRES } from './UnitList';

let v1: Value, v2: Value;

interface IMatchers extends jest.Matchers<void> {
  toEqualValue(value: Value): void;
  toBeValue(value: Value): void;
}

interface IExpect extends jest.Expect {
  (actual: any): IMatchers;
}

declare const expect: IExpect;

expect.extend({
  toEqualValue(recieved: Value, expected: Value) {
    return {
      pass: recieved.equals(expected),
      message: () => `Expected ${recieved.format()} to equal ${expected.format()}`
    };
  },
  toBeValue(recieved: Value, expected: Value) {
    return {
      pass: recieved.is(expected),
      message: () => `Expected ${recieved.format()} to be ${expected.format()}`
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
  expect(v1.is(v12)).toBeTruthy();
  let v22 = new Value(10, METER);
  expect(v2.is(v22)).toBeTruthy();
  let areaSqFt = new Value(43560, SQUARE_FEET);
  let areaAcres = new Value(1, ACRES);
  expect(areaAcres.equals(areaSqFt)).toBeTruthy();
});

it('Adds values', () => {
  expect(v1.add(v2)).toBeValue(new Value(10 + 10 / 0.3048, FEET));
});

it('Subtracts values', () => {
  expect(v1.subtract(v2)).toBeValue(new Value(10 - 10 / 0.3048, FEET));
});

it('Multiplies values', () => {
  expect(v1.multiply(v2)).toEqualValue(new Value(10 * 10 / 0.3048, SQUARE_FEET));
});

it('Divides values', () => {
  expect(v1.divide(v2)).toEqualValue(new Value(0.3048, UNITLESS));
});

it('Casts to another unit', () => {
  expect(v1.to(METER)).toBeValue(new Value(10 * 0.3048, METER));
});

it('Prints the value', () => {
  expect(v1.format()).toEqual('10 ft');
  expect(v2.format()).toEqual('10 m');
  let add = v1.add(new Value(0.5,FEET));
  expect(add.format()).toMatch(/['10.5']\d{0,5} ft/);
});

it('Prints the value with provided format', () => {
  expect(v1.format('%.3f')).toEqual('10.000');
  expect(v1.format('%03.f %s')).toEqual('010 ft');
});
