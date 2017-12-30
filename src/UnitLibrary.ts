import { Unit } from './Unit';
import { IDimensions } from './Dimensions';

export interface IUnitDefinition {
  name: string;
  locales?: {
    [locale: string]: string[];
  };
  dimensions: string | Partial<IDimensions>;
  conversion: number;
}

export interface IUnitAliasDictionary {
  [unitAlias: string]: string;
}

export type UnitDefinition = Unit | {
  unit: Unit;
  aliases: string[]
};

interface IUnitDictionary {
  [unitName: string]: Unit;
}

export class UnitLibrary {

  private unitDictionary: IUnitDictionary;

  constructor(units: UnitDefinition[]) {
    this.unitDictionary = units.reduce((dictionary: IUnitDictionary, defOrUnit: UnitDefinition) => {
      if (defOrUnit instanceof Unit) {
        dictionary[defOrUnit.format()] = defOrUnit;
      } else {
        let unit = defOrUnit.unit;
        let name = unit.format();
        dictionary[name] = unit;
        for (let alias of defOrUnit.aliases) {
          dictionary[alias] = unit;
        }
      }
      return dictionary;
    }, {});
  }

  public has(name: string): boolean {
    return Boolean(this.unitDictionary[name]);
  }

  public find(name: string): Unit {
    if (this.has(name)) {
      return this.unitDictionary[name];
    }
    throw new Error('Could not find unit: ' + name);
  }

}
