import { Unit } from './Unit';
import * as BaseUnits from './BaseUnits';
import { Dimensions, NONE } from './Dimensions';

export class Value {
  private units: Unit[];
  private value: number;
  constructor(value: number, units: Unit | Unit[] = BaseUnits.UNITLESS) {
    this.value = value;
    this.units = Array.isArray(units) ? units : [units];
  }
  public add(value: Value): Value {
    let thisUnits = this.reduceUnits();
    let otherUnits = value.reduceUnits();
    if(thisUnits.isCompatibleWith(otherUnits)) {
      return new Value(
        (this.value * thisUnits.conversion + value.value * otherUnits.conversion)/thisUnits.conversion,
        this.units);
    }
    throw new TypeError('Units are not compatible');
  }
  public to(unit: Unit): Value {
    let units = this.reduceUnits();
    let baseValue = this.value * units.conversion;
    return new Value(baseValue / unit.conversion, unit);
  }
  public toNumber(unit?: Unit): number {
    if(unit) {
      return unit.equals(this.reduceUnits()) ? this.value : this.to(unit).value;
    }
    return this.value;
  }
  private reduceToBaseNumber(): number {
    return this.value * this.units.reduce((reduction: number, unit: Unit) => {
      return reduction * unit.conversion;
    }, 1);
  }
  private reduceUnits(): Unit {
    return this.units.reduce((previous, current) => previous ? previous.multipliedBy(current) : current);
  }
  private reduceUnitDimensions(): Dimensions {
    return this.units.reduce((cumulativeDimensions, { dimensions }: Unit) => {
      return dimensions.map((dim, i) => dim + cumulativeDimensions[i]);
    }, NONE);
  }
}
