import { IDimensions, multiplyDimensions, powerDimensions, NONE } from './Dimensions';
import { Unit } from './Unit';
import { getNumAndDen } from './util';

export interface IComplexUnitPart {
  unit: Unit;
  power: number;
}

export class ComplexUnit extends Unit {

  private static reduceToBaseUnits(units: IComplexUnitPart[]): IComplexUnitPart[] {
    return units.reduce<IComplexUnitPart[]>((baseUnits, part) => {
      let newPart: IComplexUnitPart | IComplexUnitPart[] = part;
      if (part.unit instanceof ComplexUnit) {
        newPart = ComplexUnit.reduceToBaseUnits(part.unit.units.map((subPart) => {
          return {
            unit: subPart.unit,
            power: subPart.power * part.power
          };
        }));
      }
      return baseUnits.concat(newPart);
    }, []);
  }

  private static reduceUnitPowers(units: IComplexUnitPart[]): IComplexUnitPart[] {
    return units.reduce<IComplexUnitPart[]>((simplified, part) => {
      let repeatUnitPart = simplified.find((simplePart) => {
        return simplePart.unit.is(part.unit);
      });
      if (repeatUnitPart) {
        repeatUnitPart.power += part.power;
        // since we've changed the power of that part, return the same list
        // (mutability... yuck)
        // if the new power is 0, remove that part (it has been cancelled out)
        return repeatUnitPart.power !== 0 ? simplified : simplified.filter((filterPart) => {
          return part !== filterPart;
        });
      }
      return simplified.concat(part);
    }, []);
  }

  private readonly units: IComplexUnitPart[];

  constructor(units: IComplexUnitPart[]) {
    super();
    this.units = ComplexUnit.reduceUnitPowers(ComplexUnit.reduceToBaseUnits(units));
  }

  public getDimensions(): IDimensions {
    return this.units.reduce((dimensions: IDimensions, part: IComplexUnitPart) => {
      return multiplyDimensions(dimensions, powerDimensions(part.unit.getDimensions(), part.power));
    }, NONE);
  }
  public getConversion(): number {
    return this.units.reduce((conversion: number, part: IComplexUnitPart) => {
      return conversion * part.unit.getConversion() ** part.power;
    }, 1);
  }
  public getOffset(): number {
    return 0; // if there's an offset in a complex unit, we have a problem
  }
  public format(): string {
    let { numerator, denominator } = getNumAndDen(this.units.filter((u) => u.power !== 0));
    let format: string[] = [];
    if (numerator && numerator.length > 0) {
      format.push(numerator.map(({ unit, power }) => {
        let partFormat = unit.format();
        if (unit instanceof ComplexUnit) {
          partFormat = `(${partFormat})`;
        }
        partFormat += power > 1 ? `^${power}` : '';
        return partFormat;
      }).join('*'));
    } else {
      format.push('1');
    }
    if (denominator && denominator.length > 0) {
      format.push(denominator.map(({ unit, power }) => {
        let partFormat = unit.format();
        if (unit instanceof ComplexUnit) {
          partFormat = `(${partFormat})`;
        }
        let denPower = Math.abs(power);
        partFormat += denPower > 1 ? `^${denPower}` : '';
        return partFormat;
      }).join('/'));
    }
    return format.join('/');
  }
  public invert(): Unit {
    return new ComplexUnit(this.units.map(({ unit, power }) => ({ unit, power: power * -1 })));
  }
  public multiplyBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: 1 }]);
  }
  public divideBy(unit: Unit): Unit {
    return new ComplexUnit([{ unit: this, power: 1 }, { unit, power: -1 }]);
  }
  public powerTo(power: number): Unit {
    return new ComplexUnit([{ unit: this, power }]);
  }
}
