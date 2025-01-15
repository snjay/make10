import { expect, test } from 'vitest';
import { product } from './product';

test('should handle empty items array', () => {
  expect(product([], 0)).toEqual([]);
});

test('should handle single items array with r = 1', () => {
  expect(product(['1'], 1)).toEqual(['1']);
});

test('should generate cartesian product of items with r = 2', () => {
  expect(product(['1', '2'], 2)).toEqual(['11', '12', '21', '22']);
});

test('should generate cartesian product of items of length = 2 with r = 2', () => {
  expect(product(['1', '2', '3'], 2)).toEqual(['11', '12', '13', '21', '22', '23', '31', '32', '33']);
});

test('should generate cartesian product of items with r = 3', () => {
  expect(product(['1', '2'], 3)).toEqual(['111', '112', '121', '122', '211', '212', '221', '222']);
});

test('should generate cartesian product of items with r = 4', () => {
  expect(product(['1', '2'], 4)).toEqual([
    '1111',
    '1112',
    '1121',
    '1122',
    '1211',
    '1212',
    '1221',
    '1222',
    '2111',
    '2112',
    '2121',
    '2122',
    '2211',
    '2212',
    '2221',
    '2222',
  ]);
});
