import { IDimensions, multiplyDimensions, powerDimensions, NONE } from './Dimensions';
import { Unit } from './Unit';
import { getNumAndDen } from './util';

export interface IComplexUnitPart {
  unit: Unit;
  power: number;
}

export class ComplexUnit extends Unit {

  private readonly units: IComplexUnitPart[];

  constructor(units: IComplexUnitPart[]) {
    super();
    this.units = units;
  }

  public getDimensions(): IDimensions {
    return this.units.reduce((dimensions: IDimensions, part: IComplexUnitPart) => {
      return multiplyDimensions(dimensions, powerDimensions(part.unit.getDimensions(), part.power));
    }, NONE);
  }
  public getConversion(): number {
    return this.units.reduce((conversion: number, part: IComplexUnitPart) => {
      return conversion * part.unit.getConversion() ** part.power;
    }, 1);
  }
  public getOffset(): number {
    return 0; // if there's an offset in a complex unit, we have a problem
  }
  public format(): string {
    let { numerator, denominator } = getNumAndDen(this.units.filter((u) => u.power !== 0));
    let format: string[] = [];
    if (numerator && numerator.length > 0) {
      format.push(numerator.map(({ unit, power }) => {
        let partFormat = unit.format();
        if (unit instanceof ComplexUnit) {
          partFormat = `(${partFormat})`;
        }
        partFormat += power > 1 ? `^${power}` : '';
        return partFormat;
      }).join('*'));
    }
    if (denominator && denominator.length > 0) {
      format.push(denominator.map(({ unit, power }) => {
        let partFormat = unit.format();
        if (unit instanceof ComplexUnit) {
          partFormat = `(${partFormat})`;
        }
        let denPower = Math.abs(power);
        partFormat += denPower > 1 ? `^${denPower}` : '';
        return partFormat;
      }).join('/'));
    }
    return format.join('/');
  }
  public invert(): Unit {
    return new ComplexUnit(this.units.map(({ unit, power }) => ({ unit, power: power * -1 })));
  }
  public multiplyBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: 1 }]);
  }
  public divideBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: -1 }]);
  }
  public powerTo(power: number): Unit {
    return new ComplexUnit([{ unit: this, power }]);
  }
}
