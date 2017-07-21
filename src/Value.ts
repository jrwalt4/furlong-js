import { Unit } from './Unit';
import * as BaseUnits from './BaseUnits';

export class Value {
  private units: Unit[];
  private value: number;
  constructor(value: number, units: Unit | Unit[] = BaseUnits.UNITLESS) {
    this.value = value;
    this.units = Array.isArray(units) ? units : [units];
  }
  public add(value: Value): number {
    return this.reduceToBaseNumber() + value.reduceToBaseNumber();
  }
  private reduceToBaseNumber(): number {
    return this.value * this.units.reduce((reduction: number, unit: Unit) => {
      return reduction * unit.conversion;
    }, 1);
  }

}
