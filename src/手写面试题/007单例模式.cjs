console.log("====下面实现工厂模式实现单例========");

function singletonFn(val) {
  this.name = "singletonFn" + val;
}

const singletonFnFactory = (function () {
  let instance = null;
  return {
    create: function (name) {
      if (!instance) {
        instance = new singletonFn(name);
      }
      return instance;
    },
  };
})();
let a = singletonFnFactory.create("张三");
let b = singletonFnFactory.create("李四");
console.log(a.name, b.name, a == b, "singletonFnFactory");

console.log("====下面实现闭包单例模式========");
// 单例设计模式的实现：闭包
let Singleton = function (name) {
  this.name = name;
};
Singleton.prototype.getName = function () {
  return this.name;
};
Singleton.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

let instance1 = Singleton.getInstance("why");
let instance2 = Singleton.getInstance("www");
console.log(instance1 === instance2); // 输出true

console.log("====下面实现代理单例模式========");
// export function singleton(className) {
//   let ins;
//   // 通过代理，解决不能往原型追加方法问题
//   return new Proxy(className, {
//     construct(target, args) {
//       if (!ins) {
//         ins = new target(...args);
//       }
//       return ins;
//     },
//   });
// }

// class Notice {}
// export default singleton(Notice);
// const notice = new Notice();
