import * as Dimensions from './Dimensions';
import { Unit } from './Unit';
import { ComplexUnit } from './ComplexUnit';

export class BaseUnit extends Unit {

  public prefix: string;
  public dimensions: Dimensions.IDimensions;
  public conversion: number;
  public offset: number;

  constructor(prefix: string, dimensions: Dimensions.IDimensions, conversion: number = 1, offset: number = 0) {
    super();
    this.prefix = prefix;
    this.dimensions = dimensions;
    this.conversion = conversion;
    this.offset = offset;
  }

  public invert(): Unit {
    let dimensions: Dimensions.IDimensions = Dimensions.powerDimensions(this.dimensions, -1);
    return new BaseUnit(
      this.prefix ? (this.prefix.startsWith('/') ? this.prefix.substring(1) : '/' + this.prefix) : '',
      dimensions,
      1 / this.conversion,
      this.offset
    );
  }

  public multiplyBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: 1 }]);
  }

  public divideBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: -1 }]);
  }

}
