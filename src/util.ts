import groupBy = require('lodash.groupby');
import { IComplexUnitPart, ComplexUnit } from './ComplexUnit';
import { Unit } from './Unit';
import { parseUnit } from './parseUnit';

export interface INumeratorAndDenominator {
  numerator?: IComplexUnitPart[];
  denominator?: IComplexUnitPart[];
}

function positiveOrNegative(part: IComplexUnitPart): string {
  return part.power > 0 ? 'numerator' : 'denominator';
}

export function getNumAndDen(units: IComplexUnitPart[]): INumeratorAndDenominator {
  return groupBy(units, positiveOrNegative);
}

export function reduceToBaseUnits(units: IComplexUnitPart[]): IComplexUnitPart[] {
  return units.reduce<IComplexUnitPart[]>((baseUnits, part) => {
    let newPart: IComplexUnitPart | IComplexUnitPart[] = part;
    if (part.unit instanceof ComplexUnit) {
      newPart = reduceToBaseUnits(part.unit.units.map((subPart) => {
        return {
          unit: subPart.unit,
          power: subPart.power * part.power
        };
      }));
    }
    return baseUnits.concat(newPart);
  }, []);
}

export function reduceUnitPowers(units: IComplexUnitPart[]): IComplexUnitPart[] {
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

export function unitFromUnits(...unitArgs: Array<Unit | string | number>): Unit {
  let parts: IComplexUnitPart[] = [];
  let index = 0;
  while (index < unitArgs.length) {
    let unitPart = unitArgs[index];
    if (typeof unitPart === 'number') {
      throw new Error('Bad arguments');
    }
    let unit: Unit = typeof unitPart === 'string' ? parseUnit(unitPart) : unitPart;
    let maybePower = unitArgs[index + 1];
    let power = 1;
    if (typeof maybePower === 'number') {
      power = maybePower;
      index += 2;
    } else {
      index++;
    }
    parts.push({ unit, power });
  }
  let reduced = reduceUnitPowers(reduceToBaseUnits(parts));
  if(reduced.length === 1 && reduced[0].power === 1) {
    return reduced[0].unit;
  }
  return new ComplexUnit(reduced);
}
