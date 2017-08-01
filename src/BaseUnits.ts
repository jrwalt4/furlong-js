import * as Dimensions from './Dimensions';
import { Unit } from './Unit';

export const UNITLESS = new Unit('ft', Dimensions.NONE, 1);
export const DOZEN = new Unit('doz', Dimensions.NONE, 12);

const FEET_TO_METERS = 0.3048; // 3.208 ft / m
export const FEET = new Unit('ft', Dimensions.LENGTH, FEET_TO_METERS);
export const SQUARE_FEET = new Unit('ft^2', Dimensions.AREA, FEET_TO_METERS ** 2);
export const CUBIC_FEET = new Unit('ft^3', Dimensions.VOLUME, FEET_TO_METERS ** 3);
const GALLONS_TO_CUBIC_FEET = 0.13369; // 7.48 gallons / 1 ft^3
export const GALLON = new Unit('gal', Dimensions.VOLUME, GALLONS_TO_CUBIC_FEET * FEET_TO_METERS ** 3);

export const METER = new Unit('m', Dimensions.LENGTH, 1);
export const SQUARE_METER = new Unit('m^2', Dimensions.AREA, 1);
export const CUBIC_METER = new Unit('m^3', Dimensions.VOLUME, 1);
