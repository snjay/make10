import { expect, describe, test } from 'vitest';
import Make10Solver from './make-10-solver';

describe('make 10 solver', () => {
  describe('single operator', () => {
    test('+ operator with 2 numbers', () => {
      const solutions = new Make10Solver(['1', '2'], 3, ['+']).getSolutions();
      expect(solutions.sort()).toEqual(['1+2', '2+1']);
    });

    test('- operator with 2 numbers', () => {
      const solutions = new Make10Solver(['1', '4'], 3, ['-']).getSolutions();
      expect(solutions.sort()).toEqual(['4-1']);
    });

    test('* operator with 3 numbers', () => {
      const solutions = new Make10Solver(['1', '2', '3'], 6, ['*']).getSolutions();
      expect(solutions.sort()).toEqual(['1*2*3', '1*3*2', '2*1*3', '2*3*1', '3*1*2', '3*2*1']);
    });

    test('/ operator with 4 numbers', () => {
      const solutions = new Make10Solver(['8', '8', '1', '1'], 1, ['/']).getSolutions();
      expect(solutions.sort()).toEqual([
        '1/(1/(8/8))',
        '1/(1/8)/8',
        '1/(8/(8/1))',
        '1/(8/1/8)',
        '1/(8/8)/1',
        '1/(8/8/1)',
        '1/1/(8/8)',
        '1/8/(1/8)',
        '8/(1/(1/8))',
        '8/(1/1)/8',
        '8/(8/(1/1))',
        '8/(8/1)/1',
        '8/(8/1/1)',
        '8/1/(8/1)',
        '8/1/1/8',
        '8/1/8/1',
        '8/8/(1/1)',
        '8/8/1/1',
      ]);
    });
  });

  describe('2 operators', () => {
    test('+ and -', () => {
      const solutions = new Make10Solver(['6', '3'], 9, ['+', '-']).getSolutions();
      expect(solutions.sort()).toEqual(['3+6', '6+3']);
    });

    test('* and /', () => {
      const solutions = new Make10Solver(['6', '3', '7'], 14, ['*', '/']).getSolutions();
      expect(solutions.sort()).toEqual(['6*7/3', '6/(3/7)', '6/3*7', '7*6/3', '7/(3/6)', '7/3*6']);
    });

    test('+ and /', () => {
      const solutions = new Make10Solver(['6', '3', '1', '2'], 10, ['+', '/']).getSolutions();
      expect(solutions.sort()).toEqual(['1+3/(2/6)', '1+6/(2/3)', '3/(2/6)+1', '6/(2/3)+1']);
    });
  });

  describe('3 operators', () => {
    test('+, -, *', () => {
      const solutions = new Make10Solver(['7', '3', '5', '2'], 10, ['+', '/', '*']).getSolutions();
      expect(solutions.sort()).toEqual(['(3+7)/2+5', '(7+3)/2+5', '5+(3+7)/2', '5+(7+3)/2']);
    });

    test('-, /, *', () => {
      const solutions = new Make10Solver(['7', '3', '5', '2'], 11, ['-', '/', '*']).getSolutions();
      expect(solutions.sort()).toEqual([
        '(5*7-2)/3',
        '(7*5-2)/3',
        '2-(3-5-7)',
        '2-(3-7-5)',
        '3*7-2*5',
        '3*7-5*2',
        '5-(3-2-7)',
        '5-(3-7-2)',
        '7*3-2*5',
        '7*3-5*2',
        '7-(3-2-5)',
        '7-(3-5)*2',
        '7-(3-5-2)',
        '7-2*(3-5)',
      ]);
    });
  });

  test('1,2,3,4 and goal = 10', () => {
    const solutions = new Make10Solver(['1', '2', '3', '4'], 10, ['+', '-', '*', '/']).getSolutions();

    expect(solutions.length).toEqual(120);
  });
});
