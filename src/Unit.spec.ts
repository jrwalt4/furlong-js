import { Unit } from './Unit';
import { ComplexUnit } from './ComplexUnit';
import { BaseUnit } from './BaseUnit';
import { AREA } from './Dimensions';

it('Creates a Unit', () => {
  let create = () => {
    let baseUnit: Unit = new BaseUnit('acre', AREA, 10);
    let complexUnit: Unit = new ComplexUnit([{ unit: baseUnit, power: 1 }]);
    return complexUnit;
  };
  expect(create).not.toThrow();
});
