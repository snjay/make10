// export const BASIC_OPERATORS = ["/", "*", "-", "+"];

export enum OPERATORS {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '/',
  // exponent = '^',
}

export const humanReadableSign = (s: string): string => {
  const mapping: Record<string, string> = {
    '-': '–',
    '*': '×',
    '/': '÷',
  };
  return mapping[s] || s;
};
