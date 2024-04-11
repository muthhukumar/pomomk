import { v4 as uuidv4 } from "uuid";

export function addLeadingZero(number: number) {
  return number < 10 ? `0${number}` : number.toString();
}

export function generateUUID() {
  return uuidv4();
}
