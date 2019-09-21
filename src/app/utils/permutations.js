// permutations(items): generates all possible permutations without
// repetition of the items list in lexicographical order.
// ---------------------------------------------------------------------------------
// e.g. items = ['a', 'b', 'c'] would generate all possible permutations
// of the items list starting from ['a', 'b', 'c'] -> ['c', 'b', 'a'] resulting in:
// [['a', 'b', 'c'],
//  ['b', 'a', 'c'],
//  ['b', 'c', 'a'],
//  ['a', 'c', 'b'],
//  ['c', 'a', 'b'],
//  ['c', 'b', 'a']]
// ---------------------------------------------------------------------------------
// Adapted from: Steinhaus-Johnson-Trotter algorithm
// https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm
export const permutations = (items) => {
  // Base case: If there is a single item,
  // return the item inside of a list so it
  // can be later concatenated in General case.
  if (items.length === 1) return [items];
  // General case: Recursively call permutations
  // for items list without the last item.
  let tail = permutations(items.slice(1));
  let perms = [];
  tail.forEach(sub => {
    // Then, insert first number into every
    // possible position of 'sub'-permutation.
    sub.forEach((_, j) => {
      const pre = sub.slice(0, j);
      const mid = items[0];
      const post = sub.slice(j);
      // Push each permutation = arranging [pre, mid, post]
      perms.push(pre.concat([mid], post));
    })
  });
  return perms;
};