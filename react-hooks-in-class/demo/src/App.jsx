import React from 'react';
import CounterDisplay from './components/CounterDisplay';
import CounterWithLib from './components/CounterWithLib';
import CounterRenderProp from './components/CounterRenderProp';

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>🪝 React Class 组件中使用 Hooks</h1>
        <p>三种方案完整 Demo — HOC / react-hooks-in-class / Render Prop</p>
      </header>

      <div className="demo-container">
        {/* 方案一：原生 HOC */}
        <CounterDisplay initialCount={5} />

        {/* 方案二：react-hooks-in-class 库（原理展示） */}
        <CounterWithLib initialCount={10} />

        {/* 方案三：Render Prop */}
        <CounterRenderProp initialCount={15} />
      </div>

      <div className="code-note">
        <h3>💡 核心原理</h3>
        <p>
          React Hooks 只能在 <code>函数组件</code> 或 <code>自定义 Hook</code> 内部调用。
          <br />
          若要在 <code>class 组件</code> 中使用 Hook 逻辑，可以通过以上三种方式进行"桥接"。
        </p>
      </div>

      <footer className="footer">
        基于 Stack Overflow{' '}
        <a
          href="https://stackoverflow.com/questions/53371356/how-can-i-use-react-hooks-in-react-classic-class-component"
          target="_blank"
          rel="noopener noreferrer"
        >
          #53371356
        </a>{' '}
        · zenHeart/interview
      </footer>
    </div>
  );
}

export default App;
