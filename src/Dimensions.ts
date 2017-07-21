export type Dimensions = [number, number, number, number] | number[];

export const enum DimensionOffset {
  MASS = 0,
  LENGTH,
  TIME,
  TEMPERATURE
}

/* Unitless dimensions */
export const NONE: Dimensions = [0, 0, 0, 0];

/* Base dimensions */
export const MASS: Dimensions = [1, 0, 0, 0];
export const LENGTH: Dimensions = [0, 1, 0, 0];
export const AREA: Dimensions = [0, 2, 0, 0];
export const VOLUME: Dimensions = [0, 3, 0, 0];
export const TIME: Dimensions = [0, 0, 1, 0];
export const TEMPERATURE: Dimensions = [0, 0, 0, 1];

/* Derived dimensions */
export const SPEED: Dimensions = [0, 1, -1, 0];
export const FLOW: Dimensions = [0, 3, -1, 0];
export const WEIGHT: Dimensions = [1, 1, -2, 0];
