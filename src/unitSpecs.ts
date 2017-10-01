import { Unit } from './Unit';
import { powerDimensions } from './Dimensions';

export function testCompatibility(u1: Unit, u2: Unit) {
  it('Should test compatibility', () => {
    expect(u1.isCompatibleWith(u2)).toBeTruthy();
  });
}

export function testEqual(u1: Unit, u2: Unit) {
  it('Should test equivalence', () => {
    expect(u1.equals(u2)).toBeTruthy();
  });
}

export function testUnit(unitConstructor: () => Unit) {
  it('Creates a Unit', () => {
    expect(unitConstructor).not.toThrow();
  });

  it('Tests compatibility', () => {
    let u1 = unitConstructor();
    let u2 = unitConstructor();
    expect(u1.isCompatibleWith(u2)).toBeTruthy();
  });

  it('Inverts', () => {
    let u1 = unitConstructor();
    let u2 = u1.invert();
    expect(u2.getDimensions()).toEqual(powerDimensions(u1.getDimensions(), -1));
  });
}
