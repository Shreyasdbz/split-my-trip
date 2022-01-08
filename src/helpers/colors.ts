/** @format */

import { tripColors } from "../styles/tripColors";

export function getTripColorById(id: number) {
  for (let c of tripColors) {
    if (c.id === id) {
      return c;
    }
  }
  return tripColors[0];
}
