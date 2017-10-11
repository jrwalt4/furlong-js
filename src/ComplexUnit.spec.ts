import { Unit } from './Unit';
import { ComplexUnit } from './ComplexUnit';
import { FEET, SECOND } from './UnitList';
import { testUnit } from './unitSpecs';

function complexUnitConstructor(): Unit {
  return new ComplexUnit([{ unit: FEET, power: 1 }]);
}

testUnit(complexUnitConstructor);

it('Prints unit format', () => {
  let u1 = new ComplexUnit([{ unit: FEET, power: 2 }]);
  expect(u1.format()).toEqual('ft^2');
});

it('Combines unit formats', () => {
  let u1 = new ComplexUnit([{ unit: FEET, power: 1 }, { unit: SECOND, power: -1 }]);
  expect(u1.format()).toEqual('ft/s');

  let u2 = new ComplexUnit([{ unit: FEET, power: 1 }, { unit: SECOND, power: -2 }]);
  expect(u2.format()).toEqual('ft/s^2');

  let u3 = u1.multiplyBy(u2);
  expect(u3.format()).toEqual('ft^2/s^3');

  let perFoot = new ComplexUnit([{ unit: FEET, power: -1 }]);
  expect(perFoot.format()).toEqual('1/ft');
});

it('Reduces units when they cancel out', () => {
  let fps = new ComplexUnit([{ unit: FEET, power: 1 }, { unit: SECOND, power: -1 }]);
  let ft = fps.multiplyBy(SECOND);
  expect(ft.format()).toEqual('ft');

  let sec = FEET.divideBy(fps);
  expect(sec.format()).toEqual('s');
});
