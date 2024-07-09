function obj222(age, sex) {
  this.name = age;
  this.id = sex;
}

function mynew(baseobj, ...args) {
  if (typeof baseobj !== "function") {
    throw new TypeError("error");
  }
  let obj = {}; // 创建一个空对象，该对象的原型为构造函数的原型对象
  obj.__proto__ = baseobj.prototype;
  let res = baseobj.apply(obj, args); // 将构造函数的 this 绑定到该空对象上，执行构造函数的代码
  return res instanceof Object ? res : obj;
}
function mynew2(baseobj, ...args) {
  if (typeof baseobj !== "function") {
    throw new TypeError("error");
  }
  let obj = Object.create(baseobj.prototype);
  let res = baseobj.apply(obj, args);
  return res instanceof Object ? res : obj;
}
let t_obj = mynew2(obj222, "leijijun", 19);
console.log(t_obj);
// function myNew(Constructor, ...args) {
//   // 创建一个空对象，该对象的原型为构造函数的原型对象
//   var obj = Object.create(Constructor.prototype);
//   // 将构造函数的 this 绑定到该空对象上，执行构造函数的代码
//   var result = Constructor.apply(obj, args);
//   // 如果构造函数有显式返回一个对象，则返回该对象，否则返回空对象
//   return typeof result === "object" && result !== null ? result : obj;
// }
