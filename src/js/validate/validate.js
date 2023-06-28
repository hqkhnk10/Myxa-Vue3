export function required(value) {
  return value !== "" && value != null && value !== undefined;
}
export function maxLength(value,max) {
  if (!value) return false;
  return value.length <= max;
}
