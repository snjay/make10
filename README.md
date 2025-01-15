# Make 10

Have you ever sat down on a train to have your friend poke you, point to the train's carriage number and ask, "Can you make 10?"

This project is a web app that shows you how to make 10, given the 4 numbers in your train's carriage.

For example,

```plain
Input: Numbers = [1, 2, 3, 4] and Goal = 10

Output: A list of solutions, one of them being: (1x2x3)+4 = 10
```

## Demo

See: [https://make10.sanjayn.com](https://make10.sanjayn.com)

## Installation & usage

```bash
$ npm install && npm start
```

## How it works

The main steps can be broken down into two main steps:

1. Generate all possible post-fix expressions involving the 4 numbers with the operations (+, –, x, ÷).
2. Evaluate each postfix operation by using standard stack operations and check if the result is equal to the goal.

An additional constraint that I placed upon myself for this project was to implement all permutations, combinations and evaluating lib functions without external mathematical libraries.

Read more at: [https://sanjayn.com/make10/](https://sanjayn.com/make10/) for further details.
