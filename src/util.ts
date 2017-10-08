import groupBy = require('lodash.groupby');
import { IComplexUnitPart } from './ComplexUnit';

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
