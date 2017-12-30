import { UnitLibrary } from './UnitLibrary';
import { BaseUnit } from './BaseUnit';
import { LENGTH, MASS, TIME } from './Dimensions';
import { Unit } from './Unit';

let units: Unit[];
let lib: UnitLibrary;

beforeEach(() => {
  units = [
    new BaseUnit('foot', LENGTH, 0.3028),
    new BaseUnit('meter', LENGTH, 1),
    new BaseUnit('gram', MASS, 1),
    new BaseUnit('pound', MASS, 1),
  ];
  lib = new UnitLibrary(units);
});

it('Constructs a library with a list of units', () => {
  let ctor = () => {
    return new UnitLibrary(units);
  };
  expect(ctor).not.toThrow();
});

it('Finds a unit by name', () => {
  expect(lib.find('foot').format()).toEqual('foot');
  expect(lib.find('meter').format()).toEqual('meter');
});

it('Finds a unit by alias', () => {
  let aliasLib = new UnitLibrary([
    ...units,
    {
      unit: new BaseUnit('second', TIME, 1),
      aliases: [
        'sec',
        's'
      ]
    }
  ]);

  // test normal operation
  expect(aliasLib.find('foot').format()).toEqual('foot');
  expect(aliasLib.find('meter').format()).toEqual('meter');

  // test for aliases
  expect(aliasLib.find('second').format()).toEqual('second');
  expect(aliasLib.find('sec').format()).toEqual('second');
  expect(aliasLib.find('s').format()).toEqual('second');
});
