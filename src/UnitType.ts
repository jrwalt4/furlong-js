import { Dimensions } from './Dimensions';

export abstract class UnitType {
  public dimensions: Dimensions;
  public abstract toBaseUnit(value: number): number;
}
