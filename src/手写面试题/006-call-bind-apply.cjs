Function.prototype.myCall = function (context, ...args) {
  console.log(this); // this -> obj.say
  context = context ? context : window;
  context.fn = this;
  console.log(args, "args------==>>>>");
  context.fn(...args);
  delete context.fn;
};
let o = { sing: "sing" };
// 如何将this指向o呢？
let obj = {
  name: "刘德华",
  say: function () {
    console.log(this); // this -> o
  },
};
obj.say.myCall(o, o.sing, 1, 2, 3);

// apply 除了入参不同，其他和 call 没什么区别
// Function.prototype.myApply = function (context, args) {
//     context = context ? context : window;
//     context.fn = this;
//     if (!args) {
//       context.fn();
//     } else if (Array.isArray(args)) {
//       context.fn(...args);
//     } else {
//       return TypeError("args is not a Array");
//     }
//     delete context.fn;
//   };
//   let o = { sing: "sing" };
//   // 如何将this指向o呢？
//   let obj = {
//     name: "刘德华",
//     say: function (...args) {
//       console.log(args);
//       console.log(this); // this -> o
//     },
//   };
//   obj.say.myApply(o, [o.sing, 1, 2, 3]);

//my_bind方法不仅可以绑定对象，还可以传参
// Function.prototype.my_bind = function (context) {
//   var args = Array.prototype.slice.call(arguments, 1);
//   //args [7, 8]
//   var self = this;
//   return function () {
//     var innerArgs = Array.prototype.slice.call(arguments);
//     //innerArgs [9]
//     var finalArgs = args.concat(innerArgs);
//     //finalArgs [7, 8, 9]
//     return self.apply(context, finalArgs);
//   };
// };
Function.prototype.my_bind = function (context, ...args) {
  var self = this;
  return function F(...innerArgs) {
    return self.apply(
      this instanceof F ? this : context,
      args.concat(innerArgs)
    );
  };
};

//测试
function a(m, n, o) {
  return this.name + " " + m + " " + n + " " + o;
}
var b = { name: "kong" };
console.log(a.my_bind(b, 7, 8)(9)); //kong 7 8 9
