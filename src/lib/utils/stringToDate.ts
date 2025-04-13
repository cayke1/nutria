export function stringToDate(dataStr: string) {
  const [day, month, year] = dataStr.split("/").map(Number);

  return new Date(year, month - 1, day);
}
