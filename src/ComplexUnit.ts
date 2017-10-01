import { IDimensions, multiplyDimensions, powerDimensions, NONE } from './Dimensions';
import { Unit } from './Unit';

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
    return this.units.reduce((format: string, part: IComplexUnitPart) => {
      let partFormat = part.unit.format();
      partFormat = part.unit instanceof ComplexUnit ? `(${partFormat})` : partFormat;
      partFormat += Math.abs(part.power) === 1 ? '' : `^${part.power}`;
      if(format.length > 0) {
        return part.power > 0 ? partFormat + '*' + format : format + '/'+partFormat;
      } else {
        return partFormat;
      }
    }, '');
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
