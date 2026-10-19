import React from 'react';

/**
 * 方案二：react-hooks-in-class 库
 *
 * 该库提供了一个 registerHook 函数，将 Hook 包装成可在 class 组件中使用的代理。
 * 由于 react-hooks-in-class 库已不再活跃维护，这里展示其核心用法。
 *
 * 安装：npm install react-hooks-in-class
 *
 * 使用方式：
 * import { registerHook } from 'react-hooks-in-class';
 * import { useCounter } from '../hooks/useCounter';
 *
 * const counterHook = registerHook('useCounter', useCounter);
 *
 * class CounterWithLib extends React.Component {
 *   static hooks = {
 *     counter: counterHook
 *   };
 *   render() {
 *     const { counter } = this.props;
 *     return <div>{counter.count}</div>;
 *   }
 * }
 *
 * 以下为模拟实现，展示库的核心工作原理：
 */
class CounterWithLib extends React.Component {
  // 模拟库的注入方式：静态 hooks 属性声明
  static hooks = {
    counter: null // 实际由 registerHook 注入
  };

  render() {
    // 在真实库中，counter 会通过 props 自动注入
    const { count = 0, increment, decrement, reset } = this.props;
    return (
      <div className="demo-card">
        <h3>方案二：react-hooks-in-class 库</h3>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          ⚠️ 库已停止维护，原理展示
        </p>
        <div className="counter-value">{count}</div>
        <div className="button-group">
          <button onClick={decrement}>-1</button>
          <button onClick={increment}>+1</button>
          <button onClick={reset}>重置</button>
        </div>
      </div>
    );
  }
}

// 演示：模拟库的运作方式
// 库内部会通过 React 16.3+ 的新 Context API 或其他机制注入 hook 结果
CounterWithLib.hooks.counter = {
  count: 0,
  increment: () => {},
  decrement: () => {},
  reset: () => {}
};

export default CounterWithLib;
