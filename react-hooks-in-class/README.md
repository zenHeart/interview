# React Class 组件中使用 Hooks 的三种方案

> 原文: [How can I use React hooks in React classic class component?](https://stackoverflow.com/questions/53371356/how-can-i-use-react-hooks-in-react-classic-class-component)

React Hooks 是从 React 16.8 引入的新特性，它允许在函数组件中使用 state 和其他 React 特性。但如果你维护的是 class 组件，又想复用 Hooks 的逻辑，可以通过以下三种方案解决。

---

## 方案一：原生 HOC（高阶组件）

**核心思路**：创建一个 HOC，在 HOC 内部调用 Hooks，再将 Hook 的返回值通过 props 传递给 class 组件。

```jsx
import React from 'react';
import { useState, useEffect, useCallback } from 'react';

// ----------------- 自定义 Hook -----------------
function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount);
  const [lastUpdated, setLastUpdated] = useState(null);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => {
    setCount(initialCount);
    setLastUpdated(new Date().toLocaleTimeString());
  }, [initialCount]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return { count, increment, decrement, reset, lastUpdated };
}

// ----------------- Class 组件 -----------------
class CounterDisplay extends React.Component {
  render() {
    const { count, increment, decrement, reset, lastUpdated } = this.props;
    return (
      <div className="demo-card">
        <h3>方案一：原生 HOC</h3>
        <div className="counter-value">当前计数：{count}</div>
        <div className="button-group">
          <button onClick={decrement}>-1</button>
          <button onClick={increment}>+1</button>
          <button onClick={reset}>重置</button>
        </div>
        {lastUpdated && <div className="last-updated">上次重置：{lastUpdated}</div>}
      </div>
    );
  }
}

// ----------------- HOC -----------------
function withCounter(Component) {
  return function WrappedComponent(props) {
    const counterState = useCounter(props.initialCount || 0);
    return <Component {...props} {...counterState} />;
  };
}

// 使用方式
const EnhancedCounterDisplay = withCounter(CounterDisplay);
```

---

## 方案二：react-hooks-in-class 库

**核心思路**：使用第三方库 `react-hooks-in-class` 将 Hooks "桥接"到 class 组件中。

```bash
npm install react-hooks-in-class
```

```jsx
import React from 'react';
import { registerHook, useCounter } from 'react-hooks-in-class';

// ----------------- 注册 Hook -----------------
// 在模块加载时注册一次，返回值是一个可在 class 中使用的代理对象
const counterHook = registerHook('useCounter', useCounter);

// ----------------- Class 组件 -----------------
class CounterWithLib extends React.Component {
  // 在实例上声明将使用的 hook
  static hooks = {
    counter: counterHook
  };

  render() {
    const { counter } = this.props; // hook 结果通过 props 注入
    return (
      <div className="demo-card">
        <h3>方案二：react-hooks-in-class 库</h3>
        <div className="counter-value">当前计数：{counter.count}</div>
        <div className="button-group">
          <button onClick={counter.decrement}>-1</button>
          <button onClick={counter.increment}>+1</button>
          <button onClick={counter.reset}>重置</button>
        </div>
      </div>
    );
  }
}
```

> ⚠️ 注意：`react-hooks-in-class` 社区维护较少，请评估其最新支持状态。

---

## 方案三：Render Prop

**核心思路**：将自定义 Hook 的调用包装在一个组件的 render prop 中，将 Hook 结果传给 render 函数。

```jsx
import React from 'react';

// ----------------- Render Prop 组件 -----------------
class CounterProvider extends React.Component {
  state = { count: 0 };
  _increment = () => this.setState(s => ({ count: s.count + 1 }));
  _decrement = () => this.setState(s => ({ count: s.count - 1 }));
  _reset = () => this.setState({ count: this.props.initialCount || 0 });

  render() {
    return this.props.render({
      count: this.state.count,
      increment: this._increment,
      decrement: this._decrement,
      reset: this._reset
    });
  }
}

// ----------------- Class 组件（作为 render prop 消费者） -----------------
class CounterRenderProp extends React.Component {
  render() {
    return (
      <CounterProvider initialCount={this.props.initialCount || 0}>
        {({ count, increment, decrement, reset }) => (
          <div className="demo-card">
            <h3>方案三：Render Prop</h3>
            <div className="counter-value">当前计数：{count}</div>
            <div className="button-group">
              <button onClick={decrement}>-1</button>
              <button onClick={increment}>+1</button>
              <button onClick={reset}>重置</button>
            </div>
          </div>
        )}
      </CounterProvider>
    );
  }
}
```

---

## 完整 Demo（React App）

### 项目结构

```
demo/
├── src/
│   ├── App.jsx              # 主入口
│   ├── App.css              # 样式
│   ├── hooks/
│   │   └── useCounter.js    # 自定义 Hook
│   ├── hocs/
│   │   └── withCounter.js   # HOC
│   ├── components/
│   │   ├── CounterDisplay.jsx         # 方案一
│   │   ├── CounterWithLib.jsx         # 方案二
│   │   └── CounterRenderProp.jsx      # 方案三
│   └── providers/
│       └── CounterProvider.jsx        # 方案三 Provider
├── index.html
└── package.json
```

### 运行方式

```bash
cd demo
npm install
npm start
```

---

## 三种方案对比

| 维度 | 方案一：原生 HOC | 方案二：库方案 | 方案三：Render Prop |
|------|-----------------|---------------|-------------------|
| **侵入性** | 低（纯包装） | 中（依赖库） | 中（需要改 JSX 结构） |
| **类型支持** | 好 | 一般 | 一般 |
| **多个 Hook 组合** | 需要嵌套多个 HOC | 多个 registerHook | 在一个 render prop 中调用多个 |
| **Prop 命名冲突** | 需要手动合并 | 自动注入 props | 无冲突 |
| **学习成本** | 低 | 中 | 低 |
| **维护性** | 高 | 依赖库维护 | 高 |

---

## 推荐

- **新项目**：直接使用 Hooks + 函数组件
- **迁移场景**：优先考虑**方案一（原生 HOC）**，可控且无依赖
- **渐进迁移**：可以在 class 组件中混用 HOC 包装的组件，逐步将逻辑迁移到 Hooks

---

## 延伸阅读

- [React 官方文档 - Hooks](https://react.dev/reference/react)
- [React 官方文档 - 高阶组件](https://react.dev/learn/code-splitting#Naming)
- [React Hooks 规则](https://react.dev/reference/rules/rules-of-hooks)
