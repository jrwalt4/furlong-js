import { IDimensions, fromDimensions } from './Dimensions';
import { Unit } from './Unit';
import { ComplexUnit } from './ComplexUnit';

export class BaseUnit extends Unit {

  private prefix: string;
  private dimensions: IDimensions;
  private conversion: number;
  private offset: number;

  constructor(prefix: string, dimensions: Partial<IDimensions>, conversion: number = 1, offset: number = 0) {
    super();
    this.prefix = prefix;
    this.dimensions = fromDimensions(dimensions);
    this.conversion = conversion;
    this.offset = offset;
  }

  public getDimensions(): IDimensions {
    return this.dimensions;
  }
  public getConversion(): number {
    return this.conversion;
  }
  public getOffset(): number {
    return this.offset;
  }
  public format(): string {
    return this.prefix;
  }

  public invert(): Unit {
    return new ComplexUnit([{ unit: this, power: -1 }]);
  }

  public multiplyBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: 1 }]);
  }

  public divideBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: -1 }]);
  }

  public powerTo(power: number): Unit {
    return power === 1 ? this : new ComplexUnit([{ unit: this, power }]);
  }
}
