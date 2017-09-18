import { IDimensions, equalDimensions, NONE, multiplyDimensions, powerDimensions } from './Dimensions';
import { Unit } from './Unit';

export interface IComplexUnitPart {
  unit: Unit;
  power: number;
}

export class ComplexUnit extends Unit {

  public readonly offset: number = 0;
  private readonly units: IComplexUnitPart[];

  constructor(units: IComplexUnitPart[]) {
    super();
    this.units = units;
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
  public format(): string {
    return this.prefix;
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
}
