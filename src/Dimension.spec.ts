import { createDimension, equalDimensions, IDimensions, multiplyDimensions } from './Dimensions';

it('Creates dimension objects', () => {
  let expectation: IDimensions = {
    mass: 1,
    length: 1,
    time: 1,
    temperature: 1
  };
  let creation = createDimension(1, 1, 1, 1);
  expect(creation).toEqual(expectation);
});

it('Checks if dimensions are equivalent', () => {
  let d1 = createDimension(0, 1, 0, 1);
  let d2 = createDimension(0, 1, 0, 1);
  let d3 = createDimension(1, 1, 1, 1);
  expect(equalDimensions(d1, d2)).toBeTruthy();
  expect(equalDimensions(d1, d3)).not.toBeTruthy();
});

it('Multiplies dimensions', () => {
  let d1 = createDimension(1,0,1,0);
  let d2 = createDimension(0,1,0,1);
  let d3 = createDimension(1,1,1,1);
  expect(multiplyDimensions(d1,d2)).toEqual(d3);
});
