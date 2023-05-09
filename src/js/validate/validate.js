export function required(value) {
  return value !== '' && value != null && value !== undefined;
}