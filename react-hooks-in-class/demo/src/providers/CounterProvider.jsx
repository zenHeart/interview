import React from 'react';

/**
 * 方案三：Render Prop Provider
 * 封装状态管理，通过 render prop 暴露给消费组件
 */
export class CounterProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount ?? 0
    };
  }

  _increment = () => this.setState(s => ({ count: s.count + 1 }));
  _decrement = () => this.setState(s => ({ count: s.count - 1 }));
  _reset = () => this.setState({ count: this.props.initialCount ?? 0 });

  render() {
    return this.props.render({
      count: this.state.count,
      increment: this._increment,
      decrement: this._decrement,
      reset: this._reset
    });
  }
}
