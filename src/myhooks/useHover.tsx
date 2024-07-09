import * as React from "react";

const { useState } = React;

export type Element =
  | ((state: boolean) => React.ReactElement<any>)
  | React.ReactElement<any>;
// 定义了一个名为 Element 的类型别名，它可以是一个返回 React 元素的函数或直接是一个 React 元素

const useHover = (element: Element): [React.ReactElement<any>, boolean] => {
  // 定义了一个名为 useHover 的自定义 Hook，它接受一个名为 element 的参数，并返回一个元素和一个布尔值数组
  const [state, setState] = useState(false);
  // 使用 useState Hook 创建一个名为 state 的状态变量，并将其初始值设置为 false

  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    // 定义一个名为 onMouseEnter 的事件处理程序函数，它接受一个名为 originalOnMouseEnter 的可选参数，并返回另一个函数
    originalOnMouseEnter(event); // 调用 originalOnMouseEnter 函数（如果存在），否则调用 noop 函数
    setState(true); // 将 state 变量的值设置为 true
  };
  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    // 定义一个名为 onMouseLeave 的事件处理程序函数，它接受一个名为 originalOnMouseLeave 的可选参数，并返回另一个函数
    originalOnMouseLeave(event); // 调用 originalOnMouseLeave 函数（如果存在），否则调用 noop 函数
    setState(false); // 将 state 变量的值设置为 false
  };

  if (typeof element === "function") {
    element = element(state); // 如果 element 是一个函数，则将其调用并传递 state 变量的值作为参数
  }

  const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  });
  // 使用 React.cloneElement 方法克隆 element 元素，并将新的 onMouseEnter 和 onMouseLeave 事件处理程序函数作为 Props 传递给它

  return [el, state]; // 返回一个数组，包含修改后的元素和当前悬停状态的布尔值
};

export default useHover; // 导出 useHover 自定义 Hook
