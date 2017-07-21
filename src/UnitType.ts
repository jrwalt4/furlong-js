import { Dimensions, DimensionOffset } from './Dimensions';

export abstract class UnitType {
  public dimensions: Dimensions;
  public abstract toBaseUnit(value: number): number;
  public getLengthDimension() {
    return this.dimensions[DimensionOffset.LENGTH];
  }
}
