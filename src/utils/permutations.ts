// permutations(items): generates all possible permutations without repetition.
// ----------------------------------------------------------------------------
// e.g. items = [1, 2, 3] would generate all possible permutations
// of the items list starting from [1, 2, 3] -> [3, 2, 1] resulting in:
// [[1, 2, 3],
//  [2, 1, 3],
//  [2, 3, 1],
//  [1, 3, 2],
//  [3, 1, 2],
//  [3, 2, 1]]
// ----------------------------------------------------------------------------
// Adapter from Heap's algorithm
// https://en.wikipedia.org/wiki/Heap%27s_algorithm

export const permutations = (array: string[]) => {
  const results: string[][] = [];

  const swap = (arr: string[], i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const generate = (n: number, items: string[]) => {
    if (n == 0) return;
    if (n === 1) {
      results.push([...items]);
      return;
    }
    generate(n - 1, items);
    for (let i = 0; i < n - 1; i++) {
      const x = n % 2 == 0 ? i : 0;
      const y = n - 1;
      swap(items, x, y);
      generate(n - 1, items);
    }
  };

  generate(array.length, [...array]);
  return results;
};
