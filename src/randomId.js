export function randomString() {
  return Math.random().toString(36).substr(2, 11);
}
let colour = [
  "#5D7F02",
  "#543BC9",
  "#83387D",
  "#7F71DE",
  "#4B953D",
  "#2E700D",
  "#30F581",
  "#6780D4",
  '#251F1C',
  '#4EF258',
  '#3D09A3',
];
export function randomColor(ch) {
  let i = ch.charCodeAt(0) % colour.length;
  return colour[i];
}
