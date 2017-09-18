import { IUnit } from './IUnit';
import { IDimensions, equalDimensions, NONE, multiplyDimensions, powerDimensions } from './Dimensions';
import { Unit } from './Unit';

export interface IComplexUnitPart {
  unit: IUnit;
  power: number;
}

export class ComplexUnit implements IUnit {

  constructor(private units: IComplexUnitPart[]) {
    /*
    this.units = units.reduce((combinedUnits: IUnit[], currentUnit) => {
      return combinedUnits.concat(currentUnit instanceof ComplexUnit ? currentUnit.units : currentUnit);
    }, []);
    */
  }
  public get prefix(): string {
    return this.units.reduce((prefix: string, part: IComplexUnitPart) => {
      return prefix + ' * ' + part.unit.format() + '^' + part.power;
    }, '');
  }
  public get dimensions(): IDimensions {
    return this.units.reduce((dimensions: IDimensions, part: IComplexUnitPart) => {
      return multiplyDimensions(dimensions, powerDimensions(part.unit.dimensions, part.power));
    }, NONE);
  }
  public get conversion(): number {
    return this.units.reduce((conversion: number, part: IComplexUnitPart) => {
      return conversion * part.unit.conversion ** part.power;
    }, 1);
  }
  public get offset(): number {
    return this.units.reduce((offset, part) => {
      return offset + part.unit.offset;
    }, 0);
  }
  public equals(unit: IUnit): boolean {
    return equalDimensions(this.dimensions, unit.dimensions);
  }
  public isCompatibleWith(unit: IUnit): boolean {
    return Unit.prototype.isCompatibleWith.call(this, unit);
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
  public invert(): IUnit {
    return new ComplexUnit(this.units.map(({ unit, power }) => ({ unit, power: power * -1 })));
  }
  public multiplyBy(unit: IUnit): IUnit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: 1 }]);
  }
  public divideBy(unit: IUnit): IUnit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: -1 }]);
  }
}
