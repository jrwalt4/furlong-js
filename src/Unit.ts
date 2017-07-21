import { Dimensions } from './Dimensions';

export class Unit {
  constructor(
    public readonly conversion: number,
    public readonly dimensions: Dimensions,
    public readonly prefix: string
  ) { }

  public canAddWith({ dimensions }: Unit): boolean {
    return this.dimensions.every((dimension: number, index: number) => dimension === dimensions[index]);
  }

  public format(): string {
    return this.prefix;
  }

  public invert(): Unit {
    return new Unit(
      1 / this.conversion,
      this.dimensions.map((dim: number) => -1 * dim),
      this.prefix ? (this.prefix.startsWith('/') ? this.prefix.substring(1) : '/' + this.prefix) : ''
    );
  }
}
