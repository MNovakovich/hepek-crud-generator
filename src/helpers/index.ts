export function formatUpperCaseToUnderline(phrase: string) {
  const result = phrase.match(/[A-Z][a-z]+/g);
  if (result === null) return phrase;
  return result.join('_').toLowerCase();
}
