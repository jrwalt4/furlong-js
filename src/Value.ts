import printf = require('printf');

import { Unit } from './Unit';
import * as Units from './UnitList';
import { unitFromUnits } from './util';

export class Value {

  /**
   * Units of the value
   */
  public readonly unit: Unit;

  /**
   * Numerical value in base units
   */
  private readonly value: number;

  constructor(value: number = 0, unit: Unit = Units.UNITLESS, isBaseUnit: boolean = false) {
    this.value = isBaseUnit ? value : unit.toBase(value);
    this.unit = unit;
  }

  public equals(other: Value): boolean {
    return (Math.abs(this.value - other.value) < 0.001) && this.unit.isCompatibleWith(other.unit);
  }

  public is(other: Value): boolean {
    return (Math.abs(this.value - other.value) < 0.001) && this.unit.equals(other.unit);
  }

  public add(value: Value): Value {
    if (this.unit.isCompatibleWith(value.unit)) {
      return new Value(this.value + value.value, this.unit, true);
    }
    throw new TypeError('Units are not compatible');
  }

  public subtract(value: Value): Value {
    if (this.unit.isCompatibleWith(value.unit)) {
      return new Value(this.value - value.value, this.unit, true);
    }
    throw new TypeError('Units are not compatible');
  }

  public multiply(value: Value): Value {
    return new Value(this.value * value.value, unitFromUnits(this.unit, value.unit), true);
  }

  public divide(value: Value): Value {
    return new Value(this.value / value.value, unitFromUnits(this.unit, value.unit, -1), true);
  }

  public power(power: number): Value {
    return new Value(this.value ** power, unitFromUnits(this.unit, power));
  }

  public to(unit: Unit): Value {
    if (this.unit.isCompatibleWith(unit)) {
      return new Value(this.value, unit, true);
    }
    throw new TypeError('Units are not compatible');
  }

  public toNumber(unit?: Unit): number {
    if (unit) {
      if (this.unit.isCompatibleWith(unit)) {
        return unit.fromBase(this.value);
      }
      throw new TypeError('Units are not compatible');
    }
    return this.unit.fromBase(this.value);
  }

  public format(format?: string): string {
    let value = this.unit.fromBase(this.value);
    let unitFormat = this.unit.format();
    if (!format) {
      format = Math.abs(Math.round(value) - value) < 0.0001 ? '%d %s' : '%f %s';
    }
    return printf(format, value, unitFormat);
  }

  public valueOf(): number {
    return this.value;
  }

  public toString(): string {
    return this.format();
  }
}
