import { Dimensions } from './Dimensions';

export class Unit {

  public static addUnits(unit1: Unit, unit2: Unit, unitType?: string): Unit {
    return new Unit(unit1.value + unit2.value, unitType);
  }

  public static subUnits() {
    throw new Error('Note implemented yet');
  }

  public static mulUnits() {
    throw new Error('Note implemented yet');
  }

  public static divUnits() {
    throw new Error('Note implemented yet');
  }

  private dimensions: Dimensions;
  private conversion: number;

  constructor(private value: number, private unit?: string) {}

  public add(other: Unit): Unit {
    return Unit.addUnits(this, other);
  }

  public pow(power: number): Unit {
    throw new Error('Note implemented yet');
  }
}
