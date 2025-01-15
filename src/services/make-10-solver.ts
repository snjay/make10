import { product } from '../utils/product';
import { permutations } from '../utils/permutations';
import { generateOrderedPostfixExprs } from '../utils/generate-postfix-expressions';
import ExpressionTree from './expression-tree';

export default class Make10Solver {
  constructor(
    private readonly numbers: string[],
    private readonly goal: number,
    private readonly operators: string[],
  ) {}

  getSolutions = (): string[] => {
    const solutions = this.buildAllPossiblePostfixExprs()
      .map((expression) => new ExpressionTree(expression))
      .filter((expression) => expression.eval() === this.goal)
      .map((expression) =>
        expression.infix({
          simplifiedBrackets: true,
        }),
      );

    return [...new Set(solutions)];
  };

  private buildAllPossiblePostfixExprs = () => {
    const { numbers, operators } = this;
    const numberPermutations = permutations(numbers);
    const operatorCombinations = product(operators, numbers.length - 1);

    return numberPermutations.flatMap((nums) =>
      operatorCombinations.flatMap((operators) => generateOrderedPostfixExprs(nums, operators.split(''))),
    );
  };
}
