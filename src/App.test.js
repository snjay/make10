import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {postFixToInfix} from '../src/app/utils/make10'
import {product} from '../src/app/utils/product'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
});

// Postfix to infix converter tests

it('converts (5 1 - ) -> 5-1 properly', () => {
  expect(postFixToInfix([5, 1, "-"])).toEqual('5-1')
});

it('converts (3 1 - 5 *) -> (3-1)×5 properly', () => {
  expect(postFixToInfix([3, 1, "-", 5, "*"])).toEqual('(3-1)×5')
});

it('converts (5 1 - 5 * 2 /) -> (5-1)×5/2 properly', () => {
  expect(postFixToInfix([5, 1, "-", 5, "*", 2, "/"])).toEqual('(5-1)×5/2')
});

// Product function tests

it('generates products of length 2 correctly', () => {
  expect(product(['+', '-'], 2)).toEqual(['++', '+-', '-+', '--'])
});

it('generates operator combinations correctly', () => {
  const operatorCombinations = [
    "+++",
    "++-",
    "++*",
    "++/",
    "+-+",
    "+--",
    "+-*",
    "+-/",
    "+*+",
    "+*-",
    "+**",
    "+*/",
    "+/+",
    "+/-",
    "+/*",
    "+//",
    "-++",
    "-+-",
    "-+*",
    "-+/",
    "--+",
    "---",
    "--*",
    "--/",
    "-*+",
    "-*-",
    "-**",
    "-*/",
    "-/+",
    "-/-",
    "-/*",
    "-//",
    "*++",
    "*+-",
    "*+*",
    "*+/",
    "*-+",
    "*--",
    "*-*",
    "*-/",
    "**+",
    "**-",
    "***",
    "**/",
    "*/+",
    "*/-",
    "*/*",
    "*//",
    "/++",
    "/+-",
    "/+*",
    "/+/",
    "/-+",
    "/--",
    "/-*",
    "/-/",
    "/*+",
    "/*-",
    "/**",
    "/*/",
    "//+",
    "//-",
    "//*",
    "///"
  ];
  expect(product(['+', '-', '*', '/'], 3)).toEqual(operatorCombinations);
});