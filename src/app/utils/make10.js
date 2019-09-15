export const basicOperators = ["/", "*", "-", "+"];
export const advancedOperators = ["^"];
export const operators = [...advancedOperators, ...basicOperators];

export const evaluate = (expr) => {
  let stack = [];
  expr.forEach((tok) => {
    let token = parseInt(tok, 10);
    if (isNaN(token)) {
      // is operator
      let operator = tok;
      // e.g. expr = [4, 2, -]
      //     stack = [4] -> [4, 2] -> [4, 2, -]
      //     popped: -, then 2 ('first') and then 4 ('second')
      //     e.g. stack.push(second-first) = stack.push(4-2);
      let first = stack.pop();   // would pop 2 ('first')
      let second = stack.pop();  // would pop 4 ('second')
      switch (operator) {
        case "+":
          stack.push(second + first);
          break;
        case "-":
          stack.push(second - first);
          break;
        case "*":
          stack.push(second * first);
          break;
        case "/":
          stack.push(second / first);
          break;
        case "^":
          stack.push(Math.pow(second, first));
          break;
        // case "√":
        //   stack.push(Math.pow(second, 1 / first));
        //   break;
        default:
          console.log('A problem has occurred.');
      }
    } else {
      // is number
      stack.push(token);
    }
  });
  return stack[0];
};

export const formPostfixExpr = (numbers, operations) => {
  let expr = [numbers[0]];
  let rest = numbers.slice(1);
  rest.forEach((r, i) => {
    expr = expr.concat([r, operations[i]]);
  });
  return expr;
};

export const postFixToInfix = (postfixExpr) => {
  let stack = [];

  function precedence(c) {
    // if (c === '√') return 3;
    if (c === '^') return 3;
    if (c === '*') return 2;
    if (c === '/') return 2;
    if (c === '+') return 1;
    if (c === '–') return 1;
    return 0;
  }

  function rightPrecedence(c) {
    if (c === '+') return 1;
    if (c === '–') return 2;
    if (c === '*') return 3;
    if (c === '/') return 4;
    if (c === '^') return 5;
    // if (c === '√') return 6;
    return 0;
  }

  for (let i = 0; i < postfixExpr.length; i++) {
    let n = parseInt(postfixExpr[i], 10);
    if (isNaN(n)) {
      // is op
      let op = postfixExpr[i];
      // Pop the top 2 values from the stack.
      // Put the operator, with the values as arguments and form a string.
      // Encapsulate the resulted string with parenthesis.
      // Push the resulted string back to stack.
      if (stack.length < 2) return 'Invalid expression.';
      stack.push({op, r: stack.pop(), l: stack.pop()});
    } else {
      // is number
      stack.push(n);
    }
  }
  const printExpr = (x) => {
    if (!isNaN(x)) return x;
    let l = printExpr(x.l), r = printExpr(x.r);
    if (isNaN(l) && (precedence(x.l.op) < precedence(x.op) || (x.l.op === x.op && x.op === '^'))) {
      l = `(${l})`;
    }
    if (isNaN(r) && (rightPrecedence(x.r.op) <= rightPrecedence(x.op) || (x.l.op === x.op && (x.op === '-' || x.op === '/')))) {
      r = `(${r})`;
    }
    return `${l}${x.op}${r}`;
  };

  return printExpr(stack.pop()).replace(/\*/g, '×');
};


