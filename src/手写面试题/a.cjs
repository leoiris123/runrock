/*
 * @Author: ST-leijijun oulei684@gmail.com
 * @Date: 2024-05-23 12:28:46
 * @LastEditors: ST-leijijun oulei684@gmail.com
 * @LastEditTime: 2024-05-27 04:25:24
 * @FilePath: / demo-react/1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: ST-leijijun oulei684@gmail.com
 * @Date: 2024-05-23 12:28:46
 * @LastEditors: ST-leijijun oulei684@gmail.com
 * @LastEditTime: 2024-05-24 04:49:48
 * @FilePath: / demo-react/my-react-exam/src/pages/admin_manage/1.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
Function.prototype.mybind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  const args = [...arguments].slice(1),
    fn = this;
  //   console.log(arguments, "aaa==<");
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? new fn(...arguments) : context,
      //   console.log(arguments, "1==<"),
      args.concat(...arguments)
    );
  };
};

Function.prototype.mybind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  let fn = this;

  return function Fn(...args2) {
    return fn.apply(
      this instanceof Fn ? new fn(...args) : context,
      args.concat(...args2)
    );
  };
};

function obj222(age, sex) {
  this.name = age;
  this.id = sex;
}
let obj = {
  name: "leijijun",
  age: 18,
};
let fn_bind = function (age, sex, aaa) {
  console.log(this.name, this.id, age, sex, aaa);
};

let newFn = fn_bind.mybind(obj, 18);
newFn("男", "parms");

function mynew(baseobj, ...args) {
  if (typeof baseobj !== "function") {
    throw new TypeError("error");
  }
  let obj = {};
  obj.__proto__ = baseobj.prototype;
  let res = baseobj.apply(obj, args);
  return res instanceof Object ? res : obj;
}
let t_obj = mynew(obj222, "leijijun", 19);
console.log(t_obj, "====");
function sum(a, b) {
  return a + b;
}

function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    return fn.apply(null, finalArgs);
  };
}
// 刚开始不传入参数，之后一次传入
var currySum = curry(sum);
console.log(currySum(2, 3));
// 刚开始传入一个参数，之后传入剩下参数
currySum = curry(sum, 2);
console.log(currySum(3));
// 刚开始传入所有参数，之后不传参数
currySum = curry(sum, 2, 3);
console.log(currySum());

function curry1(fn) {
  return function curriedFunction(...args) {
    // 创建一个新的参数数组，包含原始参数和当前传入的参数
    const newArgs = args.concat(Array.prototype.slice.call(arguments));
    // 如果新的参数数组长度小于原函数所需参数数量，则递归调用curry函数
    // 否则，调用原函数并应用所有参数
    if (newArgs.length < fn.length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}

// 演示柯里化函数的使用
const sum2 = (a, b) => a + b;
const Sum1 = curry1(sum2);
console.log(Sum1, "Sum1"); // 输出 3

console.log("======下面是柯里化函数的实现======");

// const currykeli = (...args1) => {
//   let parms = args1;
//   console.log(args1, "args1==<");
//   const addfn = (...args2) => {
//     parms = parms.concat(args2);
//     console.log(parms, "parms==<");
//     return addfn;
//   };

//   addfn.valueOf = () => {
//     return parms.reduce((a, b) => a + b, 0);
//   };

//   return addfn;
// };
// const currykeli = (...args1) => {
//   let parms = args1;
//   console.log(args1, "args1==<");
//   const addfn = (...args2) => {
//     parms = parms.concat(args2);
//     console.log(parms, "parms==<");
//     return parms.reduce((a, b) => a + b, 0);
//   };

//   // addfn.valueOf = () => {
//   //   return parms.reduce((a, b) => a + b, 0);
//   // };

//   return addfn;
// };
// console.log(currykeli(1)(2), "curry(1)(2)(3)+1;");

// console.log(currykeli(1)(2)(3)(4) + 1, "curry(1)(2)(3)+1;");
// console.log(currykeli(1)(2)(3).valueOf(), "curry(1)(2)(3);");
// console.log(currykeli(1, 2)(3).valueOf(), "curry(1, 2)(3);");
// console.log(currykeli(1, 2, 3).valueOf(), "curry(1, 2, 3);");
// console.log(currykeli("1", 2, 3).valueOf(), "curry('1', 2, 3);");
// console.log(currykeli("1", 2, 3) + "222", "curry('1', 2, 3);");

// function add() {
//   // 用来缓存所有的arguments值
//   let args = [].slice.call(arguments);
//   // 新建currying函数实现柯里化
//   let currying = function () {
//     // 如果参数为空，那么递归停止，返回执行结果
//     if (arguments.length === 0) {
//       return args.reduce((a, b) => a + b);
//     } else {
//       // 否则将参数保存到args里面，返回currying方法
//       args.push(...arguments);
//       return currying;
//     }
//   };
//   return currying;
// }

// console.log(add(2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)());

// 上面有需要注意的一点，因为currying函数里面使用arguments，所以currying不能使用箭头函数，箭头函数内部的arguments的用法与箭头函数内部的this差不多，它取的是上一级函数的arguments值。如果想用箭头函数，currying函数可以这样改动：

function add() {
  // 用来缓存所有的arguments值
  let args = [].slice.call(arguments);
  // 新建currying函数实现柯里化

  let currying = (...rest) => {
    // console.log(rest, "rest");
    // 如果参数为空，那么递归停止，返回执行结果
    if (rest.length === 0) {
      return args.reduce((a, b) => a + b);
    } else {
      // 否则将参数保存到args里面，返回currying方法
      args.push(...rest);
      return currying;
    }
  };
  return currying;
}
console.log(add(2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)(), "add");
//
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
console.log(myadd(2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)(), "myadd");

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

console.log(myFlatten(needFlatten), "myFlatten");

console.log("====下面是数组打乱的实现========");

function shuffleArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(shuffleArray(myArray), "myshuffleArray");

console.log("====下面是深度克隆的实现========");
const deepcloneobj = {
  name: "张三",
  setname: new Set([123, 456, 789]),
  mapname: new Map([
    ["a", 1],
    ["b", 2],
  ]),
  a: 1,
  b: 2,
  d: [
    1,
    2,
    3,
    {
      c: "cccc",
      d: "ddd",
    },
  ],
};

function deepclone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let copyobj;
  if (Array.isArray(obj)) {
    copyobj = [];
    for (let i = 0; i < obj.length; i++) {
      copyobj[i] = deepclone(obj[i]);
    }
  } else if (obj instanceof Set) {
    copyobj = new Set([...obj]);
  } else if (obj instanceof Map) {
    copyobj = new Map([...obj]);
  } else {
    copyobj = {};
    Reflect.ownKeys(obj).forEach((key) => {
      copyobj[key] = deepclone(obj[key]);
    });
  }
  return copyobj;
}
console.log(deepclone(deepcloneobj), "deepcloneobj");
// for in
// Object.keys、Object.values()、Object.entries()
// Object.getOwnPropertyNames()
// for of
// Reflect.ownKeys()它们在使用场景方面各有不同。 返回自有的可枚举不可枚举属性包括symbol属性

console.log("====下面是字符串反转========");

function toReverse(arr) {
  if (typeof arr !== "string" && !(arr instanceof Array)) {
    return false;
  }

  return Array.from(arr).reduce((pre, cur) => {
    return [cur, ...pre];
  }, []);
}

console.log(toReverse([1, 2, 3, 4]), "toReverse");

console.log("====下面实现防抖函数========");

function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const debouncefn = (p1, p2) => {
  console.log("防抖成功", p1, p2);
};
// const handleDebounce = debounce(debouncefn, 1000);
// console.log("debounce", handleDebounce(1, 2));
// console.log("====下面实现截流函数========");
const throttlefn = (p1, p2) => {
  console.log("截流成功", p1, p2);
};
function throttleFn(fnthrottle, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fnthrottle(...args);
      timer = null;
    }, delay);
  };
}
// const handleThrottle = throttleFn(throttlefn, 1000);
// console.log("throttle", handleThrottle(1, 2));
//

console.log("====下面实现上传功能========");
const urls = [
  "url_1",
  "url_2",
  "url_3",
  "url_4",
  "url_5",
  "url_6",
  "url_7",
  "url_8",
  "url_9",
  "url_10",
];

// 模拟上传
function myUpload(url, callback) {
  return new Promise((resolve, reject) => {
    console.log("开始上传", url);
    setTimeout(() => {
      resolve(url);
      console.log("上传成功", url);
    }, 1000 * Math.random());
  });
}

function warpUpload(imagelist, maxNum) {
  const requestMap = {};
  imagelist.forEach((url, index) => {
    requestMap[url] = false;
  });
  let index = 0;
  return new Promise((resolve, reject) => {
    const toUp = () => {
      if (index >= imagelist.length) {
        if (!Object.keys(requestMap).find((key) => requestMap[key] === false)) {
          resolve(requestMap);
        }
        return;
      }
      const url = imagelist[index];
      myUpload(url).then((res) => {
        requestMap[url] = true;

        setTimeout(() => {
          toUp();
        }, 100);
      });
      index++;
    };

    while (index < maxNum) {
      toUp();
    }
  });
}

async function toupload() {
  const result = await warpUpload(urls, 3);
  console.log(result);
}

// toupload();

console.log("====下面实现once函数========");

function once(fn) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    return fn(...args);
  };
}
function doSomeOnce() {
  console.log("doSomeOnce");
}

const handleOnce = once(doSomeOnce);
handleOnce();
handleOnce();

console.log("====下面实现私有变量========");
const privateKey = Symbol("privateKey");
class Persion {
  constructor(name) {
    this[privateKey] = name;
  }
  getName() {
    return this[privateKey];
  }
  setname(name) {
    this[privateKey] = name;
  }
}

let persion = new Persion("张三");
console.log(persion.getName(), "zhangsan");
persion.setname("李四");
console.log(persion.getName(), "getname-lisi");
console.log(persion[privateKey], "privarekey");

console.log("====下面XML实现ajax请求========");

let request = require("xmlhttprequest").XMLHttpRequest;

function ajax(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new request();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText);
        }
      }
    };
    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}
// ajax("http://127.0.0.1:4523/m2/3113714-1053914-default/177752325", "get", {
//   name: "张三",
//   age: 18,
// }).then((res) => {
//   console.log(res);
// });
console.log("====下面实现响应式数据，依赖收集========");

// 定义一个Father类
// class Father {
//   // 定义一个私有变量wrap，用于存放"wrap"
//   wrap = "wrap";
//   _lala = "_lala";
//   // 定义一个静态变量laugh，用于存放"laugh"
//   static laugh = "laugh";
//   // 构造函数
//   constructor() {
//     // 定义一个私有变量data，用于存放"father"
//     this.data = "father";
//     // 定义一个私有变量child，用于存放"father_child"
//     this.child = "father_child";
//   }
//   // 静态方法getFather，用于打印"father"
//   static getFather() {
//     console.log("father");
//   }
// }
// class Son extends Father {
//   constructor(info, el) {
//     super();

//     this.el = el;
//   }
//   render(data) {
//     console.log("rendered");
//   }
// }

class Component {
  _data = { name: "空" };
  pending = false;
  constructor(data) {
    this.data = new Proxy(this._data, {
      set: (target, key, value) => {
        console.log(target, key, value, "target, key, value");
        console.log(this._data, this.data, "_data, this.data");
        this._data[key] = value;
        if (!this.pending) {
          this.pending = true;
          Promise.resolve().then(() => {
            this.pending = false;
            this.render();
          });
        }
      },
    });
  }

  render() {
    console.log(`render-name,${this.data.name}`);
  }
}

const com = new Component();

// com.data.name = "张三";
// com.data.name = "李四";
// com.data.name = "王五";
// setTimeout(() => {
//   com.data.name = "leijijun";
// }, 10);

console.log("====下面实现instanceof方法========");
function myInstanceof(obj, construct) {
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }

  let pro = Object.getPrototypeOf(obj);
  while (pro !== null) {
    if (pro === construct.prototype) {
      return true;
    }
    pro = Object.getPrototypeOf(pro);
  }
  return false;
}
class A {}
class B extends A {}
class C extends B {}
let _obj_ins = new C();
console.log(myInstanceof(_obj_ins, A), "obj_ins instanceof A???");

console.log("====下面实现青蛙跳台阶========");

function jump_1(n) {
  if (n <= 3) return n;

  return jump_1(n - 1) + jump_1(n - 2);
}
console.log(jump_1(5), "jump_1");

function jump_2(n) {
  //斐波那契
  let a = 0,
    b = 0,
    result = 1;
  for (let i = 1; i <= n; i++) {
    (a = b), (b = result), (result = a + b);
  }
  return result;
}
console.log(jump_2(5), "jump_2");
console.log("====下面实现不含重复字符的最长字串长度========");

function longest_no_repeat(str) {
  let arr = [];
  let max = 0;
  for (let i = 0; i < str.length; i++) {
    let index = arr.findIndex((item) => {
      return item === str[i];
    });
    arr.push(str[i]);
    if (index > -1) {
      arr = arr.splice(index + 1);
    }
    max = Math.max(max, arr.length);
  }
  return max;
}

console.log(longest_no_repeat("abcabcbb"), "longest_no_repeat");

console.log("====下面实现判断回文========");
// function canPermutePalindrome(s) { //仅仅是拆分字符串后能否排列成回文
//   const set = new Set();
//   s.split("").forEach((c) => {
//     if (set.has(c)) {
//       set.delete(c);
//     } else {
//       set.add(c);
//     }
//   });
//   return set.size <= 1;
// }
// console.log(canPermutePalindrome("abccb"), "canPermutePalindrome");
function isPalindRome(input) {
  //判断本身是否是回文
  if (typeof input !== "string") return false;
  let len = input.length;
  let str = "";
  for (let i = len - 1; i >= 0; i--) {
    str += input[i];
  }
  return str === input;
}

console.log(isPalindRome("abccb"), "isPalindRome");

console.log("====下面实现反转链表========");
// 先实现一个js链表结构

class LinkNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  append(val) {
    let new_node = new LinkNode(val);
    if (!this.head) {
      this.head = new_node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new_node;
    }
  }

  toString() {
    let current = this.head;
    let str = "";
    while (current) {
      str += current.val + "->";
      current = current.next;
    }
    return str + "null";
  }

  toReverse() {
    return new Promise((resolve, reject) => {
      let current = this.head;
      let prev = null;
      while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
      }
      this.head = prev;
      resolve(this.toString());
    });
  }
}

let link = new LinkList();
link.append(1);
link.append(2);
link.append(3);
link.append(4);
link.append(5);

// console.log(link.toString(), "link.toString");

let reverse_link = link.toReverse();
//   .then((res) => {
//   console.log(link.toString(), "link.toString()");
//   return res;
// });
// setTimeout(() => {
//   console.log(reverse_link, "link.toReverse1122");
// }, 0);
console.log(reverse_link, "link.toReverse11");

// 事件循环 evenloop
//    事件循环又叫做消息循环，是浏览器渲染主线程的工作方式在Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

// 过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。根据 W3C官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级、必须优先调度执行。
// 如何理解JS的异步
// JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个并且渲染主线程承担着诸多的工作，渲染页面、执行 JS ，解析htmlcss，执行事件回调等都在其中运行。如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象

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

const singletonFnFactory2 = (function (val) {
  let instance = null;
  return function (val) {
    if (!instance) {
      instance = new singletonFn(val);
    }
    return instance;
  };
})();
let c = new singletonFnFactory2("张三");
let d = new singletonFnFactory2("李四");
console.log(c.name, d.name, c == d, "singletonFnFactory2");

console.log("====下面实现建造者模式========");

class Computer {
  constructor(config) {
    this.cpu = config ? config.cpu : "";
    this.ram = config ? config.ram : "";
    this.hardDisk = config ? config.hardDisk : "";
    this.gpu = config ? config.gpu : "";
  }
}
class ComputerBuilder {
  constructor() {
    // this.config = config;
    this.computer = new Computer();
  }
  setCpu(cpu) {
    this.computer.cpu = cpu;
    return this;
  }
  setRam(ram) {
    this.computer.ram = ram;
    return this;
  }
  setHardDisk(hardDisk) {
    this.computer.hardDisk = hardDisk;
    return this;
  }
  setGpu(gpu) {
    this.computer.gpu = gpu;
    return this;
  }

  build() {
    return this.computer;
  }
}

class ComputerDirector {
  ConstruceComputer(builder) {
    return builder
      .setCpu("base_cpu")
      .setRam("base_ram")
      .setHardDisk("base_hardDisk")
      .setGpu("base_gpu")
      .build();
  }
}

let A_build = new ComputerBuilder();

let A_Computer = new ComputerDirector().ConstruceComputer(A_build);

let mid_A_Computer = A_build.setCpu("A_cpu").build();

// console.log(A_Computer, mid_A_Computer, "A_Computer");
class ObjectFactory {
  constructor() {
    this.objects = [];
  }
  addObserver(observer) {
    this.objects.push(observer);
  }

  deleteObserver(observer) {
    const index = this.objects.indexOf(observer);
    if (index > -1) {
      this.objects.splice(index, 1);
    }
  }

  notifyObservers(data) {
    this.objects.forEach((observer) => {
      observer.update(data);
    });
  }
}

class Observer_1 {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(data, this.name);
  }
}
const observer_1 = new Observer_1("Observer_1");
const observer_2 = new Observer_1("Observer_2");
const objectFactory = new ObjectFactory();

// objectFactory.addObserver(observer_1);
// objectFactory.addObserver(observer_2);
// objectFactory.notifyObservers("Observer-data-change");

console.log("====下面实现观察者模式========");
// new Promise((resolve) => {
//   resolve("Promise-data");
// }).then((data) => {});

const _aaa = (res, rej) => {};
class mypromise {
  constructor(excutor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.resolvecallbacks = [];
    this.rejectcallbacks = [];
    this.resolve = (value) => {
      if (this.state === "pending") {
        this.state = "resolved";
        // 保存resolve的值
        this.value = value;
        // 执行成功回调
        this.resolvecallbacks.forEach((cb) => cb());
      }
    };

    this.reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        // 保存reject的原因
        this.reason = reason;
        // 执行失败回调
        this.rejectcallbacks.forEach((cb) => cb());
      }
    };

    try {
      excutor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === "resolved") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.reason);
    }
    if (this.state === "pending") {
      // 如果状态为 Pending，将成功和失败的回调函数保存起来
      this.resolvecallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.rejectcallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

const _mypromise = new mypromise((resolve, reject) => {
  console.log("mypromise-1");
  resolve("mypromise-data");
});

_mypromise.then(
  (result) => {
    console.log("成功：", result);
  },
  (reason) => {
    console.log("失败：", reason);
  }
);

console.log(0.4 + 0.2);

// function MyPromise(executor) {
//   // 初始状态为 Pending
//   this.status = 'pending';

//   // 用于保存 resolve 和 reject 的值
//   this.value = undefined;
//   this.reason = undefined;

//   // 用于存储成功和失败的回调函数
//   this.onResolvedCallbacks = [];
//   this.onRejectedCallbacks = [];

//   // 定义 resolve 函数
//   const resolve = (value) => {
//     // 只有在状态为 Pending 时才能执行 resolve
//     if (this.status === 'pending') {
//       // 将状态改为 Resolved
//       this.status = 'resolved';

//       // 保存 resolve 的值
//       this.value = value;

//       // 执行成功的回调函数
//       this.onResolvedCallbacks.forEach(callback => callback());
//     }
//   };

//   // 定义 reject 函数
//   const reject = (reason) => {
//     // 只有在状态为 Pending 时才能执行 reject
//     if (this.status === 'pending') {
//       // 将状态改为 Rejected
//       this.status = 'rejected';

//       // 保存 reject 的原因
//       this.reason = reason;

//       // 执行失败的回调函数
//       this.onRejectedCallbacks.forEach(callback => callback());
//     }
//   };

//   // 执行传入的 executor 函数，并传入 resolve 和 reject 函数
//   try {
//     executor(resolve, reject);
//   } catch (error) {
//     // 如果执行过程中发生异常，将其作为 reject 的原因处理
//     reject(error);
//   }
// }

// // 添加 then 方法
// MyPromise.prototype.then = function(onFulfilled, onRejected) {
//   if (this.status === 'resolved') {
//     // 如果状态为 Resolved，执行成功回调函数
//     onFulfilled(this.value);
//   } else if (this.status === 'rejected') {
//     // 如果状态为 Rejected，执行失败回调函数
//     onRejected(this.reason);
//   } else if (this.status === 'pending') {
//     // 如果状态为 Pending，将成功和失败的回调函数保存起来
//     this.onResolvedCallbacks.push(() => {
//       onFulfilled(this.value);
//     });
//     this.onRejectedCallbacks.push(() => {
//       onRejected(this.reason);
//     });
//   }
// };

// // 示例用法
// const myPromise = new MyPromise((resolve, reject) => {
//   // 异步操作，比如 setTimeout
//   setTimeout(() => {
//     // 模拟异步操作成功，调用 resolve
//     resolve('成功的结果');
//   }, 1000);
// });

// // 使用 then 方法处理成功和失败的情况
// myPromise.then(
//   result => {
//     console.log('成功：', result);
//   },
//   reason => {
//     console.log('失败：', reason);
//   }
// );
