// product(items, r): Generates r-length combinations of items with
// repetition (akin to generating r-length cartesian products of the
// items array).
// -----------------------------------------------------------------
// e.g. items = ['a', 'b', 'c'], and r = 2 would generate 2-length
// combinations with repetitions would result in:
// ['aa', 'ab', 'ac',
//  'ba', 'bb', 'bc',
//  'ca', 'cb', 'cc']
export const product = (items: string[], r: number): string[] => {
  if (items.length === 0) return [];
  // Duplicate items array r times (as a placeholder)
  const placeholder = Array(r).fill(items);
  // Run through the placeholder r times and build up the
  // combinations by 1 item at at time.
  return placeholder.reduce((acc: string[], curr: string[]) => {
    return acc.flatMap((a) => {
      return curr.map((c) => a.concat(c));
    });
  });
};
