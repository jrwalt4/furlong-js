import { Unit } from './Unit';
import * as BaseUnits from './BaseUnits';
import { IDimensions, NONE } from './Dimensions';
import { IUnit } from './IUnit';

export class Value {

  private value: number;

  constructor(value: number = 0, private unit: IUnit = BaseUnits.UNITLESS) {
    this.value = value * unit.conversion;
  }

  public add(value: Value): Value {
    if (this.unit.isCompatibleWith(value.unit)) {
      return new Value(this.value + value.value, this.unit);
    }
    throw new TypeError('Units are not compatible');
  }

  public to(unit: Unit): Value {
    if (this.unit.isCompatibleWith(unit)) {
      // find a way of passing value directly
      return new Value(this.value / unit.conversion, unit);
    }
    throw new TypeError('Units are not compatible');
  }
  public toNumber(unit?: Unit): number {
    if (unit && this.unit.isCompatibleWith(unit)) {
      return this.value / unit.conversion;
    }
    return this.value / this.unit.conversion;
  }

  public format(): string {
    return String(this.value / this.unit.conversion) + this.unit.format();
  }

  public valueOf(): number {
    return this.value;
  }
}
