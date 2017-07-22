import { Dimensions, DimensionOffset } from './Dimensions';

export class Unit {
  private mass: number;
  private length: number;
  private time: number;
  private temperature: number;
  constructor(
    public readonly conversion: number,
    dimensions: Dimensions,
    public readonly prefix: string
  ) {
    this.mass = dimensions[DimensionOffset.MASS] || 0;
    this.length = dimensions[DimensionOffset.LENGTH] || 0;
    this.time = dimensions[DimensionOffset.TIME] || 0;
    this.temperature = dimensions[DimensionOffset.TEMPERATURE] || 0;
  }

  public isCompatibleWith(unit: Unit): boolean {
    return (
      this.mass === unit.mass &&
      this.length === unit.length &&
      this.time === unit.time &&
      this.temperature === unit.temperature
    );
  }

  public equals(otherUnit: Unit): boolean {
    return this.isCompatibleWith(otherUnit) && this.conversion === otherUnit.conversion;
  }

  public format(): string {
    return this.prefix;
  }

  public invert(): Unit {
    let dimensions: Dimensions = [];
    dimensions[DimensionOffset.MASS] = this.mass * -1;
    dimensions[DimensionOffset.LENGTH] = this.length * -1;
    dimensions[DimensionOffset.TIME] = this.time * -1;
    dimensions[DimensionOffset.TEMPERATURE] = this.temperature * -1;
    return new Unit(
      1 / this.conversion,
      dimensions,
      this.prefix ? (this.prefix.startsWith('/') ? this.prefix.substring(1) : '/' + this.prefix) : ''
    );
  }

  public multipliedBy(unit: Unit): Unit {
    let dimensions: Dimensions = [];
    dimensions[DimensionOffset.MASS] = this.mass + unit.mass;
    dimensions[DimensionOffset.LENGTH] = this.length + unit.length;
    dimensions[DimensionOffset.TIME] = this.time + unit.time;
    dimensions[DimensionOffset.TEMPERATURE] = this.temperature + unit.temperature;
    return new Unit(
      this.conversion * unit.conversion,
      dimensions,
      this.prefix + '-' + unit.prefix
    );
  }

  public dividedBy(unit: Unit): Unit {
    let dimensions: Dimensions = [];
    dimensions[DimensionOffset.MASS] = this.mass - unit.mass;
    dimensions[DimensionOffset.LENGTH] = this.length - unit.length;
    dimensions[DimensionOffset.TIME] = this.time - unit.time;
    dimensions[DimensionOffset.TEMPERATURE] = this.temperature - unit.temperature;
    return new Unit(
      this.conversion / unit.conversion,
      dimensions,
      this.prefix + '/' + unit.prefix
    );
  }
}
