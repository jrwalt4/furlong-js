export type Dimensions = [number, number, number, number];

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

  private dimensions: Dimensions = [0, 0, 0, 0];
  private conversion: number;

  constructor(private value: number, private unit?: string) {
    let preset: IPreset = presets.unitless;
    if (unit) {
      if (unit in presets) {
        preset = presets[unit];
      }
    }
    this.dimensions = preset.dimensions.slice() as Dimensions;
    this.conversion = preset.conversion;
  }

  public add(other: Unit): Unit {
    return Unit.addUnits(this, other);
  }

  public pow(power: number): Unit {
    throw new Error('Note implemented yet');
  }
}

interface IPreset {
  prefix: string;
  dimensions: Dimensions;
  conversion: number;
}

const presets: { [prefix: string]: IPreset } = {
  unitless: {
    prefix: '',
    dimensions: [0, 0, 0, 0],
    conversion: 1
  },
  ft: {
    prefix: 'ft',
    dimensions: [0, 1, 0, 0],
    conversion: 304.8
  }
};
