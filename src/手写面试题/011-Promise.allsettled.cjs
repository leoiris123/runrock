// allSettle：全部执行完成后，返回全部执行结果（成功+失败）
//static
function allSettled(promises) {
  const result = new Array(promises.length); // 记录执行的结果：用于返回直接结果
  let times = 0; // 记录执行完成的次数：判断是否完成
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let p = promises[i];
      if (p && typeof p.then === "function") {
        p.then((data) => {
          result[i] = { status: "fulfilled", value: data };
          times++;
          if (times === promises.length) {
            resolve(result);
          }
        }).catch((err) => {
          result[i] = { status: "rejected", reason: err };
          times++;
          if (times === promises.length) {
            resolve(result);
          }
        });
      } else {
        // 普通值，加入
        result[i] = { status: "fulfilled", value: p };
        times++;
        if (times === promises.length) {
          resolve(result);
        }
      }
    }
  });
}
