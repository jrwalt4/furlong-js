import { Dimensions } from './Dimensions';

interface IUnit {
  value: number;
  prefix: string;
  dimensions: Dimensions;
}

function createUnit(value: number, type?: string | IUnitType) {
  const unitType: IUnitType = typeof type === 'object' ? type : getUnitType(type);
  return {
    value,
    prefix: unitType.prefix,
    dimensions: unitType.dimensions
  };
}

function getUnitType(prefix?: string): IUnitType {
  return prefix ? (unitTypes.find((ut: IUnitType) => ut.prefix === prefix) || unitTypes[0]) : unitTypes[0]; // unitless
}

function reduceUnitToBaseValue(unit: IUnit): number {
  const type: IUnitType = getUnitType(unit.prefix);
  const factor = type.dimensions.reduce(
    (cumulativeFactor, dim, i) => {
      return cumulativeFactor * Math.pow(type.conversion[i], dim);
    }, 1);
  return unit.value * factor;
}

function castUnitToUnit(unit: IUnit, newPrefix: string): IUnit {
  const unitType: IUnitType = unitTypes.find(({ prefix }) => prefix === unit.prefix) as IUnitType;
  const castType: IUnitType = unitTypes.find(({ prefix }) => prefix === newPrefix) as IUnitType;
  const baseValue = reduceUnitToBaseValue(unit);
  const factor = castType.dimensions.reduce(
    (cumulativeFactor, dim, i) => {
      return cumulativeFactor / Math.pow(castType.conversion[i], dim);
    }, 1);
  return createUnit(baseValue * factor, newPrefix);
}

function canAddUnits(u1: IUnit, u2: IUnit): boolean {
  return u1.dimensions.every((dim, i) => dim === u2.dimensions[i]);
}

function addUnits(u1: IUnit, u2: IUnit): IUnit {
  if (canAddUnits(u1, u2)) {
    return castUnitToUnit(createUnit(
      reduceUnitToBaseValue(u1) + reduceUnitToBaseValue(u2),
      { prefix: '', conversion: u1.dimensions.map((dim) => dim * 1) as Dimensions, dimensions: u1.dimensions }
    ), u1.prefix);
  }
  throw new TypeError(`Dimensions do not agree: [${u1.dimensions.join(', ')}], [${u2.dimensions.join(', ')}]`);
}

interface IUnitType {
  prefix: string;
  conversion: Dimensions;
  dimensions: Dimensions;
}

const FEET_TO_METERS = 0.3048;
const MILES_TO_METERS = 1609;
const HOURS_TO_SECONDS = 3600;
const MINUTES_TO_SECONDS = 60;

const unitTypes: IUnitType[] = [
  {
    prefix: 'unitless',
    conversion: [0, 0, 0, 0],
    dimensions: [0, 0, 0, 0]
  },
  {
    prefix: 'ft',
    conversion: [0, FEET_TO_METERS, 0, 0],
    dimensions: [0, 1, 0, 0]
  },
  {
    prefix: 'm',
    conversion: [0, 1, 0, 0],
    dimensions: [0, 1, 0, 0]
  },
  {
    prefix: 'fps',
    conversion: [0, FEET_TO_METERS, 1, 0],
    dimensions: [0, 1, -1, 0]
  },
  {
    prefix: 'mps',
    conversion: [0, 1, 1, 0],
    dimensions: [0, 1, -1, 0]
  },
  {
    prefix: 'mph',
    conversion: [0, MILES_TO_METERS, HOURS_TO_SECONDS, 0],
    dimensions: [0, 1, -1, 0]
  }
];

const l = createUnit(10, 'ft');
const w = createUnit(10, 'm');

// tslint:disable-next-line:no-console
console.log(addUnits(l, w));

const s1 = createUnit(10, 'fps');
const s2 = createUnit(10, 'mph');

// tslint:disable-next-line:no-console
console.log(addUnits(s1, s2));

// tslint:disable-next-line:no-console
console.log('10 mph = ' + reduceUnitToBaseValue(createUnit(10, 'mph')).toFixed(2) + ' m/s');
// tslint:disable-next-line:no-console
console.log('10 mph = ' + castUnitToUnit(createUnit(10, 'mph'), 'mps').value.toFixed(2) + ' m/s');

try {
  const u1 = createUnit(10, 'ft');
  const u2 = createUnit(10, 'fps');
  const u3 = addUnits(u1, u2);
} catch (e) {
  // tslint:disable-next-line:no-console
  console.error(e.message);
}
