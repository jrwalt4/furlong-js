import { Unit } from './Unit';
import { ComplexUnit } from './ComplexUnit';
import { FEET, SECOND } from './UnitList';
import { testUnit } from './unitSpecs';

function complexUnitConstructor(): Unit {
  return new ComplexUnit([{unit: FEET, power: 1}]);
}

testUnit(complexUnitConstructor);

it('Prints unit format', () => {
  let u1 = new ComplexUnit([{unit: FEET, power: 2}]);
  expect(u1.format()).toEqual('ft^2');
});

it('Combines unit formats', () => {
  let u1 = new ComplexUnit([{unit: FEET, power: 1}, {unit: SECOND, power: -1}]);
  expect(u1.format()).toEqual('ft/s');

  let u2 = new ComplexUnit([{unit: FEET, power: 1}, {unit: SECOND, power: -2}]);
  expect(u2.format()).toEqual('ft/s^2');
});
