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
  if (items.length === 1) {
    return [items];
  }
  let perms = [];
  // Get all permutations for numbers without including the first element
  let tail = permutations(items.slice(1));
  for (let i = 0; i < tail.length; i += 1) {
    const sub = tail[i];
    // Insert first number into every possible position of sub-permutation.
    for (let j = 0; j <= sub.length; j += 1) {
      const pre = sub.slice(0, j);
      const mid = items[0];
      const post = sub.slice(j);
      perms.push(pre.concat([mid], post));
    }
  }
  return perms;
};