import { useState, useEffect, useCallback } from 'react';

/**
 * 计数器自定义 Hook - 贯穿三种方案的示例 Hook
 * @param {number} initialCount - 初始计数值，默认 0
 */
export function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount);
  const [lastUpdated, setLastUpdated] = useState(null);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => {
    setCount(initialCount);
    setLastUpdated(new Date().toLocaleTimeString());
  }, [initialCount]);

  // 更新文档标题（演示 useEffect）
  useEffect(() => {
    document.title = `计数: ${count}`;
    return () => {
      document.title = 'React Class 组件中使用 Hooks';
    };
  }, [count]);

  return { count, increment, decrement, reset, lastUpdated };
}
