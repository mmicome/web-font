//MDN
if (!Object.is) {
  Object.is = function(x, y) {
    if (x === y) {
      // +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // NaN == NaN
      return x !== x && y !== y;
    }
  };
}
