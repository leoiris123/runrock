console.log("====下面是多维数组打平的实现========");

let needFlatten = [
  1,
  2,
  [3, 4, [5, 6, 7]],
  8,
  9,
  [10, 11, 12, [13, 14, 15, [16, 17, 18, 19]]],
];
function myFlatten(arr) {
  return arr.reduce((result, cur) => {
    if (Array.isArray(cur)) {
      return result.concat(myFlatten(cur));
    } else {
      return result.concat(cur);
    }
  }, []);
}
function myFlatten2(arr) {
  // return arr.flat(Infinity);
  return arr.reduce((result, cur) => {
    if (Array.isArray(cur)) {
      return result.concat(myFlatten2(cur));
    } else {
      return result.concat(cur);
    }
  }, []);
}

console.log(myFlatten(needFlatten), "myFlatten");
console.log(myFlatten2(needFlatten), "myFlatten2");
