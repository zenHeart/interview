import React from 'react';
import { withCounter } from '../hocs/withCounter';

/**
 * 方案一：原生 HOC
 * class 组件通过 props 接收 Hook 的返回值
 */
class CounterDisplay extends React.Component {
  render() {
    const { count, increment, decrement, reset, lastUpdated } = this.props;
    return (
      <div className="demo-card">
        <h3>方案一：原生 HOC</h3>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
          通过 withCounter HOC 注入 Hook 结果
        </p>
        <div className="counter-value">{count}</div>
        <div className="button-group">
          <button onClick={decrement}>-1</button>
          <button onClick={increment}>+1</button>
          <button onClick={reset}>重置</button>
        </div>
        {lastUpdated && (
          <div className="last-updated">上次重置：{lastUpdated}</div>
        )}
      </div>
    );
  }
}

export default withCounter(CounterDisplay);
