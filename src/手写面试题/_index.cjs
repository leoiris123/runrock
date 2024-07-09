const fs = require("fs");
const path = require("path");

// 定义目录路径
const directoryPath = path.join(__dirname);

// 读取目录下所有文件
const all = fs.readdirSync(directoryPath);

const lastmode = true; // 是否只读最后一个文件

if (lastmode) {
  let last = all.pop();
  while (!last.match(/^\d+/)) {
    last = all.pop();
  }
  console.log(last, "last2");

  require(path.join(directoryPath, last));
} else {
  all.forEach((file) => {
    // 检查文件扩展名是否为.js并且文件名不以'.'开头（通常是隐藏文件）
    if (
      path.extname(file).toLowerCase() === ".cjs" &&
      !file.startsWith(".") &&
      file.match(/^\d+/)
    ) {
      // 引入文件

      require(path.join(directoryPath, file));
    }
  });
}

// require("./柯里化函数.cjs");
// require("./数组打平.cjs");
// require("./防抖截流.cjs");
// require("./收集依赖.cjs");
