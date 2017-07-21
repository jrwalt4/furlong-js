import * as Dimensions from './Dimensions';
import { Unit } from './Unit';

export interface IUnitTypeDef {
  prefix: string;
  conversion: number;
  dimensions: Dimensions.Dimensions;
}

export const UNITLESS = new Unit(1, Dimensions.NONE, '');
export const DOZEN = new Unit(12, Dimensions.NONE, 'doz');

const FEET_TO_METERS = 0.3048; // 3.208 ft / m
export const FEET = new Unit(FEET_TO_METERS, Dimensions.LENGTH, 'ft');
export const SQUARE_FEET = new Unit(FEET_TO_METERS ** 2, Dimensions.AREA, 'ft^2');
export const CUBIC_FEET = new Unit(FEET_TO_METERS ** 3, Dimensions.VOLUME, 'ft^3');
const GALLONS_TO_CUBIC_FEET = 0.13369; // 7.48 gallons / 1 ft^3
export const GALLON = new Unit(GALLONS_TO_CUBIC_FEET * FEET_TO_METERS**3, Dimensions.VOLUME, 'gal');

export const METER = new Unit(1, Dimensions.LENGTH, 'm');
export const SQUARE_METER = new Unit(1, Dimensions.AREA, 'm^2');
export const CUBIC_METER = new Unit(1, Dimensions.VOLUME, 'm^3');

export function resolvePrefix(prefix: string): IUnitTypeDef {
  switch (prefix) {
    case 'ft': return FEET;
    case 'm': return METER;
    default: return UNITLESS;
  }
}
