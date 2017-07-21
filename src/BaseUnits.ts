import * as Dimensions from './Dimensions';
import { Unit } from './Unit';

export interface IUnitTypeDef {
  prefix: string;
  conversion: number;
  dimensions: Dimensions.Dimensions;
}

export const UNITLESS: Unit = new Unit(1, Dimensions.NONE, '');

export const FEET: Unit = new Unit(0.3048, Dimensions.LENGTH, 'ft');

export const METER: IUnitTypeDef = {
  prefix: 'm',
  conversion: 1,
  dimensions: Dimensions.LENGTH
};

export function resolvePrefix(prefix: string): IUnitTypeDef {
  switch (prefix) {
    case 'ft': return FEET;
    case 'm': return METER;
    default: return UNITLESS;
  }
}
