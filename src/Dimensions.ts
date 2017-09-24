export interface IDimensions {
  mass: number;
  length: number;
  time: number;
  temperature: number;
}

export function createDimension(
  mass: number = 0,
  length: number = 0,
  time: number = 0,
  temperature: number = 0
): IDimensions {
  return {
    mass,
    length,
    time,
    temperature
  };
}

export function equalDimensions(dimensions1: IDimensions, dimensions2: IDimensions): boolean {
  return (
    dimensions1.mass === dimensions2.mass &&
    dimensions1.length === dimensions2.length &&
    dimensions1.time === dimensions2.time &&
    dimensions1.temperature === dimensions2.temperature
  );
}

export function multiplyDimensions(dimensions1: IDimensions, dimensions2: IDimensions): IDimensions {
  return {
    mass: dimensions1.mass + dimensions2.mass,
    length: dimensions2.length + dimensions1.length,
    time: dimensions1.time + dimensions2.time,
    temperature: dimensions1.temperature + dimensions2.temperature
  };
}

export function powerDimensions(dimensions: IDimensions, power: number): IDimensions {
  return {
    mass: dimensions.mass * power,
    length: dimensions.length * power,
    time: dimensions.time * power,
    temperature: dimensions.temperature * power
  };
}

export function divideDimensions(dimensions1: IDimensions, dimensions2: IDimensions): IDimensions {
  return {
    mass: dimensions1.mass - dimensions2.mass,
    length: dimensions2.length - dimensions1.length,
    time: dimensions1.time - dimensions2.time,
    temperature: dimensions1.temperature - dimensions2.temperature
  };
}

/* Unitless dimensions */
export const NONE: IDimensions = {
  mass: 0, length: 0, time: 0, temperature: 0
};

/* Base dimensions */
export const MASS: IDimensions = {
  mass: 1, length: 0, time: 0, temperature: 0
};
export const LENGTH: IDimensions = {
  mass: 0, length: 1, time: 0, temperature: 0
};
export const AREA: IDimensions = {
  mass: 0, length: 2, time: 0, temperature: 0
};
export const VOLUME: IDimensions = {
  mass: 0, length: 3, time: 0, temperature: 0
};
export const TIME: IDimensions = {
  mass: 0, length: 0, time: 1, temperature: 0
};
export const TEMPERATURE: IDimensions = {
  mass: 0, length: 0, time: 0, temperature: 1
};

/* Derived dimensions */
export const SPEED: IDimensions = {
  mass: 0, length: 1, time: -1, temperature: 0
};
export const ACCELERATION: IDimensions = {
  mass: 0, length: 1, time: -2, temperature: 0
};
export const VOLUMETRIC_FLOW: IDimensions = {
  mass: 0, length: 3, time: -1, temperature: 0
};
export const WEIGHT: IDimensions = {
  mass: 1, length: 1, time: -2, temperature: 0
};
