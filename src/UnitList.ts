import * as Dimensions from './Dimensions';
import { BaseUnit } from './BaseUnit';
import { ComplexUnit } from './ComplexUnit';

export const UNITLESS = new BaseUnit('', Dimensions.NONE, 1);
export const DOZEN = new BaseUnit('doz', Dimensions.NONE, 12);

const FEET_TO_METERS = 0.3048; // 3.208 ft / m
export const FEET = new BaseUnit('ft', Dimensions.LENGTH, FEET_TO_METERS);
export const SQUARE_FEET = new ComplexUnit([{ unit: FEET, power: 2 }]);
export const CUBIC_FEET = new ComplexUnit([{ unit: FEET, power: 3 }]);
const GALLONS_TO_CUBIC_FEET = 0.13369; // 7.48 gallons / 1 ft^3
export const GALLON = new BaseUnit('gal', Dimensions.VOLUME, GALLONS_TO_CUBIC_FEET * FEET_TO_METERS ** 3);

export const METER = new BaseUnit('m', Dimensions.LENGTH, 1);
export const SQUARE_METER = new ComplexUnit([{ unit: METER, power: 2 }]);
export const CUBIC_METER = new ComplexUnit([{ unit: METER, power: 3 }]);
