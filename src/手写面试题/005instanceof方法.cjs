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
console.log("obj_ins instanceof A???", myInstanceof(_obj_ins, A));
