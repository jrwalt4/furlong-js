import { BaseUnit } from './BaseUnit';
import { testCompatibility } from './unitSpecs';
import { FEET, METER } from './UnitList';
import { AREA, LENGTH } from './Dimensions';

testCompatibility(FEET, METER);

testCompatibility(new BaseUnit('sq null', AREA, 4), new BaseUnit('square null', AREA, 4));

it('Prints unit format', () => {
  let u1 = new BaseUnit('foo', LENGTH, 1);
  expect(u1.format()).toEqual('foo');

  let u2 = new BaseUnit('bar', LENGTH, 1);
  expect(u2.format()).toEqual('bar');
});
