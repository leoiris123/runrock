### React 合成事件

#### 1. 合成事件

合成事件是 React 自己实现的一套事件系统，它与原生 DOM 事件不同，它实现了事件冒泡、事件捕获、事件委托、事件对象等，并且兼容所有浏览器。

合成事件与原生 DOM 事件的主要区别：

1.  合成事件是 React 自己实现的一套事件系统，它与原生 DOM 事件不同，它实现了事件冒泡、事件捕获、事件委托、事件对象等，并且兼容所有浏览器。

2.  合成事件是基于事件委托机制实现的，它将所有的事件都统一绑定到组件的根元素上，通过事件冒泡的方式，在事件处理函数中根据事件类型和目标元素来判断和处理事件。

### diff 算法

diff 算法是在 render 时，对比新旧 vdom,为了实现节点复用的一种深度优先遍历算法，在 react 16 后，diff 算法被优化为 fiber diff 算法。

### fiber 算法

fiber 算法是一种基于协程的算法，它将渲染过程划分为多个小任务，每个小任务执行完成后，将控制权交还给主线程，从而实现异步渲染。
React Fiber 的思想和协程的概念是契合的: React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染。

第一次渲染不需要 diff,直接 vdom 转 fiber,再次触发渲染产生新的 vdom,这时候要对新旧 vdom 进行 diff，决定怎么产生新的 fiber,对新增节点打上新增标记，可复用的节点打上修改标记，删除的节点打上删除标记。

### 虚拟 dom

虚拟 dom 是一种用于描述真实 dom 的抽象数据结构，它具有轻量、可跨平台、可复用等优点。虚拟 dom 可以用于构建高性能的 ui 组件，并且可以实现跨平台渲染。

### react 生命周期

### react 类组件 hoc 属性代理 反向继承 实现计算组件渲染时间

```js

//---属性代理
       function Hoc(WrapComponent) {
            const newProps={
                type:"hoc",
                startRenderTime:Date.now()
            }
            return  <WrapComponent {...this.props} {...newProps}  />
        }

   function Hoc(WrapComponent) {
        return class extend  React.component{
            render() {
            const newProps={
                type:"hoc",
                startRenderTime:Date.now()
            }
            return  <WrapComponent {...this.props} {...newProps}  />
        }
        }
    }
////反向继承
  function Hoc(WrapComponent) {
    const didmount =WrapComponent.prototype.componentDidMount
        return class extend  WrapComponent{

            async componentDidMount() {
                if(didmount){
                    await didmount.apply(this)
                }
                console.log("Hoc", Date.now() - this.props.startRenderTime)
            }
            render() {
            return super.render()
        }
        }
    }
///////--
      function Hoc(WrapComponent) {
        return class extend  WrapComponent{
            render() {
                const tree = super.render()
                const newProps = {}
             const props = {
                ...tree.props,
                ...newProps
             }
    const newtree = React.cloneElement(tree, props,tree.props.children)

            return newtree;
        }
        }
    }
```
