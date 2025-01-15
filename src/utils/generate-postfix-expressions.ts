export const generateOrderedPostfixExprs = (numbers: string[], operators: string[]) => {
  const results: string[] = [];

  const backtrack = (
    numbersAvailable: string[],
    operatorsAvailable: string[],
    expression: string[],
    numCount: number,
    opCount: number,
  ) => {
    // base case: if no numbers or operators to add, record expression
    if (numbersAvailable.length === 0 && operatorsAvailable.length === 0) {
      if (numCount === opCount + 1) {
        results.push(expression.join(' '));
      }
    }

    // if num available, add to expression
    if (numbersAvailable.length > 0) {
      const num = numbersAvailable[0];
      backtrack(numbersAvailable.slice(1), operatorsAvailable, [...expression, `${num}`], numCount + 1, opCount);
    }

    // if operator availabe, add to expression
    if (operatorsAvailable.length > 0 && numCount > opCount + 1) {
      const op = operatorsAvailable[0];
      backtrack(numbersAvailable, operatorsAvailable.slice(1), [...expression, `${op}`], numCount, opCount + 1);
    }
  };

  backtrack(numbers, operators, [], 0, 0);
  return results;
};
