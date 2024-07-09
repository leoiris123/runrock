// function debounce(fn, delay) {
//   let timer = null;

//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// }

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
}
const debouncefn = (p1, p2) => {
  console.log("====实现防抖函数========");
  console.log("防抖成功", p1, p2);
};
const handleDebounce = debounce(debouncefn, 1000);
handleDebounce("参数1", "参数2");

// console.log("====下面实现截流函数========");
// const throttlefn = (p1, p2) => {
//   console.log("截流成功", p1, p2);
// };
// function throttleFn(fnthrottle, delay) {
//   let timer = null;
//   return function (...args) {
//     if (timer) {
//       return;
//     }
//     timer = setTimeout(() => {
//       fnthrottle(...args);
//       timer = null;
//     }, delay);
//   };
// }
// const handleThrottle = throttleFn(throttlefn, 1000);
// console.log("throttle", handleThrottle(1, 2));
