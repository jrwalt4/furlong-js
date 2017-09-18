import { Unit } from './Unit';
import * as BaseUnits from './BaseUnits';
import { IDimensions, NONE } from './Dimensions';
import { IUnit } from './IUnit';

export class Value {

  /**
   * Numerical value in base units
   */
  private readonly value: number;

  /**
   * Units of the value
   */
  private readonly unit: IUnit;

  constructor(value: number = 0, unit: IUnit = BaseUnits.UNITLESS, isBaseUnit: boolean = false) {
    this.value = isBaseUnit ? value : unit.toBase(value);
    this.unit = unit;
  }

  public add(value: Value): Value {
    if (this.unit.isCompatibleWith(value.unit)) {
      return new Value(this.value + value.value, this.unit, true);
    }
    throw new TypeError('Units are not compatible');
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
        return this.value / unit.conversion;
      }
      throw new TypeError('Units are not compatible');
    }
    return this.unit.fromBase(this.value);
  }

  public format(): string {
    return String(this.value / this.unit.conversion) + this.unit.format();
  }

  public valueOf(): number {
    return this.value;
  }
}
