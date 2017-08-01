import { IDimensions } from './Dimensions';

export interface IUnit {
  prefix: string;
  dimensions: IDimensions;
  conversion: number;
  offset: number;
  equals(unit: IUnit): boolean;
  isCompatibleWith(unit: IUnit): boolean;
  format(): string;
  invert(): IUnit;
  multiplyBy(unit: IUnit): IUnit;
  divideBy(unit: IUnit): IUnit;
}
