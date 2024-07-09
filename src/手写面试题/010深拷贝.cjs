function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 创建一个新的对象或数组
  let clone = Array.isArray(obj) ? [] : {};

  // 遍历对象的属性
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归调用深拷贝函数
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
const a = {
  name: "张三",
  age: 18,
  address: {
    city: "北京",
    country: "中国",
  },
  hobbies: [
    "篮球",
    "足球",
    {
      game: "游戏",
      games: ["LOL", "PUBG"],
    },
  ],
};
console.log(deepClone(a));
