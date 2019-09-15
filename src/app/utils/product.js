// product(items, r): Generates r-length combinations of items with
// repetition (akin to generating r-length cartesian products of the
// items array)
export const product = (items, r) => {
  // Duplicate items array r times (use it as a placeholder)
  let placeholder = Array(r).fill(items);
  // Run through the placeholder r times and build up the combinations
  // by 1 item at at time.
  return placeholder.reduce((acc, curr) => {
    // For every accumulated item,
    return acc.flatMap(a => {
      // Tack on each of the items to the end of each accumulated item
      return curr.map(c => a.concat(c))
    });
  });
};
