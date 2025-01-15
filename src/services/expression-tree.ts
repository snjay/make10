import { OPERATORS } from '../constants/operators';

interface Node {
  value: string;
  l?: Node;
  r?: Node;
}

export default class ExpressionTree {
  public root?: Node;

  constructor(postfixExpression: string) {
    const postfixExpr = postfixExpression.split(' ');
    const stack: Node[] = [];

    for (let i = 0; i < postfixExpr.length; i++) {
      const token = postfixExpr[i];
      if (isNumber(token)) {
        // is number
        stack.push({ value: token });
      } else if (isOperator(token)) {
        // is operator
        let item2 = stack.pop();
        let item1 = stack.pop();
        stack.push({ value: token, l: item1, r: item2 });
      } else {
        throw new Error(`Invalid char detected: '${token}' in postfix expression ${postfixExpr}`);
      }
    }

    this.root = stack.pop();
  }

  public eval = () => {
    let stack: string[] = [];
    const expr = this.postfix().split(' ');
    expr.forEach((tok: string) => {
      if (isOperator(tok)) {
        // is operator
        let operator = tok;
        // e.g. if operator = '-'
        //   stack = [4, 3]
        //   then, pops from top of stack (3 first)
        // i.e. stack.push(second-first) = stack.push(4-3);
        const item1 = stack.pop(); // would pop 3 first
        const item2 = stack.pop(); // would pop 4 second
        if (!item1 || !item2) return;
        const second = parseFloat(item1);
        const first = parseFloat(item2);
        switch (operator) {
          case '+':
            stack.push(`${first + second}`);
            break;
          case '-':
            stack.push(`${first - second}`);
            break;
          case '*':
            stack.push(`${first * second}`);
            break;
          case '/':
            stack.push(`${first / second}`);
            break;
          case '^':
            stack.push(`${Math.pow(first, second)}`);
            break;
          default:
            console.log('A problem has occurred.');
        }
      } else {
        // is number
        let number = parseInt(tok, 10);
        stack.push(`${number}`);
      }
    });
    return parseFloat(stack[0]);
  };

  public infix = ({ simplifiedBrackets } = { simplifiedBrackets: true }): string => {
    if (simplifiedBrackets) {
      return this.toInfixWithBracket(this.root);
    }
    return this.toInfix(this.root).replace(/^\(/, '').replace(/\)$/, '');
  };

  public postfix = (): string => {
    return this.toPostfix(this.root);
  };

  public tree = (): object | boolean => {
    return this.toTree(this.root);
  };

  private toPostfix = (node?: Node): string => {
    if (!node) {
      return '';
    } else if (isNumber(node.value)) {
      return `${node.value}`;
    } else if (isOperator(node.value)) {
      return `${this.toPostfix(node.l)} ${this.toPostfix(node.r)} ${node.value}`;
    }
    throw new Error('Should not reach here!');
  };

  private toInfix = (node?: Node): string => {
    if (!node) {
      return '';
    } else if (isNumber(node.value)) {
      return `${node.value}`;
    } else if (isOperator(node.value)) {
      return `(${this.toInfix(node.l)}${node.value}${this.toInfix(node.r)})`;
    }
    throw new Error('Should not reach here!');
  };

  private toInfixWithBracket = (node?: Node): string => {
    if (!node) {
      return '';
    } else if (isNumber(node.value)) {
      return `${node.value}`;
    } else if (isOperator(node.value)) {
      let l = this.toInfixWithBracket(node.l);
      let r = this.toInfixWithBracket(node.r);
      const cPrecedence = this.precedence(node.value);
      const lPrecedence = this.precedence(node.l?.value);
      const rPrecedence = this.precedence(node.r?.value);
      if (lPrecedence < cPrecedence) {
        l = `(${l})`;
      }
      if (cPrecedence > rPrecedence || (cPrecedence === rPrecedence && ['-', '/'].includes(node.value))) {
        r = `(${r})`;
      }
      return `${l}${node.value}${r}`;
    }
    throw new Error('Should not reach here!');
  };

  private precedence = (s?: string): number => {
    if (!s) {
      return 0;
    }
    if (isNumber(s)) {
      return 4;
    }
    switch (s) {
      case '+':
        return 1;
      case '-':
        return 1;
      case '*':
        return 2;
      case '/':
        return 2;
      case '^':
        return 3;
    }
    return 0;
  };

  private toTree = (node?: Node): object => {
    if (!node) {
      return {};
    } else if (isNumber(node.value)) {
      return {
        [node.value]: true,
      };
    } else if (isOperator(node.value)) {
      return {
        [node.value]: {
          ...this.toTree(node.l),
          ...this.toTree(node.r),
        },
      };
    }
    throw new Error('Should not reach here!');
  };
}

const isOperator = (s?: string) => {
  if (!s) {
    return false;
  }
  const operators: string[] = Object.values(OPERATORS).filter((value) => typeof value === 'string');
  return operators.includes(s);
};

const isNumber = (s?: string) => {
  if (!s) {
    return false;
  }
  return /[\d]/.test(s);
};

// console.log(new ExpressionTree(a).infix());
// console.log(new ExpressionTree(b).infix());
// console.log(new ExpressionTree(c).infix());

// console.log(Tree.from((new ExpressionTree(a)).tree()).render());
// console.log(Tree.from((new ExpressionTree(b)).tree()).render());
// console.log(Tree.from((new ExpressionTree(c)).tree()).render());

// console.log(new ExpressionTree('1 2 + 3 /').infix2());
// console.log(new ExpressionTree('1 2 / 3 + 4 -').infix2());
// console.log(new ExpressionTree('1 2 / 3 + 4 -').infix2());

// // ((1*2)*3)+4
// console.log(new ExpressionTree('1 2 3 - + 4 5 - 6 7 - 8 + / * ').infix2());