import React from 'react';
import { useCounter } from '../hooks/useCounter';

/**
 * 方案一：原生 HOC
 * 将 useCounter Hook 的结果通过 props 注入到 class 组件
 *
 * @param {React.Component} WrappedComponent - 被包装的 class 组件
 * @returns {React.FunctionComponent} 包装后的组件
 */
export function withCounter(WrappedComponent) {
  function WithCounter(props) {
    const counterState = useCounter(props.initialCount ?? 0);
    return <WrappedComponent {...props} {...counterState} />;
  }

  WithCounter.displayName = `WithCounter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithCounter;
}
