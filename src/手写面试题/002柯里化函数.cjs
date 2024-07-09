console.log("====下面是终极函数科里化实现========");
function myadd(...args1) {
  //
  let args = args1;
  // console.log(args1, "args1==<");
  const Fn = (...args2) => {
    // console.log(args2, "args2==<");
    if (args2.length) {
      args.push(...args2);
      return Fn;
    } else {
      return args.reduce((pre, cur) => pre + cur, 0);
    }
  };
  return Fn;
}
function myadd2(...args1) {
  let arg1 = args1;
  const handle = () => arg1.reduce((pre, cur) => pre + cur, 0);
  const F = (...args2) => {
    if (args2.length) {
      arg1.push(...args2);
      return F;
    } else {
      return handle();
    }
  };
  return F;
}
console.log(myadd(2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)(), "myadd");
console.log(myadd2(2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)(), "myadd2");
