export const stringX = (index, stringSpacing) => {
  return index * stringSpacing + 500;
};

export const stringY = (index, scale) => {
  return 600 - index * scale;
};

export function getQBezierValue(t, p1, p2, p3) {
  var iT = 1 - t;
  return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}
