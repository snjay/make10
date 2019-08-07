export const basicOperators = ["÷", "×", "–", "+"];
export const advancedOperators = ["√", "^"];
export const operators = [...advancedOperators, ...basicOperators];

export const evaluate = (expr) => {
  let stack = [];
  for (let i = 0; i < expr.length; i++) {
    let n = parseInt(expr[i], 10);
    if (isNaN(n)) {
      // is operator
      let operator = expr[i];
      // e.g. expr = [4, 2, -]
      //     stack = [4] -> [4, 2] -> [4, 2, -]
      //     popped: -, then (first) 2 and then 4 (second)
      //     stack.push(second - first) = stack.push(4-2);
      let first = stack.pop();  // would pop 4
      let second = stack.pop();  // would pop 2
      switch (operator) {
        case "+":
          stack.push(second + first);
          break;
        case "–":
          stack.push(second - first);
          break;
        case "×":
          stack.push(second * first);
          break;
        case "÷":
          stack.push(second / first);
          break;
        case "^":
          stack.push(Math.pow(second, first));
          break;
        case "√":
          stack.push(Math.pow(second, 1 / first));
          break;
        default:
          console.log('A problem has occurred.');
      }
    } else {
      stack.push(n);
    }
  }
  return stack[0];
};

export const postFix = (numbers, operations) => {
  // todo: make sure lengths are valid
  let expr = [numbers[0]];
  let rest = numbers.slice(1);
  rest.forEach((r, i) => {
    expr = expr.concat([r, operations[i]]);
  });
  return expr;
};

export const postFixToInfix = (postfixExpr) => {
  let stack = [];
  let precedence = {};
  let allOperators = [""].concat(operators);
  allOperators.forEach((o, i) => {
    precedence[o] = allOperators.length - i;
  });
  // todo: minimise parenthesis https://www.mathblog.dk/tools/infix-postfix-converter/
  for (let i = 0; i < postfixExpr.length; i++) {
    let n = parseInt(postfixExpr[i], 10);
    if (isNaN(n)) {
      // is operator
      let operator = postfixExpr[i];
      // beware of ordering: order of pop() is important.
      let right = stack.pop();
      let left = stack.pop();
      // if (precedence[operator]) {
      if (precedence[left.operator] < precedence[operator]) {
        left.expr = `(${left.expr})`
      }
      if (precedence[right.operator] < precedence[operator]) {
        right.expr = `(${right.expr})`
      }
      // }
      // todo: old
      // if (operator === "×" || operator === "÷" || operator === "^") {
      //   if (left.operator === "+" || left.operator === "–") {
      //     left.expr = `(${left.expr})`
      //   }
      //   if (right.operator === "+" || right.operator === "–" || right.operator === "^") {
      //     right.expr = `(${right.expr})`
      //   }
      // }
      stack.push({expr: `${left.expr}${operator}${right.expr}`, operator});
    } else {
      // is number
      stack.push({expr: n, operator: ""});
    }
  }
  return stack[0].expr;
};

export const operationsCombinations = (ops, r) => {
  return Array(r).fill(ops).reduce((a, b) =>
    a.map(x => b.map(y => x.concat(y))).reduce((a, b) => a.concat(b)));
};

export const permutations = (numbers) => {
  if (numbers.length === 1) {
    return [numbers];
  }
  let perms = [];
  // Get all permutations for numbers without including the first element
  let tail = permutations(numbers.slice(1));
  for (let i = 0; i < tail.length; i += 1) {
    const sub = tail[i];
    // Insert first number into every possible position of sub-permutation.
    for (let j = 0; j <= sub.length; j += 1) {
      const pre = sub.slice(0, j);
      const mid = numbers[0];
      const post = sub.slice(j);
      perms.push(pre.concat([mid], post));
    }
  }
  return perms;
};
