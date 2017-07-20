import * as Dimensions from './Dimensions';

export interface IUnitTypeDef {
  prefix: string;
  conversion: number;
  dimensions: Dimensions.Dimensions;
}

export const UNITLESS = {
  prefix: '',
  conversion: 1,
  dimensions: Dimensions.UNITLESS
};

export const FEET = {
  prefix: 'ft',
  conversion: 0.3048,
  dimensions: Dimensions.LENGTH
};

export const METER = {
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
