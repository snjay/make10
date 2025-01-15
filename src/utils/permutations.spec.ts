import { expect, test } from 'vitest';
import { permutations } from './permutations';

test('should handle 0-length list', () => {
  expect(permutations([])).toEqual([]);
});

test('should generate valid permutations of a 1-length list', () => {
  expect(permutations(['1'])).toEqual([['1']]);
});

test('should generate valid permutations of a 2-length list', () => {
  expect(permutations(['1', '2'])).toEqual([
    ['1', '2'],
    ['2', '1'],
  ]);
});

test('should generate valid permutations of a 3-length list', () => {
  expect(permutations(['1', '2', '3']).sort()).toEqual(
    [
      ['1', '2', '3'],
      ['1', '3', '2'],
      ['2', '1', '3'],
      ['2', '3', '1'],
      ['3', '1', '2'],
      ['3', '2', '1'],
    ].sort(),
  );
});
