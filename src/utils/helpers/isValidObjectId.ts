export default function isValidObjectId(value: string) {
  return new RegExp("^[0-9a-fA-F]{24}$").test(value);
}
