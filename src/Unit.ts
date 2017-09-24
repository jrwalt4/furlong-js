import {
  IDimensions,
  equalDimensions
} from './Dimensions';

export abstract class Unit {

  public abstract readonly prefix: string;
  public abstract readonly dimensions: IDimensions;
  public abstract readonly conversion: number;
  public abstract readonly offset: number;

  public isCompatibleWith(unit: Unit): boolean {
    return equalDimensions(this.dimensions, unit.dimensions);
  }

  public equals(otherUnit: Unit): boolean {
    return (
      this.isCompatibleWith(otherUnit) &&
      this.conversion === otherUnit.conversion &&
      this.offset === otherUnit.offset
    );
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

  public abstract invert(): Unit;

  public abstract multiplyBy(unit: Unit): Unit;

  public abstract divideBy(unit: Unit): Unit;
}
