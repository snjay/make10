import { expect, describe, it } from 'vitest';
import { generateOrderedPostfixExprs } from './generate-postfix-expressions';

describe('generateOrderedPostfixExprs', () => {
  it('generate ordered postfix exprs with 2 numbers and 1 operator', () => {
    expect(generateOrderedPostfixExprs(['9', '8'], ['+'])).toEqual(['9 8 +']);
  });

  it('generate ordered postfix exprs with 3 numbers and 2 operators', () => {
    expect(generateOrderedPostfixExprs(['4', '3', '1'], ['+', '*'])).toEqual(['4 3 1 + *', '4 3 + 1 *']);
  });

  it('generate ordered postfix exprs with 4 numbers and 3 operators', () => {
    expect(generateOrderedPostfixExprs(['4', '3', '2', '1'], ['+', '*', '*'])).toEqual([
      '4 3 2 1 + * *',
      '4 3 2 + 1 * *',
      '4 3 2 + * 1 *',
      '4 3 + 2 1 * *',
      '4 3 + 2 * 1 *',
    ]);
  });

  it('generate ordered postfix exprs with 5 numbers and 4 operators', () => {
    expect(generateOrderedPostfixExprs(['5', '4', '3', '2', '1'], ['+', '*', '/', '-'])).toEqual([
      '5 4 3 2 1 + * / -',
      '5 4 3 2 + 1 * / -',
      '5 4 3 2 + * 1 / -',
      '5 4 3 2 + * / 1 -',
      '5 4 3 + 2 1 * / -',
      '5 4 3 + 2 * 1 / -',
      '5 4 3 + 2 * / 1 -',
      '5 4 3 + * 2 1 / -',
      '5 4 3 + * 2 / 1 -',
      '5 4 + 3 2 1 * / -',
      '5 4 + 3 2 * 1 / -',
      '5 4 + 3 2 * / 1 -',
      '5 4 + 3 * 2 1 / -',
      '5 4 + 3 * 2 / 1 -',
    ]);
  });
});
