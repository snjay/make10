# Make 10

Have you ever sat down on a train to have your friend poke you, point to the train's carriage number and ask, "Can you make 10?"

This project is a web app that tells you how to make 10, given the 4 numbers in your train's carriage.

In fact, it's extensible to act as a solver to find an arithmetic solution to any sequence of 4 numbers and a goal number.

For example,

```
Input: Numbers = [1, 2, 3, 4] and Goal = 10

Output: A list of solutions, one of them could be: (1x2x3)+4 = 10
```

## Demo

See: https://make10.sanjayn.com

## Installation & usage

```
$ npm install && npm start
```

## How it works

The main steps can be broken down into two main steps:

1. Generate all possible post-fix expressions involving the 4 numbers with the operations (+, –, x, ÷)
2. Evaluate each postfix operation by using standard stack operations and check if the result is equal to the goal

An additional constraint that I placed upon myself for this project was to implement all permutations and combinations library functions without using external mathematical libraries.

I initially wrote all the code in python using the wonderful itertools library but wanted to write a pure client-side web version of it so I didn't need to spin up a server.

Read more at: https://sanjayn.com/make-10/ for a fuller explanation with some code snippets explained.
