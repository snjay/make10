import { expect, describe, it } from 'vitest';
import ExpressionTree from './expression-tree';

describe('postfix to infix', () => {
  describe('2 number simple expressions', () => {
    it('handles addition with 2 num', () => {
      const expressionTree = new ExpressionTree('1 2 +');
      expect(expressionTree.infix()).toEqual('1+2');
    });

    it('handles subtraction with 2 nums', () => {
      const expressionTree = new ExpressionTree('1 2 -');
      expect(expressionTree.infix()).toEqual('1-2');
    });

    it('handles multiplication with 2 nums', () => {
      const expressionTree = new ExpressionTree('3 4 *');
      expect(expressionTree.infix()).toEqual('3*4');
    });

    it('handles division with 2 nums', () => {
      const expressionTree = new ExpressionTree('5 6 /');
      expect(expressionTree.infix()).toEqual('5/6');
    });
  });

  describe('3 number expressions', () => {
    it('handles addition', () => {
      const expressionTree = new ExpressionTree('1 2 + 3 +');
      expect(expressionTree.infix()).toEqual('1+2+3');
    });
  });

  describe('grouping with brackets', () => {
    it('groups a simple expression with brackets', () => {
      const expressionTree = new ExpressionTree('4 5 + 3 * 7 -');
      expect(expressionTree.infix()).toEqual('(4+5)*3-7');
    });

    it('groups a complex expression with brackets', () => {
      const expressionTree = new ExpressionTree('4 2 - 2 * 6 /');
      expect(expressionTree.infix()).toEqual('(4-2)*2/6');
    });
  });
});

describe('eval', () => {
  it('evaluate postfix expression correctly', () => {
    let expressions = [
      '1 2 + 3 + 4 +',
      '1 2 * 3 * 4 +',
      '1 2 + 4 + 3 +',
      '1 3 + 2 + 4 +',
      '1 3 * 2 * 4 +',
      '1 3 + 4 + 2 +',
      '1 3 * 4 * 2 -',
      '1 4 + 2 + 3 +',
      '1 4 * 2 3 * +',
      '1 4 + 3 + 2 +',
      '1 4 * 3 2 * +',
      '1 4 * 3 * 2 -',
      '2 1 + 3 + 4 +',
      '2 1 * 3 * 4 +',
      '2 1 / 3 * 4 +',
      '2 1 + 4 + 3 +',
      '2 3 + 1 + 4 +',
      '2 3 * 1 4 * +',
      '2 3 * 1 * 4 +',
      '2 3 * 1 / 4 +',
      '2 3 + 4 + 1 +',
      '2 3 * 4 1 * +',
      '2 3 * 4 1 / +',
      '2 4 + 1 + 3 +',
      '2 4 * 1 - 3 +',
      '2 4 + 3 + 1 +',
      '2 4 * 3 + 1 -',
      '3 1 + 2 + 4 +',
      '3 1 - 2 4 * +',
      '3 1 * 2 * 4 +',
      '3 1 / 2 * 4 +',
      '3 1 + 4 + 2 +',
      '3 1 - 4 2 * +',
      '3 1 * 4 * 2 -',
      '3 1 / 4 * 2 -',
      '3 2 + 1 + 4 +',
      '3 2 * 1 4 * +',
      '3 2 * 1 * 4 +',
      '3 2 * 1 / 4 +',
      '3 2 + 4 + 1 +',
      '3 2 4 * + 1 -',
      '3 2 * 4 1 * +',
      '3 2 * 4 1 / +',
      '3 4 + 1 + 2 +',
      '3 4 * 1 2 * -',
      '3 4 * 1 * 2 -',
      '3 4 * 1 / 2 -',
      '3 4 + 2 + 1 +',
      '3 4 2 * + 1 -',
      '3 4 * 2 1 * -',
      '3 4 * 2 1 / -',
      '4 1 + 2 + 3 +',
      '4 1 2 * 3 * +',
      '4 1 * 2 3 * +',
      '4 1 / 2 3 * +',
      '4 1 + 3 + 2 +',
      '4 1 3 * 2 * +',
      '4 1 * 3 2 * +',
      '4 1 * 3 * 2 -',
      '4 1 / 3 2 * +',
      '4 1 / 3 * 2 -',
      '4 2 + 1 + 3 +',
      '4 2 1 * 3 * +',
      '4 2 1 / 3 * +',
      '4 2 * 1 - 3 +',
      '4 2 + 3 + 1 +',
      '4 2 3 * 1 * +',
      '4 2 3 * 1 / +',
      '4 2 * 3 + 1 -',
      '4 3 + 1 + 2 +',
      '4 3 1 * 2 * +',
      '4 3 1 / 2 * +',
      '4 3 * 1 2 * -',
      '4 3 * 1 * 2 -',
      '4 3 * 1 / 2 -',
      '4 3 + 2 + 1 +',
      '4 3 2 * 1 * +',
      '4 3 2 * 1 / +',
      '4 3 * 2 1 * -',
      '4 3 * 2 1 / -',
    ];
    expressions.forEach((expr) => {
      const et = new ExpressionTree(expr);
      expect(et.eval()).toEqual(10);
    });
  });
});

describe('postfix', () => {
  it('returns same simple postfix expression', () => {
    const expressionTree = new ExpressionTree('5 6 /');
    expect(expressionTree.postfix()).toEqual('5 6 /');
  });

  it('returns complex postfix expression', () => {
    const expressionTree = new ExpressionTree('7 1 - 5 * 4 /');
    expect(expressionTree.postfix()).toEqual('7 1 - 5 * 4 /');
  });
});
