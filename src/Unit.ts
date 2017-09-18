import {
  IDimensions,
  equalDimensions,
  multiplyDimensions,
  divideDimensions,
  powerDimensions
} from './Dimensions';
import * as Dimensions from './Dimensions';
import { IUnit } from './IUnit';
import { ComplexUnit } from './ComplexUnit';

export class Unit implements IUnit {

  constructor(
    public readonly prefix: string,
    public readonly dimensions: IDimensions,
    public readonly conversion: number = 1,
    public readonly offset: number = 0
  ) { }

  public isCompatibleWith(unit: Unit): boolean {
    return equalDimensions(this.dimensions, unit.dimensions);
  }

  public equals(otherUnit: Unit): boolean {
    return (
      this.isCompatibleWith(otherUnit) &&
      this.conversion === otherUnit.conversion &&
      this.offset === otherUnit.offset
    );
  }

  public toBase(value: number): number {
    return value * this.conversion;
  }

  public fromBase(value: number): number {
    return value / this.conversion;
  }

  public format(): string {
    return this.prefix;
  }

  public invert(): Unit {
    let dimensions: IDimensions = powerDimensions(this.dimensions, -1);
    return new Unit(
      this.prefix ? (this.prefix.startsWith('/') ? this.prefix.substring(1) : '/' + this.prefix) : '',
      dimensions,
      1 / this.conversion,
      this.offset
    );
  }

  public multiplyBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: 1 }]);
  }

  public divideBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: -1 }]);
  }
}

export namespace Unit {

  export const UNITLESS = new Unit('', Dimensions.NONE, 1);
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

}
