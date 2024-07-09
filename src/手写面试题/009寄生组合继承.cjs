//定义一个父类，实现其属性和方法；
function Parent(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};
//定义一个子类，通过调用父类构造函数，实现属性的继承；
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
//将子类的原型指向一个父类的实例，实现方法的继承并避免父类构造函数被调用多次；
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
//在子类的原型上添加子类自己的方法；
Child.prototype.sayAge = function () {
  console.log(this.age);
};
var child1 = new Child("Tom", 18);
child1.sayName(); // 'Tom'
child1.sayAge(); // 18
// es6
class Super {
  constructor(foo) {
    this.foo = foo;
  }
  printFoo() {
    console.log(this.foo);
  }
}
class Sub extends Super {
  constructor(foo, bar) {
    super(foo);
    this.bar = bar;
  }
}
