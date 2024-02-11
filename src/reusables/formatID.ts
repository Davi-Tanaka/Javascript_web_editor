export function formatID(str: string) {
  const finalValue = str.trim().toLowerCase().replace(/\s+/g, "-");
  return finalValue;
};