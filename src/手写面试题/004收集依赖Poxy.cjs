class Component {
  _data = { name: "空" };
  pending = false;
  constructor(data) {
    this.data = new Proxy(this._data, {
      set: (target, key, value) => {
        // console.log(target, key, value, "target, key, value");
        // console.log(this._data, this.data, "_data, this.data");
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
    console.log(`render-name,${this.data.name} ; age:${this.data.age}`);
  }
}

const com = new Component();

com.data.name = "张三";
com.data.age = 13;
com.data.name = "王五";
setTimeout(() => {
  com.data.name = "leijijun";
  com.data.age = "27";
}, 10);
// console.log(com, "com");
