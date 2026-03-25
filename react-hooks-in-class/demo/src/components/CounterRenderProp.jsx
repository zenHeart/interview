import React from 'react';
import { CounterProvider } from '../providers/CounterProvider';

/**
 * 方案三：Render Prop
 * class 组件作为 render prop 的消费者
 */
class CounterRenderProp extends React.Component {
  render() {
    return (
      <CounterProvider initialCount={this.props.initialCount ?? 0}>
        {({ count, increment, decrement, reset }) => (
          <div className="demo-card">
            <h3>方案三：Render Prop</h3>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              通过 render prop 接收 Hook 状态
            </p>
            <div className="counter-value">{count}</div>
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

export default CounterRenderProp;
