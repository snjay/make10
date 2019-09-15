// Steinhaus-Johnson-Trotter algorithm
// https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm
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