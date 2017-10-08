import {
  IDimensions,
  equalDimensions
} from './Dimensions';

export abstract class Unit {

  public abstract getDimensions(): IDimensions;

  public abstract getConversion(): number;

  public abstract getOffset(): number;

  public isCompatibleWith(unit: Unit): boolean {
    return equalDimensions(this.getDimensions(), unit.getDimensions());
  }

  public equals(otherUnit: Unit): boolean {
    return (
      this.isCompatibleWith(otherUnit) &&
      this.getConversion() === otherUnit.getConversion() &&
      this.getOffset() === otherUnit.getOffset()
    );
  }

  public is(otherUnit: Unit): boolean {
    return this === otherUnit;
  }

  public toBase(value: number): number {
    return value * this.getConversion();
  }

  public fromBase(value: number): number {
    return value / this.getConversion();
  }

  public abstract format(): string;

  public abstract invert(): Unit;

  public abstract multiplyBy(unit: Unit): Unit;

  public abstract divideBy(unit: Unit): Unit;

  public abstract powerTo(power: number): Unit;
}
